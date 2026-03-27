import { formatDate } from "../../utils/formatters";
import { User, Bot } from "lucide-react";

const ChatMessage = ({ message }) => {
  const isUser = message.role === "user";

  return (
    <div className={`flex gap-3 ${isUser ? "flex-row-reverse" : ""} mb-4`}>
      <div
        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isUser
            ? "bg-primary-600 text-white"
            : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
        }`}
      >
        {isUser ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
      </div>

      <div className={`flex-1 ${isUser ? "text-right" : ""}`}>
        <div
          className={`inline-block max-w-[80%] rounded-lg px-4 py-2 ${
            isUser
              ? "bg-primary-600 text-white"
              : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          }`}
        >
          <div className="whitespace-pre-wrap break-words">
            {message.content}
          </div>
        </div>
        {message.timestamp && (
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {formatDate(message.timestamp)}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
