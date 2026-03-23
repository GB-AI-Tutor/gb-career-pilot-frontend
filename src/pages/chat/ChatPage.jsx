import { useState } from 'react';
import { Link } from 'react-router-dom';
import ChatInterface from '../../components/chat/ChatInterface';
import { MessageSquare, Home, ArrowLeft } from 'lucide-react';
import Button from '../../components/common/Button';

const ChatPage = () => {
  const [conversationId, setConversationId] = useState(null);

  const handleNewConversation = () => {
    setConversationId(null);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/dashboard">
                <Button variant="secondary" className="flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Dashboard
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <MessageSquare className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  AI Career Counselor
                </h1>
              </div>
            </div>
            <Button onClick={handleNewConversation} variant="outline">
              New Chat
            </Button>
          </div>
        </div>
      </div>

      {/* Chat Interface */}
      <div className="flex-1 overflow-hidden">
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
