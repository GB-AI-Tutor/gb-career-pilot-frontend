// import { useState, useEffect, useRef } from "react";
// import ChatMessage from "./ChatMessage";
// import ChatInput from "./ChatInput";
// import Loader from "../common/Loader";
// import { useAuth } from "../../hooks/useAuth";
// import toast from "react-hot-toast";
// import { chatAPI } from "../../api/chat";

// const ChatInterface = ({
//   conversationId,
//   onConversationIdChange,
//   initialMessage,
//   onInitialMessageConsumed,
//   initialMessages = [],
// }) => {
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [streaming, setStreaming] = useState(false);
//   const messagesEndRef = useRef(null);
//   const initialMessageSentRef = useRef(false);
//   const { user } = useAuth();

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   useEffect(() => {
//     initialMessageSentRef.current = false;

//     if (Array.isArray(initialMessages) && initialMessages.length > 0) {
//       setMessages(
//         initialMessages
//           .filter((message) => message?.role && message?.content)
//           .map((message) => ({
//             role: message.role,
//             content: message.content,
//             timestamp: message.timestamp || new Date().toISOString(),
//           })),
//       );
//       return;
//     }

//     if (!conversationId) {
//       setMessages([]);
//       return;
//     }

//     const loadConversationMessages = async () => {
//       try {
//         const response = await chatAPI.getConversationMessages(conversationId);
//         const loadedMessages =
//           response?.messages || response?.conversation?.messages || [];

//         setMessages(
//   loadedMessages
//     .filter((message) => 
//       message?.role && 
//       message?.content && 
//       message.role !== "tool" &&           // exclude tool results
//       !(message.role === "assistant" && message.tool_calls?.length) // exclude tool-calling turns
//     )
//     .map((message) => ({
//       role: message.role,
//       content: message.content,
//       timestamp: message.timestamp || new Date().toISOString(),
//     })),
// );
//       } catch (error) {
//         console.error("Failed to load conversation:", error);
//         toast.error("Failed to load conversation");
//         setMessages([]);
//       }
//     };

//     loadConversationMessages();
//   }, [conversationId, initialMessages]);

//   useEffect(() => {
//     if (!initialMessage || initialMessageSentRef.current || loading) {
//       return;
//     }

//     initialMessageSentRef.current = true;
//     sendMessage(initialMessage).finally(() => {
//       onInitialMessageConsumed?.();
//     });
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [initialMessage]);

//   // Validate message format before sending to backend
//   const validateMessages = (messagesToSend) => {
//     console.log("📋 Messages to validate:", messagesToSend);

//     for (let i = 0; i < messagesToSend.length; i++) {
//       const msg = messagesToSend[i];
//       console.log(
//         `  [${i}] role: ${msg.role}, content: ${msg.content?.substring(0, 50)}...`,
//       );

//       if (!msg.role) {
//         console.error(
//           `❌ Message ${i} missing 'role' field!`,
//           JSON.stringify(msg, null, 2),
//         );
//         throw new Error(
//           `Message at index ${i} is missing required 'role' field. Expected: 'user' or 'assistant'`,
//         );
//       }
//       if (
//         !msg.content ||
//         typeof msg.content !== "string" ||
//         msg.content.trim() === ""
//       ) {
//         console.error(`❌ Message ${i} has invalid content!`, msg);
//         throw new Error(
//           `Message at index ${i} has invalid or empty 'content' field`,
//         );
//       }
//     }
//     console.log(
//       `✅ Message validation passed for ${messagesToSend.length} messages`,
//     );
//     return true;
//   };

//   const sendMessage = async (content) => {
//     const streamMessageId = `stream_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
//     const newMessage = {
//       role: "user",
//       content,
//       timestamp: new Date().toISOString(),
//     };

//     const assistantPlaceholder = {
//       id: streamMessageId,
//       role: "assistant",
//       content: "",
//       isStreaming: true,
//       timestamp: new Date().toISOString(),
//     };

//     setMessages((prev) => [...prev, newMessage, assistantPlaceholder]);
//     setLoading(true);
//     setStreaming(true);

//     try {
//       const API_BASE =
//         import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
//       const token = localStorage.getItem("access_token");

//       // Prepare messages for API - extract only role and content
//       console.log("📦 Current messages in state:", messages);
//       console.log("📝 New message being added:", newMessage);

//       const messagesToSend = [...messages, newMessage]
//   .filter((m) => m.role === "user" || m.role === "assistant")
//   .filter((m) => !m.tool_calls) // exclude assistant messages that triggered tools
//   .map((m) => ({
//     role: m.role,
//     content: m.content,
//   }));

//       console.log("🔄 Messages prepared for sending:", messagesToSend);

//       // Validate all messages have required fields before sending
//       validateMessages(messagesToSend);

//       const payload = {
//         messages: messagesToSend,
//       };

//       if (conversationId) {
//         payload.conversation_id = conversationId;
//       }

//       const response = await fetch(`${API_BASE}/api/v1/groq/chat`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(payload),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to send message");
//       }

//       const reader = response.body.getReader();
//       const decoder = new TextDecoder();
//       let assistantMessage = "";

//       console.log("🔵 Starting SSE stream processing...");

//       while (true) {
//         const { done, value } = await reader.read();
//         if (done) {
//           console.log("🟢 SSE stream completed");
//           break;
//         }

//         const chunk = decoder.decode(value);
//         const lines = chunk.split("\n");
//         console.log(`📨 Received chunk with ${lines.length} lines`);

//         for (const line of lines) {
//           if (line.startsWith("data: ")) {
//             const data = line.slice(6);
//             console.log(
//               `📍 Processing data line: "${data.substring(0, 50)}..."`,
//             );

//             // Check for conversation ID
//             const convIdMatch = data.match(/\[DONE_CONV_ID:(.+)\]/);
//             if (convIdMatch) {
//               const newConvId = convIdMatch[1];
//               console.log(`🆔 Conversation ID received: ${newConvId}`);
//               if (onConversationIdChange) {
//                 onConversationIdChange(newConvId);
//               }
//               continue;
//             }

//             // Append to assistant message
//             assistantMessage += data;
//             console.log(
//               `📝 Assistant message so far (${assistantMessage.length} chars): "${assistantMessage.substring(0, 80)}..."`,
//             );

//             setMessages((prev) => {
//               console.log(`  🔄 setMessages callback received`);
//               console.log(
//                 `  📌 Current prev messages:`,
//                 prev.map((m) => ({
//                   role: m.role,
//                   contentLen: m.content?.length,
//                 })),
//               );

//               const newMessages = prev.map((message) => {
//                 if (message.id === streamMessageId) {
//                   return {
//                     ...message,
//                     content: assistantMessage,
//                     isStreaming: true,
//                   };
//                 }
//                 return message;
//               });

//               console.log(
//                 `  📊 Final newMessages:`,
//                 newMessages.map((m) => ({
//                   role: m.role,
//                   contentLen: m.content?.length,
//                 })),
//               );
//               return newMessages;
//             });
//           }
//         }
//       }

//       setMessages((prev) =>
//         prev.map((message) =>
//           message.id === streamMessageId
//             ? { ...message, isStreaming: false }
//             : message,
//         ),
//       );
//     } catch (error) {
//       console.error("❌ Chat error:", error);

//       setMessages((prev) =>
//         prev.filter((message) => message.id !== streamMessageId),
//       );

//       // Handle validation errors specifically
//       if (error.message && error.message.includes("missing required")) {
//         toast.error(`Message format error: ${error.message}`);
//       } else if (error.response?.status === 422) {
//         toast.error(
//           "Message validation failed. Please check the format and try again.",
//         );
//       } else {
//         toast.error("Failed to send message. Please try again.");
//       }
//     } finally {
//       setLoading(false);
//       setStreaming(false);
//     }
//   };

//   return (
//     <div className="relative flex h-full min-h-0 w-full flex-col bg-[#f8f9fa]">
//       {/* Messages Area */}
//       <div className="min-h-0 flex-1 overflow-y-auto px-3 py-4 [scrollbar-color:#c7d2e0_transparent] [scrollbar-width:thin] sm:px-4 lg:px-6">
//         {messages.length === 0 ? (
//           <div className="flex h-full flex-col items-center justify-center p-6 text-center">
//             <div className="mb-4 text-6xl">💬</div>
//             <h3 className="mb-2 text-2xl font-semibold tracking-[-0.02em] text-[#000a1e]">
//               Start a Conversation
//             </h3>
//             <p className="max-w-md text-sm leading-relaxed text-[#4f627c] sm:text-base">
//               Ask me anything about universities, programs, admission
//               requirements, or career guidance!
//             </p>
//             <div className="mt-6 grid max-w-md gap-3">
//               <button
//                 onClick={() =>
//                   sendMessage(
//                     "What universities should I consider for Computer Science in Pakistan?",
//                   )
//                 }
//                 className="rounded-2xl bg-white/90 p-4 text-left text-[#2e3f58] shadow-[0_16px_40px_-30px_rgba(0,33,71,0.35)] transition-all hover:-translate-y-0.5 hover:bg-white"
//               >
//                 💻 What universities should I consider for Computer Science in
//                 Pakistan?
//               </button>
//               <button
//                 onClick={() =>
//                   sendMessage(
//                     "Tell me about admission requirements of NUST university",
//                   )
//                 }
//                 className="rounded-2xl bg-white/90 p-4 text-left text-[#2e3f58] shadow-[0_16px_40px_-30px_rgba(0,33,71,0.35)] transition-all hover:-translate-y-0.5 hover:bg-white"
//               >
//                 📋 Tell me about admission requirements of NUST university
//               </button>
//               <button
//                 onClick={() =>
//                   sendMessage(
//                     "What are my chances with " +
//                       (user?.fsc_percentage || "85") +
//                       "% FSC to get admission in FAST university?",
//                   )
//                 }
//                 className="rounded-2xl bg-white/90 p-4 text-left text-[#2e3f58] shadow-[0_16px_40px_-30px_rgba(0,33,71,0.35)] transition-all hover:-translate-y-0.5 hover:bg-white"
//               >
//                 🎯 What are my chances with {user?.fsc_percentage || "85"}% FSC
//                 to get admission in FAST university?
//               </button>
//             </div>
//           </div>
//         ) : (
//           <>
//             {messages.map((message, index) => (
//               <ChatMessage key={index} message={message} />
//             ))}
//             {streaming && (
//               <div className="mb-4 flex gap-3">
//                 <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#e7e8e9]">
//                   <Loader size="sm" />
//                 </div>
//                 <div className="text-sm text-[#4f627c]">Thinking...</div>
//               </div>
//             )}
//           </>
//         )}
//         <div ref={messagesEndRef} />
//       </div>

//       {/* Input Area */}
//       <div className="sticky bottom-0 z-10 border-t border-white/70 bg-[#f8f9fa]/95 backdrop-blur-sm">
//         <ChatInput onSendMessage={sendMessage} disabled={loading} />
//       </div>
//     </div>
//   );
// };

// export default ChatInterface;
import { useState, useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import Loader from "../common/Loader";
import { useAuth } from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { chatAPI } from "../../api/chat";

// ─── Token Limit Banner ──────────────────────────────────────────────────────
const TokenLimitBanner = ({ onDeleteConversation }) => (
  <div className="relative overflow-hidden rounded-2xl border border-amber-200/60 bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 px-5 py-4 shadow-[0_8px_32px_-12px_rgba(217,119,6,0.25)]">
    {/* Decorative top bar */}
    <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-amber-400 via-orange-400 to-red-400" />

    <div className="flex items-start gap-3">
      {/* Icon */}
      <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-600">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
          <line x1="12" y1="9" x2="12" y2="13"/>
          <line x1="12" y1="17" x2="12.01" y2="17"/>
        </svg>
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold leading-snug text-amber-900">
          Conversation limit reached
        </p>
        <p className="mt-1 text-xs leading-relaxed text-amber-700">
          This conversation has hit the model's context limit. Delete it and start a fresh one to continue chatting.
        </p>
      </div>
    </div>

    {/* Action button */}
    <button
      onClick={onDeleteConversation}
      className="mt-3 w-full rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-2.5 text-xs font-semibold tracking-wide text-white shadow-sm transition-all hover:from-amber-600 hover:to-orange-600 hover:shadow-md active:scale-[0.98]"
    >
      Delete this conversation &amp; start fresh
    </button>
  </div>
);

// ─── Blocked Input ────────────────────────────────────────────────────────────
const BlockedInput = () => (
  <div className="flex items-center gap-3 rounded-2xl border border-dashed border-amber-300/70 bg-amber-50/60 px-4 py-3.5">
    <svg className="flex-shrink-0 text-amber-400" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
    <span className="text-xs text-amber-600">
      Input locked — delete this conversation above to continue
    </span>
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────
const ChatInterface = ({
  conversationId,
  onConversationIdChange,
  initialMessage,
  onInitialMessageConsumed,
  initialMessages = [],
  onConversationDeleted,        // called after successful delete so sidebar refreshes
}) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [streaming, setStreaming] = useState(false);
  const [tokenLimitHit, setTokenLimitHit] = useState(false);
  const [requestError, setRequestError] = useState(null);
  const messagesEndRef = useRef(null);
  const initialMessageSentRef = useRef(false);
  const { user } = useAuth();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Reset token limit state when conversation changes
  useEffect(() => {
    setTokenLimitHit(false);
    setRequestError(null);
    initialMessageSentRef.current = false;

    if (Array.isArray(initialMessages) && initialMessages.length > 0) {
      setMessages(
        initialMessages
          .filter((message) => message?.role && message?.content)
          .map((message) => ({
            role: message.role,
            content: message.content,
            timestamp: message.timestamp || new Date().toISOString(),
          })),
      );
      return;
    }

    if (!conversationId) {
      setMessages([]);
      return;
    }

    const loadConversationMessages = async () => {
      try {
        const response = await chatAPI.getConversationMessages(conversationId);
        const loadedMessages =
          response?.messages || response?.conversation?.messages || [];

        setMessages(
  loadedMessages
    .filter(
      (message) =>
        message?.role &&
        message?.content &&
        message.content.trim() !== "" &&          // ← add this
        message.role !== "tool" &&
        !(message.role === "assistant" && message.tool_calls?.length),
    )
    .map((message) => ({
      role: message.role,
      content: message.content,
      timestamp: message.timestamp || new Date().toISOString(),
    })),
);
      } catch (error) {
        console.error("Failed to load conversation:", error);
        toast.error("Failed to load conversation");
        setMessages([]);
      }
    };

    loadConversationMessages();
  }, [conversationId, initialMessages]);

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

  const validateMessages = (messagesToSend) => {
    for (let i = 0; i < messagesToSend.length; i++) {
      const msg = messagesToSend[i];
      if (!msg.role) {
        throw new Error(
          `Message at index ${i} is missing required 'role' field.`,
        );
      }
      if (
        !msg.content ||
        typeof msg.content !== "string" ||
        msg.content.trim() === ""
      ) {
        throw new Error(
          `Message at index ${i} has invalid or empty 'content' field`,
        );
      }
    }
    return true;
  };

  // ── Delete conversation handler ────────────────────────────────────────────
  const handleDeleteConversation = async () => {
    if (!conversationId) return;
    try {
      await chatAPI.deleteConversation(conversationId);
      toast.success("Conversation deleted");
      setMessages([]);
      setTokenLimitHit(false);
      setRequestError(null);
      onConversationDeleted?.();          // tell parent to reset / refresh sidebar
    } catch {
      toast.error("Failed to delete conversation");
    }
  };

  // ── Send message ───────────────────────────────────────────────────────────
  const sendMessage = async (content) => {
    if (tokenLimitHit) return;           // extra guard

    setRequestError(null);

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

      const messagesToSend = [...messages, newMessage]
  .filter((m) => m.role === "user" || m.role === "assistant")
  .filter((m) => !m.tool_calls)
  .filter((m) => m.content && m.content.trim() !== "")  // ← add this
  .map((m) => ({
    role: m.role,
    content: m.content,
  }));

      validateMessages(messagesToSend);

      const payload = { messages: messagesToSend };
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
        let errorMessage = "Failed to send message. Please try again.";

        try {
          const errorBody = await response.json();
          errorMessage =
            errorBody?.detail ||
            errorBody?.message ||
            errorBody?.error ||
            errorMessage;
        } catch {
          try {
            const errorText = await response.text();
            if (errorText) {
              errorMessage = errorText;
            }
          } catch {
            // ignore fallback parsing errors
          }
        }

        const isRateLimit = response.status === 429;
        if (isRateLimit) {
          setRequestError({
            type: "rate_limit",
            title: "You're sending messages too fast",
            message:
              errorMessage ||
              "The server asked us to slow down. Please wait a moment and try again.",
          });
          throw new Error("RATE_LIMIT_EXCEEDED");
        }

        throw new Error(errorMessage);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantMessage = "";
      let hitLimit = false;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const data = line.slice(6);

          // ── Token limit signal from backend ───────────────────────────────
          if (data.includes("[TOKEN_LIMIT_EXCEEDED]")) {
            hitLimit = true;
            continue;
          }

          // ── Conversation ID ───────────────────────────────────────────────
          const convIdMatch = data.match(/\[DONE_CONV_ID:(.+)\]/);
          if (convIdMatch) {
            if (onConversationIdChange) {
              onConversationIdChange(convIdMatch[1]);
            }
            continue;
          }

          // ── Generic backend error ─────────────────────────────────────────
          if (data.startsWith("[ERROR:")) {
            // Check if it's a token-limit-flavoured error even without
            // the explicit signal (fallback for older backend)
            const lower = data.toLowerCase();
            if (
              lower.includes("context_length_exceeded") ||
              lower.includes("maximum context length") ||
              lower.includes("token") && lower.includes("limit")
            ) {
              hitLimit = true;
            }
            continue;
          }

          // ── Normal text chunk ─────────────────────────────────────────────
          assistantMessage += data;
          setMessages((prev) =>
            prev.map((message) =>
              message.id === streamMessageId
                ? { ...message, content: assistantMessage, isStreaming: true }
                : message,
            ),
          );
        }
      }

      // Mark streaming done
      setMessages((prev) =>
        prev.map((message) =>
          message.id === streamMessageId
            ? { ...message, isStreaming: false }
            : message,
        ),
      );

      if (hitLimit) {
        setTokenLimitHit(true);
        // Remove the empty placeholder if no content came through
        setMessages((prev) =>
          prev.filter(
            (m) =>
              !(m.id === streamMessageId && (!m.content || m.content.trim() === "")),
          ),
        );
      }
    } catch (error) {
      console.error("Chat error:", error);

      setMessages((prev) =>
        prev.filter((message) => message.id !== streamMessageId),
      );

      if (error.message === "RATE_LIMIT_EXCEEDED") {
        toast.error("You're sending messages too quickly. Please wait and try again.");
        return;
      }

      if (error.message && error.message.includes("missing required")) {
        toast.error(`Message format error: ${error.message}`);
      } else if (error.response?.status === 422) {
        toast.error("Message validation failed. Please try again.");
      } else {
        toast.error("Failed to send message. Please try again.");
      }
    } finally {
      setLoading(false);
      setStreaming(false);
    }
  };

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="relative flex h-full min-h-0 w-full flex-col bg-[#f8f9fa]">
      {/* Messages Area */}
      <div className="min-h-0 flex-1 overflow-y-auto px-3 py-4 [scrollbar-color:#c7d2e0_transparent] [scrollbar-width:thin] sm:px-4 lg:px-6">
        {messages.length === 0 && !tokenLimitHit ? (
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
            {requestError && (
              <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 shadow-[0_12px_30px_-24px_rgba(220,38,38,0.45)]">
                <p className="font-semibold">{requestError.title}</p>
                <p className="mt-1 leading-relaxed">{requestError.message}</p>
              </div>
            )}
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

            {/* Token limit banner — rendered inline after last message */}
            {tokenLimitHit && (
              <div className="mt-4 px-1">
                <TokenLimitBanner
                  onDeleteConversation={handleDeleteConversation}
                />
              </div>
            )}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="sticky bottom-0 z-10 border-t border-white/70 bg-[#f8f9fa]/95 backdrop-blur-sm">
        <div className="px-3 py-3 sm:px-4 lg:px-6">
          {tokenLimitHit ? (
            <BlockedInput />
          ) : (
            <ChatInput onSendMessage={sendMessage} disabled={loading} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;