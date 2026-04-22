import { useState, useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import Loader from "../common/Loader";
import { useAuth } from "../../hooks/useAuth";
import toast from "react-hot-toast";

const ChatInterface = ({
  conversationId,
  onConversationIdChange,
  initialMessage,
  onInitialMessageConsumed,
}) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [streaming, setStreaming] = useState(false);
  const messagesEndRef = useRef(null);
  const initialMessageSentRef = useRef(false);
  const { user } = useAuth();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!initialMessage || initialMessageSentRef.current || loading) {
      return;
    }

    initialMessageSentRef.current = true;
    sendMessage(initialMessage).finally(() => {
      onInitialMessageConsumed?.();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialMessage]);

  // Validate message format before sending to backend
  const validateMessages = (messagesToSend) => {
    console.log("📋 Messages to validate:", messagesToSend);

    for (let i = 0; i < messagesToSend.length; i++) {
      const msg = messagesToSend[i];
      console.log(
        `  [${i}] role: ${msg.role}, content: ${msg.content?.substring(0, 50)}...`,
      );

      if (!msg.role) {
        console.error(
          `❌ Message ${i} missing 'role' field!`,
          JSON.stringify(msg, null, 2),
        );
        throw new Error(
          `Message at index ${i} is missing required 'role' field. Expected: 'user' or 'assistant'`,
        );
      }
      if (
        !msg.content ||
        typeof msg.content !== "string" ||
        msg.content.trim() === ""
      ) {
        console.error(`❌ Message ${i} has invalid content!`, msg);
        throw new Error(
          `Message at index ${i} has invalid or empty 'content' field`,
        );
      }
    }
    console.log(
      `✅ Message validation passed for ${messagesToSend.length} messages`,
    );
    return true;
  };

  const sendMessage = async (content) => {
    const streamMessageId = `stream_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    const newMessage = {
      role: "user",
      content,
      timestamp: new Date().toISOString(),
    };

    const assistantPlaceholder = {
      id: streamMessageId,
      role: "assistant",
      content: "",
      isStreaming: true,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, newMessage, assistantPlaceholder]);
    setLoading(true);
    setStreaming(true);

    try {
      const API_BASE =
        import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
      const token = localStorage.getItem("access_token");

      // Prepare messages for API - extract only role and content
      console.log("📦 Current messages in state:", messages);
      console.log("📝 New message being added:", newMessage);

      const messagesToSend = [...messages, newMessage].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      console.log("🔄 Messages prepared for sending:", messagesToSend);

      // Validate all messages have required fields before sending
      validateMessages(messagesToSend);

      const payload = {
        messages: messagesToSend,
      };

      if (conversationId) {
        payload.conversation_id = conversationId;
      }

      const response = await fetch(`${API_BASE}/api/v1/groq/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantMessage = "";

      console.log("🔵 Starting SSE stream processing...");

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          console.log("🟢 SSE stream completed");
          break;
        }

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");
        console.log(`📨 Received chunk with ${lines.length} lines`);

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);
            console.log(
              `📍 Processing data line: "${data.substring(0, 50)}..."`,
            );

            // Check for conversation ID
            const convIdMatch = data.match(/\[DONE_CONV_ID:(.+)\]/);
            if (convIdMatch) {
              const newConvId = convIdMatch[1];
              console.log(`🆔 Conversation ID received: ${newConvId}`);
              if (onConversationIdChange) {
                onConversationIdChange(newConvId);
              }
              continue;
            }

            // Append to assistant message
            assistantMessage += data;
            console.log(
              `📝 Assistant message so far (${assistantMessage.length} chars): "${assistantMessage.substring(0, 80)}..."`,
            );

            setMessages((prev) => {
              console.log(`  🔄 setMessages callback received`);
              console.log(
                `  📌 Current prev messages:`,
                prev.map((m) => ({
                  role: m.role,
                  contentLen: m.content?.length,
                })),
              );

              const newMessages = prev.map((message) => {
                if (message.id === streamMessageId) {
                  return {
                    ...message,
                    content: assistantMessage,
                    isStreaming: true,
                  };
                }
                return message;
              });

              console.log(
                `  📊 Final newMessages:`,
                newMessages.map((m) => ({
                  role: m.role,
                  contentLen: m.content?.length,
                })),
              );
              return newMessages;
            });
          }
        }
      }

      setMessages((prev) =>
        prev.map((message) =>
          message.id === streamMessageId
            ? { ...message, isStreaming: false }
            : message,
        ),
      );
    } catch (error) {
      console.error("❌ Chat error:", error);

      setMessages((prev) =>
        prev.filter((message) => message.id !== streamMessageId),
      );

      // Handle validation errors specifically
      if (error.message && error.message.includes("missing required")) {
        toast.error(`Message format error: ${error.message}`);
      } else if (error.response?.status === 422) {
        toast.error(
          "Message validation failed. Please check the format and try again.",
        );
      } else {
        toast.error("Failed to send message. Please try again.");
      }
    } finally {
      setLoading(false);
      setStreaming(false);
    }
  };

  return (
    <div className="flex h-full min-h-0 flex-col bg-[#f8f9fa]">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-3 py-4 sm:px-4 lg:px-6">
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center p-6 text-center">
            <div className="mb-4 text-6xl">💬</div>
            <h3 className="mb-2 text-2xl font-semibold tracking-[-0.02em] text-[#000a1e]">
              Start a Conversation
            </h3>
            <p className="max-w-md text-sm leading-relaxed text-[#4f627c] sm:text-base">
              Ask me anything about universities, programs, admission
              requirements, or career guidance!
            </p>
            <div className="mt-6 grid max-w-md gap-3">
              <button
                onClick={() =>
                  sendMessage(
                    "What universities should I consider for Computer Science in Pakistan?",
                  )
                }
                className="rounded-2xl bg-white/90 p-4 text-left text-[#2e3f58] shadow-[0_16px_40px_-30px_rgba(0,33,71,0.35)] transition-all hover:-translate-y-0.5 hover:bg-white"
              >
                💻 What universities should I consider for Computer Science in
                Pakistan?
              </button>
              <button
                onClick={() =>
                  sendMessage(
                    "Tell me about admission requirements of NUST university",
                  )
                }
                className="rounded-2xl bg-white/90 p-4 text-left text-[#2e3f58] shadow-[0_16px_40px_-30px_rgba(0,33,71,0.35)] transition-all hover:-translate-y-0.5 hover:bg-white"
              >
                📋 Tell me about admission requirements of NUST university
              </button>
              <button
                onClick={() =>
                  sendMessage(
                    "What are my chances with " +
                      (user?.fsc_percentage || "85") +
                      "% FSC to get admission in FAST university?",
                  )
                }
                className="rounded-2xl bg-white/90 p-4 text-left text-[#2e3f58] shadow-[0_16px_40px_-30px_rgba(0,33,71,0.35)] transition-all hover:-translate-y-0.5 hover:bg-white"
              >
                🎯 What are my chances with {user?.fsc_percentage || "85"}% FSC
                to get admission in FAST university?
              </button>
            </div>
          </div>
        ) : (
          <>
            {messages.map((message, index) => (
              <ChatMessage key={index} message={message} />
            ))}
            {streaming && (
              <div className="mb-4 flex gap-3">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#e7e8e9]">
                  <Loader size="sm" />
                </div>
                <div className="text-sm text-[#4f627c]">Thinking...</div>
              </div>
            )}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <ChatInput onSendMessage={sendMessage} disabled={loading} />
    </div>
  );
};

export default ChatInterface;
