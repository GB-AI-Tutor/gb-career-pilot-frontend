import { useState, useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import Loader from '../common/Loader';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

const ChatInterface = ({ conversationId, onConversationIdChange }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [streaming, setStreaming] = useState(false);
  const messagesEndRef = useRef(null);
  const { user } = useAuth();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Validate message format before sending to backend
  const validateMessages = (messagesToSend) => {
    console.log('📋 Messages to validate:', messagesToSend);

    for (let i = 0; i < messagesToSend.length; i++) {
      const msg = messagesToSend[i];
      console.log(`  [${i}] role: ${msg.role}, content: ${msg.content?.substring(0, 50)}...`);

      if (!msg.role) {
        console.error(`❌ Message ${i} missing 'role' field!`, JSON.stringify(msg, null, 2));
        throw new Error(`Message at index ${i} is missing required 'role' field. Expected: 'user' or 'assistant'`);
      }
      if (!msg.content || typeof msg.content !== 'string' || msg.content.trim() === '') {
        console.error(`❌ Message ${i} has invalid content!`, msg);
        throw new Error(`Message at index ${i} has invalid or empty 'content' field`);
      }
    }
    console.log(`✅ Message validation passed for ${messagesToSend.length} messages`);
    return true;
  };

  const sendMessage = async (content) => {
    const streamMessageId = `stream_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    const newMessage = {
      role: 'user',
      content,
      timestamp: new Date().toISOString()
    };

    const assistantPlaceholder = {
      id: streamMessageId,
      role: 'assistant',
      content: '',
      isStreaming: true,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, newMessage, assistantPlaceholder]);
    setLoading(true);
    setStreaming(true);

    try {
      const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
      const token = localStorage.getItem('access_token');

      // Prepare messages for API - extract only role and content
      console.log('📦 Current messages in state:', messages);
      console.log('📝 New message being added:', newMessage);

      const messagesToSend = [...messages, newMessage].map(m => ({
        role: m.role,
        content: m.content,
      }));

      console.log('🔄 Messages prepared for sending:', messagesToSend);

      // Validate all messages have required fields before sending
      validateMessages(messagesToSend);

      const payload = {
        messages: messagesToSend,
      };

      if (conversationId) {
        payload.conversation_id = conversationId;
      }

      const response = await fetch(`${API_BASE}/api/v1/groq/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantMessage = '';

      console.log('🔵 Starting SSE stream processing...');

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          console.log('🟢 SSE stream completed');
          break;
        }

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');
        console.log(`📨 Received chunk with ${lines.length} lines`);

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            console.log(`📍 Processing data line: "${data.substring(0, 50)}..."`);

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
            console.log(`📝 Assistant message so far (${assistantMessage.length} chars): "${assistantMessage.substring(0, 80)}..."`);

            setMessages(prev => {
              console.log(`  🔄 setMessages callback received`);
              console.log(`  📌 Current prev messages:`, prev.map(m => ({ role: m.role, contentLen: m.content?.length })));

              const newMessages = prev.map(message => {
                if (message.id === streamMessageId) {
                  return {
                    ...message,
                    content: assistantMessage,
                    isStreaming: true,
                  };
                }
                return message;
              });

              console.log(`  📊 Final newMessages:`, newMessages.map(m => ({ role: m.role, contentLen: m.content?.length })));
              return newMessages;
            });
          }
        }
      }

      setMessages(prev =>
        prev.map(message =>
          message.id === streamMessageId
            ? { ...message, isStreaming: false }
            : message
        )
      );
    } catch (error) {
      console.error('❌ Chat error:', error);

      setMessages(prev =>
        prev.filter(message => message.id !== streamMessageId)
      );

      // Handle validation errors specifically
      if (error.message && error.message.includes('missing required')) {
        toast.error(`Message format error: ${error.message}`);
      } else if (error.response?.status === 422) {
        toast.error('Message validation failed. Please check the format and try again.');
      } else {
        toast.error('Failed to send message. Please try again.');
      }
    } finally {
      setLoading(false);
      setStreaming(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-8">
            <div className="text-6xl mb-4">💬</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Start a Conversation
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-md">
              Ask me anything about universities, programs, admission requirements, or career guidance!
            </p>
            <div className="mt-6 grid gap-2 max-w-md">
              <button
                onClick={() => sendMessage("What universities should I consider for Computer Science in Pakistan?")}
                className="text-left text-white p-3 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                💻 What universities should I consider for Computer Science in Pakistan?
              </button>
              <button
                onClick={() => sendMessage("Tell me about admission requirements of NUST university")}
                className="text-left text-white p-3 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                📋 Tell me about admission requirements of NUST university
              </button>
              <button
                onClick={() => sendMessage("What are my chances with " + (user?.fsc_percentage || "85") + "% FSC to get admission in FAST university?")}
                className="text-left text-white p-3 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                🎯 What are my chances with {user?.fsc_percentage || "85"}% FSC to get admission in FAST university?
              </button>
            </div>
          </div>
        ) : (
          <>
            {messages.map((message, index) => (
              <ChatMessage key={index} message={message} />
            ))}
            {streaming && (
              <div className="flex gap-3 mb-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-gray-200 dark:bg-gray-700">
                  <Loader size="sm" />
                </div>
                <div className="text-gray-600 dark:text-gray-400">Thinking...</div>
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
