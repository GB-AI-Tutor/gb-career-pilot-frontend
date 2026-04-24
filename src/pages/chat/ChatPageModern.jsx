import { useEffect, useMemo, useState } from "react";
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
  X,
  Menu,
} from "lucide-react";
import toast from "react-hot-toast";
import "../../styles/design-system.css";

const formatConversationTimestamp = (dateString) => {
  if (!dateString) {
    return "Just now";
  }

  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) {
    return "Just now";
  }

  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMinutes = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMinutes < 1) {
    return "Just now";
  }

  if (diffMinutes < 60) {
    return `${diffMinutes}m ago`;
  }

  if (diffHours < 24) {
    return `${diffHours}h ago`;
  }

  if (diffDays < 7) {
    return `${diffDays}d ago`;
  }

  return date.toLocaleDateString();
};

const ChatPageModern = () => {
  const [conversationId, setConversationId] = useState(null);
  const [initialMessage, setInitialMessage] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedConversationMessages, setSelectedConversationMessages] =
    useState([]);
  const [conversationDisplayLimit, setConversationDisplayLimit] = useState(5);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    const applyLimit = (matches) => {
      setConversationDisplayLimit(matches ? 10 : 5);
    };

    applyLimit(mediaQuery.matches);

    const handleMediaChange = (event) => {
      applyLimit(event.matches);
    };

    mediaQuery.addEventListener("change", handleMediaChange);
    return () => mediaQuery.removeEventListener("change", handleMediaChange);
  }, []);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await chatAPI.listConversations();
        const normalizedConversations = (response?.conversations || []).map(
          (conversation) => ({
            id: conversation.id,
            title: conversation.title || "New Conversation",
            preview: conversation.preview || "",
            timestamp: formatConversationTimestamp(
              conversation.last_message_at || conversation.created_at,
            ),
            unread: 0,
            lastMessageAt:
              conversation.last_message_at || conversation.created_at || null,
            messages:
              conversation.messages ||
              conversation.history ||
              conversation.chat_history ||
              [],
          }),
        );

        setConversations(normalizedConversations);
      } catch (error) {
        console.error("Failed to load conversations:", error);
        toast.error("Failed to load conversations");
      }
    };

    fetchConversations();
  }, []);

  const filteredConversations = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    const ordered = [...conversations].sort(
      (a, b) =>
        new Date(b.lastMessageAt || 0).getTime() -
        new Date(a.lastMessageAt || 0).getTime(),
    );

    if (!query) {
      return ordered;
    }

    return ordered.filter(
      (conversation) =>
        conversation.title.toLowerCase().includes(query) ||
        conversation.preview.toLowerCase().includes(query),
    );
  }, [conversations, searchTerm]);

  const visibleConversations = useMemo(
    () => filteredConversations.slice(0, conversationDisplayLimit),
    [filteredConversations, conversationDisplayLimit],
  );

  const handleNewConversation = () => {
    setIsChatOpen(true);
    setIsSidebarOpen(false);
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
    setSelectedConversationMessages([]);
    setInitialMessage(null);
  };

  const handleQuickPrompt = (prompt) => {
    setIsChatOpen(true);
    setIsSidebarOpen(false);
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
    setSelectedConversationMessages([]);
  };

  const handleConversationSelect = async (conversation) => {
    setIsChatOpen(true);
    setIsSidebarOpen(false);
    setSelectedConversation(conversation);
    setConversationId(conversation.id);
    setInitialMessage(null);

    if (Array.isArray(conversation.messages) && conversation.messages.length > 0) {
      setSelectedConversationMessages(conversation.messages);
      return;
    }

    try {
      const response = await chatAPI.getConversationMessages(conversation.id);
      const loadedMessages =
        response?.messages || response?.conversation?.messages || [];

      setSelectedConversationMessages(loadedMessages);
      setConversations((prev) =>
        prev.map((item) =>
          item.id === conversation.id ? { ...item, messages: loadedMessages } : item,
        ),
      );
    } catch (error) {
      console.error("Failed to load conversation messages:", error);
      setSelectedConversationMessages([]);
      toast.error("Failed to load previous messages");
    }
  };

  const handleDeleteConversation = async (event, conversationIdToDelete) => {
    event.stopPropagation();

    try {
      await chatAPI.deleteConversation(conversationIdToDelete);

      setConversations((prev) =>
        prev.filter((conversation) => conversation.id !== conversationIdToDelete),
      );

      if (selectedConversation?.id === conversationIdToDelete) {
        setSelectedConversation(null);
        setConversationId(null);
        setSelectedConversationMessages([]);
        setIsChatOpen(false);
      }

      toast.success("Conversation deleted");
    } catch (error) {
      console.error("Failed to delete conversation:", error);
      toast.error("Failed to delete conversation");
    }
  };

  const handleInitialMessageConsumed = () => {
    setInitialMessage(null);
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
            lastMessageAt: new Date().toISOString(),
          };
        }
        return conversation;
      }),
    );

    setSelectedConversation((prev) =>
      prev
        ? {
            ...prev,
            id: newConversationId,
            timestamp: "Just now",
            lastMessageAt: new Date().toISOString(),
          }
        : prev,
    );
  };

  const quickPrompts = [
    "What are the top universities in Pakistan?",
    "Compare NUST vs FAST for CS",
    "What's the admission process for LUMS?",
    "Recommend programs based on my FSC marks",
  ];

  const hasActiveChat =
    isChatOpen || Boolean(selectedConversation) || Boolean(initialMessage);

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-[#f8f9fa] text-[#000a1e] lg:flex-row">
      {isSidebarOpen && (
        <button
          type="button"
          aria-label="Close conversation sidebar"
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-30 cursor-default bg-black/35 backdrop-blur-[2px] lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-[86vw] max-w-[22rem] min-h-0 -translate-x-full flex-col border-r border-white/40 bg-white/95 shadow-[0_24px_60px_-30px_rgba(0,33,71,0.35)] backdrop-blur-2xl transition-transform duration-300 ease-out lg:static lg:z-auto lg:h-full lg:w-[22rem] lg:translate-x-0 lg:border-b-0 lg:shadow-none ${
          isSidebarOpen ? "translate-x-0" : ""
        }`}
      >
        {/* Sidebar Header */}
        <div className="space-y-3 border-b border-white/50 p-4 sm:p-6">
          <div className="mb-2 flex items-center justify-between lg:hidden">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#002147,#000a1e)] text-white shadow-[0_18px_40px_-25px_rgba(0,33,71,0.7)]">
                <Brain className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#000a1e]">
                  Conversations
                </p>
                <p className="text-xs text-[#4f627c]">Recent chats</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsSidebarOpen(false)}
              className="rounded-xl p-2 text-[#4f627c] transition-colors hover:bg-[#f3f4f5] hover:text-[#000a1e]"
              aria-label="Close conversation sidebar"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex items-center gap-3 lg:hidden">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#002147,#000a1e)] text-white shadow-[0_18px_40px_-25px_rgba(0,33,71,0.7)]">
              <Brain className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#000a1e]">
                AI Counselor
              </p>
              <p className="text-xs text-[#4f627c]">Career guidance, anytime</p>
            </div>
          </div>

          <Link to="/dashboard" className="block">
            <button className="btn-secondary w-full justify-center rounded-xl border border-[#cfd8e3] bg-[#f3f4f5] text-[#000a1e] hover:bg-white">
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </button>
          </Link>
          <button
            onClick={handleNewConversation}
            className="btn-primary w-full justify-center rounded-xl bg-[linear-gradient(135deg,#002147,#000a1e)] shadow-[0_20px_45px_-25px_rgba(0,33,71,0.7)]"
          >
            <Plus className="w-5 h-5" />
            New Conversation
          </button>
        </div>

        {/* Search */}
        <div className="border-b border-white/50 p-4 sm:p-5">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6b7f97]" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="w-full rounded-xl border border-[#d9e1ea] bg-[#f8f9fa] py-3 pl-10 pr-4 text-sm text-[#000a1e] outline-none transition-all placeholder:text-[#6b7f97] focus:border-[#006d36]/35 focus:bg-white focus:ring-2 focus:ring-[#006d36]/15"
            />
          </div>
        </div>

        {/* Conversations List */}
        <div className="min-h-[16rem] max-h-[40dvh] overflow-y-auto [scrollbar-color:#c7d2e0_transparent] [scrollbar-width:thin] lg:min-h-0 lg:max-h-none lg:flex-1">
          {visibleConversations.map((conv) => (
            <div
              key={conv.id}
              onClick={() => handleConversationSelect(conv)}
              className={`cursor-pointer border-b border-white/40 p-4 transition-all ${
                selectedConversation?.id === conv.id
                  ? "bg-[#e7e8e9]"
                  : "hover:bg-[#f3f4f5]"
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2 min-w-0">
                  <h3 className="text-sm font-semibold text-[#000a1e] line-clamp-1">
                    {conv.title}
                  </h3>
                  {conv.unread > 0 && (
                    <span className="rounded-full bg-[#006d36] px-2 py-0.5 text-xs font-bold text-white">
                      {conv.unread}
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={(event) => handleDeleteConversation(event, conv.id)}
                  className="rounded-lg p-1 text-[#6b7f97] transition-colors hover:bg-white hover:text-[#000a1e]"
                  aria-label={`Delete ${conv.title}`}
                  title="Delete conversation"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <p className="mb-2 line-clamp-2 text-sm text-[#4f627c]">
                {conv.preview}
              </p>
              <div className="flex items-center gap-2 text-xs text-[#6b7f97]">
                <Clock className="w-3 h-3" />
                {conv.timestamp}
              </div>
            </div>
          ))}
          {filteredConversations.length > conversationDisplayLimit && (
            <div className="p-3 text-center text-xs text-[#6b7f97] border-t border-white/50 bg-white/60">
              Showing {conversationDisplayLimit} of {filteredConversations.length} conversations
            </div>
          )}
        </div>

        {/* Sidebar Footer */}
        <div className="border-t border-white/50 bg-[#f3f4f5] p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[linear-gradient(135deg,#002147,#000a1e)] shadow-[0_20px_45px_-25px_rgba(0,33,71,0.7)]">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-[#000a1e]">
                AI Counselor
              </p>
              <p className="text-xs text-[#4f627c]">Always ready to help</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex min-h-0 flex-1 flex-col overflow-hidden lg:h-full">
        {/* Chat Header */}
        <div className="sticky top-0 z-20 border-b border-white/40 bg-white/85 px-4 py-4 shadow-[0_16px_45px_-35px_rgba(0,33,71,0.45)] backdrop-blur-2xl sm:px-6">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setIsSidebarOpen(true)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[#d9e1ea] bg-white text-[#000a1e] shadow-[0_12px_30px_-24px_rgba(0,33,71,0.4)] transition-colors hover:bg-[#f3f4f5] lg:hidden"
                aria-label="Open conversation sidebar"
              >
                <Menu className="h-5 w-5" />
              </button>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#002147,#000a1e)] shadow-[0_20px_45px_-25px_rgba(0,33,71,0.7)]">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold tracking-[-0.01em] text-[#000a1e] sm:text-xl">
                  {selectedConversation?.title || "AI Career Counselor"}
                </h2>
                <p className="flex items-center gap-2 text-sm text-[#4f627c]">
                  <span className="h-2 w-2 rounded-full bg-[#006d36] animate-pulse"></span>
                  Online - Ready to assist
                </p>
              </div>
            </div>
            <button className="flex h-10 w-10 items-center justify-center rounded-xl hover:bg-[#f3f4f5] transition-colors">
              <MoreVertical className="w-5 h-5 text-[#4f627c]" />
            </button>
          </div>
        </div>

        {/* Chat Interface Component */}
        <div className="min-h-0 flex-1 overflow-hidden bg-[#f8f9fa]">
          <div className="flex h-full min-h-0 flex-col">
            {hasActiveChat ? (
              <ChatInterface
                conversationId={conversationId}
                onConversationIdChange={handleConversationIdChange}
                initialMessage={initialMessage}
                onInitialMessageConsumed={handleInitialMessageConsumed}
                initialMessages={selectedConversationMessages}
              />
            ) : (
              /* Welcome State */
              <div className="flex flex-1 items-center justify-center p-4 sm:p-8">
                <div className="max-w-2xl text-center">
                  <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-[linear-gradient(135deg,#002147,#000a1e)] shadow-[0_24px_50px_-28px_rgba(0,33,71,0.7)] animate-float">
                    <Sparkles className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="mb-4 text-[clamp(2rem,4vw,3rem)] leading-[1.1] tracking-[-0.02em] text-[#000a1e]">
                    Welcome to AI Career Counselor
                  </h2>
                  <p className="mb-8 text-base leading-relaxed text-[#4f627c] sm:text-lg">
                    I'm here to help you navigate university admissions in
                    Pakistan. Ask me anything about universities, programs,
                    eligibility, or career guidance.
                  </p>

                  {/* Quick Prompts */}
                  <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {quickPrompts.map((prompt, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuickPrompt(prompt)}
                        className="group rounded-2xl bg-white/85 p-4 text-left shadow-[0_16px_40px_-30px_rgba(0,33,71,0.35)] transition-all hover:-translate-y-1 hover:bg-white"
                      >
                        <div className="flex items-start gap-3">
                          <MessageSquare className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#006d36]" />
                          <p className="text-sm text-[#2e3f58] transition-colors group-hover:text-[#000a1e] sm:text-base">
                            {prompt}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={handleNewConversation}
                    className="inline-flex items-center gap-2 rounded-xl bg-[linear-gradient(135deg,#002147,#000a1e)] px-6 py-3 text-sm font-semibold text-white shadow-[0_20px_45px_-25px_rgba(0,33,71,0.7)] transition-transform hover:-translate-y-0.5"
                  >
                    <Plus className="w-5 h-5" />
                    Start New Conversation
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChatPageModern;
