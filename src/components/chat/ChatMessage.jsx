import { formatDate } from "../../utils/formatters";
import { User, Bot } from "lucide-react";

const ChatMessage = ({ message }) => {
  const isUser = message.role === "user";

  return (
    <div className={`mb-4 flex gap-3 ${isUser ? "flex-row-reverse" : ""}`}>
      <div
        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isUser
            ? "bg-[linear-gradient(135deg,#002147,#000a1e)] text-white shadow-[0_12px_24px_-18px_rgba(0,33,71,0.8)]"
            : "bg-[#e7e8e9] text-[#000a1e]"
        }`}
      >
        {isUser ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
      </div>

      <div className={`flex-1 ${isUser ? "text-right" : ""}`}>
        <div
          className={`inline-block max-w-[80%] rounded-lg px-4 py-2 ${
            isUser
              ? "bg-[linear-gradient(135deg,#002147,#000a1e)] text-white shadow-[0_16px_36px_-24px_rgba(0,33,71,0.8)]"
              : "bg-white text-[#000a1e] shadow-[0_16px_36px_-30px_rgba(0,33,71,0.25)] ring-1 ring-[#d9e1ea]/70"
          }`}
        >
          <div className="whitespace-pre-wrap break-words text-sm leading-relaxed sm:text-base">
            {message.content}
          </div>
        </div>
        {message.timestamp && (
          <div className="mt-1 text-xs text-[#6b7f97]">
            {formatDate(message.timestamp)}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
