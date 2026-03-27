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
      className="border-t border-gray-200 dark:border-gray-700 p-4"
    >
      <div className="flex gap-2">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask me anything about universities and programs..."
          disabled={disabled}
          rows={1}
          className="flex-1 resize-none rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 max-h-32 overflow-y-auto"
        />
        <Button
          type="submit"
          disabled={disabled || !message.trim()}
          className="self-end"
        >
          <Send className="w-5 h-5" />
        </Button>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
        Press Enter to send, Shift+Enter for new line
      </p>
    </form>
  );
};

export default ChatInput;
