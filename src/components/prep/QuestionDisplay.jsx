import { useState } from "react";
import { Flag } from "lucide-react";
import Button from "../common/Button";

/**
 * QuestionDisplay Component
 * Displays a single MCQ with 4 options
 *
 * @param {object} question - Question object with question_text, option_a/b/c/d
 * @param {string} selectedAnswer - Currently selected answer (a/b/c/d)
 * @param {function} onAnswerSelect - Callback when answer is selected
 * @param {number} questionNumber - Display number for the question
 * @param {function} onReport - Optional callback to report question
 */
const QuestionDisplay = ({
  question,
  selectedAnswer,
  onAnswerSelect,
  questionNumber,
  onReport,
}) => {
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [reportReason, setReportReason] = useState("");

  const options = [
    { key: "a", text: question?.option_a },
    { key: "b", text: question?.option_b },
    { key: "c", text: question?.option_c },
    { key: "d", text: question?.option_d },
  ];

  const handleReport = () => {
    if (onReport && reportReason.trim()) {
      onReport(question.id, reportReason);
      setShowReportDialog(false);
      setReportReason("");
    }
  };

  if (!question) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <p className="text-gray-500">Loading question...</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 space-y-6">
      {/* Question Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-semibold text-primary-600 dark:text-primary-400">
              Question {questionNumber}
            </span>
            {question.subject && (
              <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-gray-600 dark:text-gray-300">
                {question.subject}
              </span>
            )}
            {question.difficulty && (
              <span
                className={`text-xs px-2 py-1 rounded ${
                  question.difficulty === "easy"
                    ? "bg-green-100 text-green-700"
                    : question.difficulty === "medium"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                }`}
              >
                {question.difficulty}
              </span>
            )}
          </div>
          <p className="text-lg text-gray-900 dark:text-white leading-relaxed">
            {question.question_text}
          </p>
        </div>

        {/* Report Button */}
        {onReport && (
          <button
            onClick={() => setShowReportDialog(true)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            title="Report issue with this question"
          >
            <Flag className="w-4 h-4 text-gray-400" />
          </button>
        )}
      </div>

      {/* Options */}
      <div className="space-y-3">
        {options.map((option) => (
          <label
            key={option.key}
            className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
              selectedAnswer === option.key
                ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20"
                : "border-gray-200 dark:border-gray-700 hover:border-primary-300 hover:bg-gray-50 dark:hover:bg-gray-700/50"
            }`}
          >
            <input
              type="radio"
              name={`question-${question.id}`}
              value={option.key}
              checked={selectedAnswer === option.key}
              onChange={() => onAnswerSelect(option.key)}
              className="mt-1 w-4 h-4 text-primary-600 focus:ring-primary-500"
            />
            <div className="flex-1">
              <span className="font-semibold text-gray-700 dark:text-gray-300 mr-2">
                {option.key.toUpperCase()}.
              </span>
              <span className="text-gray-900 dark:text-white">
                {option.text}
              </span>
            </div>
          </label>
        ))}
      </div>

      {/* Report Dialog */}
      {showReportDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Report Question Issue
            </h3>
            <textarea
              value={reportReason}
              onChange={(e) => setReportReason(e.target.value)}
              placeholder="Describe the issue (wrong answer, typo, unclear question, etc.)"
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg mb-4 min-h-24 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <div className="flex gap-2 justify-end">
              <Button
                variant="secondary"
                onClick={() => {
                  setShowReportDialog(false);
                  setReportReason("");
                }}
              >
                Cancel
              </Button>
              <Button onClick={handleReport} disabled={!reportReason.trim()}>
                Submit Report
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionDisplay;
