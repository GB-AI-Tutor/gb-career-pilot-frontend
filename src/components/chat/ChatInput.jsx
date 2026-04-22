import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import Button from "../../components/common/Button";

const ChatInput = ({ onSendMessage, disabled = false }) => {
  const [message, setMessage] = useState("");
  const textareaRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message);
      setMessage("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [message]);

  return (
    <form
      onSubmit={handleSubmit}
      className="border-t border-white/50 bg-white/85 px-3 py-3 backdrop-blur-2xl sm:px-4 sm:py-4"
    >
      <div className="flex gap-2 rounded-2xl bg-[#f3f4f5] p-2 shadow-[0_18px_42px_-34px_rgba(0,33,71,0.45)] ring-1 ring-[#d9e1ea]/70">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask me anything about universities and programs..."
          disabled={disabled}
          rows={1}
          className="max-h-32 flex-1 resize-none rounded-xl border-0 bg-transparent px-3 py-3 text-[#000a1e] outline-none placeholder:text-[#6b7f97] focus:ring-0"
        />
        <Button
          type="submit"
          disabled={disabled || !message.trim()}
          className="self-end rounded-xl bg-[linear-gradient(135deg,#002147,#000a1e)] px-4 py-3 text-white shadow-[0_18px_42px_-28px_rgba(0,33,71,0.8)] hover:translate-y-0 hover:opacity-95"
        >
          <Send className="w-5 h-5" />
        </Button>
      </div>
      <p className="mt-2 text-xs text-[#6b7f97]">
        Press Enter to send, Shift+Enter for new line
      </p>
    </form>
  );
};

export default ChatInput;
