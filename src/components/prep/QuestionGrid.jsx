// export default QuestionGrid;
import { X, Check, Circle, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

const QuestionGrid = ({
  questions,
  answers,
  currentIndex,
  onNavigate,
  isOpen = true,
  onClose,
}) => {
  const PAGE_SIZE = 20;
  // Automatically determine which page to show based on the current question index
  const [page, setPage] = useState(Math.floor(currentIndex / PAGE_SIZE));

  useEffect(() => {
    setPage(Math.floor(currentIndex / PAGE_SIZE));
  }, [currentIndex]);

  const totalPages = Math.ceil(questions.length / PAGE_SIZE);
  const startIdx = page * PAGE_SIZE;
  const currentBatch = questions.slice(startIdx, startIdx + PAGE_SIZE);

  const getQuestionStatus = (question) =>
    answers[question.id] ? "answered" : "unanswered";

  const getStatusColor = (index, status) => {
    const isCurrent = startIdx + index === currentIndex;
    if (isCurrent) return "bg-[#000a1e] text-white shadow-lg scale-105"; // Oxford Blue for active
    if (status === "answered") return "bg-[#006d36]/10 text-[#006d36]"; // Tonal Emerald for answered
    return "bg-[#f3f4f5] text-[#000a1e]/50"; // Surface container low
  };

  const content = (
    <div className="h-full flex flex-col bg-[#ffffff] font-inter">
      <div className="p-6 border-b border-[#c4c6cf]/15">
        <h3 className="font-manrope font-bold text-xl text-[#000a1e]">List</h3>
        <p className="text-sm text-[#000a1e]/60">
          Batch {page + 1} of {totalPages}
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-5 gap-3">
          {currentBatch.map((question, index) => {
            const status = getQuestionStatus(question);
            return (
              <button
                key={question.id}
                onClick={() => onNavigate(startIdx + index)}
                className={`aspect-square flex items-center justify-center rounded-xl text-xs font-bold transition-all duration-300 ${getStatusColor(index, status)}`}
              >
                {startIdx + index + 1}
              </button>
            );
          })}
        </div>
      </div>

      {totalPages > 1 && (
        <div className="p-4 flex justify-between gap-2 border-t border-[#c4c6cf]/15">
          <button
            disabled={page === 0}
            onClick={() => setPage((p) => p - 1)}
            className="p-2 rounded-lg hover:bg-[#f3f4f5] disabled:opacity-30"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-xs font-bold flex items-center">
            Questions {startIdx + 1} -{" "}
            {Math.min(startIdx + PAGE_SIZE, questions.length)}
          </span>
          <button
            disabled={page >= totalPages - 1}
            onClick={() => setPage((p) => p + 1)}
            className="p-2 rounded-lg hover:bg-[#f3f4f5] disabled:opacity-30"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div
      className={`${onClose ? (isOpen ? "fixed inset-0 z-50 flex justify-end" : "hidden") : "hidden md:block h-fit sticky top-36"}`}
    >
      {onClose && (
        <div
          className="absolute inset-0 bg-[#000a1e]/20 backdrop-blur-sm"
          onClick={onClose}
        />
      )}
      <div
        className={`relative w-80 shadow-2xl h-full md:h-auto md:rounded-2xl overflow-hidden ${onClose ? "animate-slide-left" : "bg-white"}`}
      >
        {content}
      </div>
    </div>
  );
};

export default QuestionGrid;
