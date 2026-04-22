import { Clock, AlertCircle } from "lucide-react";
import { useTestTimer } from "../../hooks/useTestTimer";

/**
 * TestTimer Component
 * Displays countdown timer for test with visual warnings
 *
 * @param {number} deadlineMs - Unix timestamp in ms when test expires
 * @param {function} onExpire - Callback when timer reaches zero
 */
const TestTimer = ({ deadlineMs, onExpire }) => {
  const { isExpired, formattedTime } = useTestTimer(deadlineMs, onExpire);

  // Get color based on time remaining
  // const getTimerColor = () => {
  //   const minutes = Math.floor(timeRemaining / 60000);

  //   if (isExpired || timeRemaining === 0) {
  //     return "text-red-600 bg-red-50 border-red-200";
  //   } else if (minutes < 5) {
  //     return "text-red-600 bg-red-50 border-red-200 animate-pulse";
  //   } else if (minutes < 15) {
  //     return "text-orange-600 bg-orange-50 border-orange-200";
  //   } else {
  //     return "text-gray-700 bg-white border-gray-200";
  //   }
  // };

  if (!deadlineMs) return null;

  return (
    <div
      className={`backdrop-blur-[20px] bg-white/80 px-6 py-3 rounded-2xl flex items-center gap-3 shadow-soft font-manrope font-black text-lg transition-all duration-500 border border-white/40 ${
        isExpired ? "text-red-600 scale-110" : "text-[#000a1e]"
      }`}
    >
      {isExpired ? (
        <AlertCircle className="w-5 h-5 animate-pulse" />
      ) : (
        <Clock className="w-5 h-5 text-[#006d36]" />
      )}
      <span>{formattedTime}</span>
    </div>
  );
};

export default TestTimer;
