import { useState } from 'react';
import { Link } from 'react-router-dom';
import ChatInterface from '../../components/chat/ChatInterface';
import { MessageSquare, ArrowLeft, Sparkles, Plus } from 'lucide-react';

const ChatPage = () => {
  const [conversationId, setConversationId] = useState(null);

  const handleNewConversation = () => {
    setConversationId(null);
  };

  return (
    <div className="h-screen flex flex-col relative overflow-hidden" style={{ background: '#FFF9F0' }}>
      {/* Decorative blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="blob-float absolute top-20 left-10 w-64 h-64 rounded-full"
             style={{ background: 'radial-gradient(circle, rgba(255,107,107,0.2) 0%, transparent 70%)', animation: 'blob-float 25s ease-in-out infinite' }} />
        <div className="blob-float absolute bottom-20 right-10 w-80 h-80 rounded-full"
             style={{ background: 'radial-gradient(circle, rgba(78,205,196,0.2) 0%, transparent 70%)', animationDelay: '-10s', animation: 'blob-float 25s ease-in-out infinite' }} />
      </div>

      {/* Header */}
      <div className="relative z-10 bg-white/80 backdrop-blur-xl shadow-lg border-b-2 border-[#FF6B6B]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/dashboard">
                <button className="flex items-center gap-2 px-4 py-2.5 bg-white text-[#FF6B6B] font-semibold rounded-2xl border-2 border-[#FF6B6B] shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
                        style={{ fontFamily: 'Outfit, sans-serif' }}>
                  <ArrowLeft className="w-4 h-4" />
                  Dashboard
                </button>
              </Link>
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-gradient-to-br from-[#FF6B6B] to-[#FFB88C] rounded-2xl shadow-lg" style={{ animation: 'float 3s ease-in-out infinite' }}>
                  <MessageSquare className="w-6 h-6 text-white" strokeWidth={2.5} />
                </div>
                <h1 className="text-2xl font-bold text-[#2C3E50]" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  AI Career Counselor
                </h1>
                <Sparkles className="w-5 h-5 text-[#FFE66D]" style={{ animation: 'float 2s ease-in-out infinite 0.5s' }} />
              </div>
            </div>
            <button onClick={handleNewConversation} 
                    className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#4ECDC4] to-[#44A08D] text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
                    style={{ fontFamily: 'Outfit, sans-serif' }}>
              <Plus className="w-5 h-5" />
              New Chat
            </button>
          </div>
        </div>
      </div>

      {/* Chat Interface */}
      <div className="flex-1 overflow-hidden relative z-10">
        <div className="max-w-4xl mx-auto h-full">
          <ChatInterface 
            conversationId={conversationId}
            onConversationIdChange={setConversationId}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
