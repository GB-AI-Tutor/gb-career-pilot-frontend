import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ChatInterface from "../../components/chat/ChatInterface";
import { chatAPI } from "../../api/chat";
import {
  MessageSquare,
  ArrowLeft,
  Sparkles,
  Plus,
  Search,
  MoreVertical,
  Brain,
  Clock,
} from "lucide-react";
import "../../styles/design-system.css";

const ChatPageModern = () => {
  const [conversationId, setConversationId] = useState(null);
  const [initialMessage, setInitialMessage] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);

  const formatRelativeTime = (isoDate) => {
    if (!isoDate) return "Just now";

    const timeValue = new Date(isoDate).getTime();
    if (Number.isNaN(timeValue)) return "Just now";

    const diffMs = Date.now() - timeValue;
    const diffMinutes = Math.floor(diffMs / 60000);

    if (diffMinutes < 1) return "Just now";
    if (diffMinutes < 60) return `${diffMinutes} min ago`;

    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24)
      return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;

    const diffDays = Math.floor(diffHours / 24);
    if (diffDays === 1) return "Yesterday";
    return `${diffDays} days ago`;
  };

  useEffect(() => {
    const loadConversations = async () => {
      try {
        const response = await chatAPI.getConversations();
        const backendConversations = (response?.conversations || []).map(
          (conv) => ({
            id: conv.id,
            title: conv.title || "New Conversation",
            preview: conv.preview || "",
            timestamp: formatRelativeTime(
              conv.last_message_at || conv.created_at,
            ),
            unread: 0,
          }),
        );

        setConversations(backendConversations);

        if (backendConversations.length > 0) {
          setSelectedConversation(backendConversations[0]);
          setConversationId(backendConversations[0].id);
        }
      } catch (error) {
        console.error("Failed to load conversations:", error);
      }
    };

    loadConversations();
  }, []);

  const handleNewConversation = () => {
    const newConv = {
      id: crypto.randomUUID(),
      title: "New Conversation",
      preview: "",
      timestamp: "Just now",
      unread: 0,
    };
    setConversations((prev) => [newConv, ...prev]);
    setSelectedConversation(newConv);
    setConversationId(null);
    setInitialMessage(null);
  };

  const handleQuickPrompt = (prompt) => {
    const localConvId = crypto.randomUUID();
    setConversationId(null);
    setInitialMessage(prompt);
    const newConv = {
      id: localConvId,
      title: prompt.substring(0, 30) + "...",
      preview: prompt,
      timestamp: "Just now",
      unread: 0,
    };
    setConversations((prev) => [newConv, ...prev]);
    setSelectedConversation(newConv);
  };

  const handleConversationIdChange = (newConversationId) => {
    setConversationId(newConversationId);
    setConversations((prev) =>
      prev.map((conversation) => {
        if (conversation.id === selectedConversation?.id) {
          return {
            ...conversation,
            id: newConversationId,
            timestamp: "Just now",
          };
        }
        return conversation;
      }),
    );

    setSelectedConversation((prev) =>
      prev ? { ...prev, id: newConversationId, timestamp: "Just now" } : prev,
    );
  };

  const quickPrompts = [
    "What are the top universities in Pakistan?",
    "Compare NUST vs FAST for CS",
    "What's the admission process for LUMS?",
    "Recommend programs based on my FSC marks",
  ];

  return (
    <div className="h-screen flex bg-neutral-50">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-neutral-200 flex flex-col">
        {/* Sidebar Header */}
        <div className="p-6 border-b border-neutral-200">
          <Link to="/dashboard">
            <button className="btn-secondary w-full mb-4">
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </button>
          </Link>
          <button
            onClick={handleNewConversation}
            className="btn-primary w-full"
          >
            <Plus className="w-5 h-5" />
            New Conversation
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-neutral-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-neutral-200 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100 text-body-sm"
            />
          </div>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto">
          {conversations.map((conv) => (
            <div
              key={conv.id}
              onClick={() => {
                setSelectedConversation(conv);
                setConversationId(conv.id);
              }}
              className={`p-4 border-b border-neutral-100 cursor-pointer transition-colors ${
                selectedConversation?.id === conv.id
                  ? "bg-primary-50 border-l-4 border-l-primary-500"
                  : "hover:bg-neutral-50"
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-body-md font-semibold text-primary-900 line-clamp-1">
                  {conv.title}
                </h3>
                {conv.unread > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-accent-500 text-white text-xs font-bold">
                    {conv.unread}
                  </span>
                )}
              </div>
              <p className="text-body-sm text-neutral-600 line-clamp-2 mb-2">
                {conv.preview}
              </p>
              <div className="flex items-center gap-2 text-xs text-neutral-500">
                <Clock className="w-3 h-3" />
                {conv.timestamp}
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-neutral-200 bg-primary-50">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-body-sm font-semibold text-primary-900">
                AI Counselor
              </p>
              <p className="text-xs text-neutral-600">Always ready to help</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="bg-white border-b border-neutral-200 px-6 py-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-soft">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-heading-sm text-primary-900">
                  {selectedConversation?.title || "AI Career Counselor"}
                </h2>
                <p className="text-body-sm text-neutral-600 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-success-500 animate-pulse"></span>
                  Online - Ready to assist
                </p>
              </div>
            </div>
            <button className="w-10 h-10 rounded-lg hover:bg-neutral-100 flex items-center justify-center transition-colors">
              <MoreVertical className="w-5 h-5 text-neutral-600" />
            </button>
          </div>
        </div>

        {/* Chat Interface Component */}
        <div className="flex-1 overflow-hidden bg-gradient-hero">
          <div className="h-full flex flex-col">
            {conversationId ? (
              <ChatInterface
                conversationId={conversationId}
                onConversationIdChange={handleConversationIdChange}
                initialMessage={initialMessage}
              />
            ) : (
              /* Welcome State */
              <div className="flex-1 flex items-center justify-center p-8">
                <div className="max-w-2xl text-center">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center mx-auto mb-6 shadow-lifted animate-float">
                    <Sparkles className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-display-md text-primary-900 mb-4">
                    Welcome to AI Career Counselor
                  </h2>
                  <p className="text-body-lg text-neutral-600 mb-8">
                    I'm here to help you navigate university admissions in
                    Pakistan. Ask me anything about universities, programs,
                    eligibility, or career guidance.
                  </p>

                  {/* Quick Prompts */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    {quickPrompts.map((prompt, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuickPrompt(prompt)}
                        className="card-float text-left hover-lift group"
                      >
                        <div className="flex items-start gap-3">
                          <MessageSquare className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                          <p className="text-body-md text-neutral-700 group-hover:text-primary-700 transition-colors">
                            {prompt}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={handleNewConversation}
                    className="btn-accent"
                  >
                    <Plus className="w-5 h-5" />
                    Start New Conversation
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPageModern;
