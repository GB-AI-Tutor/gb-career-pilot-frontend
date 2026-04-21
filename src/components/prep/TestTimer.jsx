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
  const { timeRemaining, isExpired, formattedTime } = useTestTimer(
    deadlineMs,
    onExpire,
  );

  // Get color based on time remaining
  const getTimerColor = () => {
    const minutes = Math.floor(timeRemaining / 60000);

    if (isExpired || timeRemaining === 0) {
      return "text-red-600 bg-red-50 border-red-200";
    } else if (minutes < 5) {
      return "text-red-600 bg-red-50 border-red-200 animate-pulse";
    } else if (minutes < 15) {
      return "text-orange-600 bg-orange-50 border-orange-200";
    } else {
      return "text-gray-700 bg-white border-gray-200";
    }
  };

  if (!deadlineMs) {
    return null;
  }

  return (
    <div
      className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 font-mono text-lg font-semibold transition-all ${getTimerColor()}`}
    >
      {isExpired ? (
        <>
          <AlertCircle className="w-5 h-5" />
          <span>Time's Up!</span>
        </>
      ) : (
        <>
          <Clock className="w-5 h-5" />
          <span>{formattedTime}</span>
        </>
      )}
    </div>
  );
};

export default TestTimer;
