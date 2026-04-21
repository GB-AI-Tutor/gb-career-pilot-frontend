import { X, Check, Circle } from "lucide-react";

/**
 * QuestionGrid Component
 * Mobile-friendly drawer showing all questions with status
 *
 * @param {array} questions - Array of question objects
 * @param {object} answers - Object mapping question IDs to selected answers
 * @param {number} currentIndex - Currently displayed question index
 * @param {function} onNavigate - Callback when question is clicked
 * @param {boolean} isOpen - Whether drawer is open (mobile)
 * @param {function} onClose - Close drawer callback
 */
const QuestionGrid = ({
  questions,
  answers,
  currentIndex,
  onNavigate,
  isOpen = true,
  onClose,
}) => {
  const getQuestionStatus = (question) => {
    if (answers[question.id]) {
      return "answered";
    }
    return "unanswered";
  };

  const getStatusIcon = (status) => {
    if (status === "answered") {
      return <Check className="w-4 h-4" />;
    }
    return <Circle className="w-4 h-4" />;
  };

  const getStatusColor = (questionIndex, status) => {
    const isCurrent = questionIndex === currentIndex;

    if (isCurrent && status === "answered") {
      return "bg-primary-600 text-white border-primary-600";
    } else if (isCurrent) {
      return "bg-primary-600 text-white border-primary-600";
    } else if (status === "answered") {
      return "bg-green-50 text-green-700 border-green-300";
    } else {
      return "bg-gray-50 text-gray-600 border-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600";
    }
  };

  const content = (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white">
            Questions
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {Object.keys(answers).length} of {questions.length} answered
          </p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg md:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Question Grid */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-5 md:grid-cols-4 lg:grid-cols-5 gap-2">
          {questions.map((question, index) => {
            const status = getQuestionStatus(question);
            return (
              <button
                key={question.id}
                onClick={() => {
                  onNavigate(index);
                  if (onClose) onClose();
                }}
                className={`aspect-square flex flex-col items-center justify-center gap-1 rounded-lg border-2 transition-all ${getStatusColor(index, status)}`}
              >
                <span className="text-xs font-semibold">{index + 1}</span>
                {getStatusIcon(status)}
              </button>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="p-4 border-t dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
        <div className="flex flex-wrap gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-primary-600 text-white rounded flex items-center justify-center">
              <Check className="w-3 h-3" />
            </div>
            <span className="text-gray-600 dark:text-gray-400">Current</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-green-50 text-green-700 border-2 border-green-300 rounded flex items-center justify-center">
              <Check className="w-3 h-3" />
            </div>
            <span className="text-gray-600 dark:text-gray-400">Answered</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gray-50 text-gray-600 border-2 border-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 rounded flex items-center justify-center">
              <Circle className="w-3 h-3" />
            </div>
            <span className="text-gray-600 dark:text-gray-400">
              Not Answered
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  // Mobile: Overlay drawer
  if (onClose) {
    return (
      <>
        {/* Backdrop */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={onClose}
          />
        )}

        {/* Drawer */}
        <div
          className={`fixed inset-y-0 right-0 w-80 bg-white dark:bg-gray-800 shadow-xl z-50 transform transition-transform md:hidden ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {content}
        </div>
      </>
    );
  }

  // Desktop: Static panel
  return (
    <div className="hidden md:block bg-white dark:bg-gray-800 rounded-lg shadow-sm h-full">
      {content}
    </div>
  );
};

export default QuestionGrid;
