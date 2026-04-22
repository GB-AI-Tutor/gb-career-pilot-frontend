import { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  ChevronLeft,
  ChevronRight,
  Grid3x3,
  Send,
  AlertCircle,
  Loader2,
  Save,
} from "lucide-react";
import { startTest, saveAnswers, submitTest } from "../../api/tests";
import TestTimer from "../../components/prep/TestTimer";
import QuestionDisplay from "../../components/prep/QuestionDisplay";
import QuestionGrid from "../../components/prep/QuestionGrid";
import Button from "../../components/common/Button";
import { reportQuestion } from "../../api/tests";

const TestTaking = () => {
  const { testId } = useParams();
  const navigate = useNavigate();

  // State
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  // const [showQuestionGrid, setShowQuestionGrid] = useState(false);
  const [attemptId, setAttemptId] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [timerDeadline, setTimerDeadline] = useState(null);
  const [testTitle, setTestTitle] = useState("");
  const [testData, setTestData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const autosaveInterval = useRef(null);
  const lastSavedAnswers = useRef({});

  // Start test mutation
  const startTestMutation = useMutation({
    mutationFn: () => startTest(testId),
    onSuccess: (data) => {
      setAttemptId(data.attempt_id);
      setQuestions(data.questions);
      setTimerDeadline(data.timer_deadline_ms);
      setTestData(data.test);
      setTestTitle(data.test?.title || "Test");
      toast.success("Test started! Good luck!");
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.detail ||
          "Failed to start test. Please try again.",
      );
      navigate("/prep");
    },
  });

  // Autosave mutation
  const autosaveMutation = useMutation({
    mutationFn: (data) => saveAnswers(data.attemptId, data.answers),
    onSuccess: () => {
      lastSavedAnswers.current = { ...answers };
    },
    onError: (error) => {
      console.error("Autosave failed:", error);
      // Don't show error toast for autosave failures (silent fail)
    },
  });

  // Submit test mutation
  const submitTestMutation = useMutation({
    mutationFn: (data) =>
      submitTest(data.attemptId, data.answers, data.timeTakenSeconds),
    onSuccess: () => {
      toast.success("Test submitted successfully!");
      // Navigate to results page with attempt ID
      navigate(`/prep/results/${attemptId}`, { replace: true });
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.detail ||
          "Failed to submit test. Please try again.",
      );
      setIsSubmitting(false);
    },
  });

  // Start test on mount
  useEffect(() => {
    startTestMutation.mutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Setup autosave (every 30 seconds)
  useEffect(() => {
    if (!attemptId) return;

    autosaveInterval.current = setInterval(() => {
      const hasChanges =
        JSON.stringify(answers) !== JSON.stringify(lastSavedAnswers.current);

      if (hasChanges && Object.keys(answers).length > 0) {
        autosaveMutation.mutate({ attemptId, answers });
      }
    }, 30000); // 30 seconds

    return () => {
      if (autosaveInterval.current) {
        clearInterval(autosaveInterval.current);
      }
    };
  }, [attemptId, answers, autosaveMutation]);

  // Handle answer selection
  const handleAnswerSelect = useCallback(
    (answer) => {
      const currentQuestion = questions[currentQuestionIndex];
      if (!currentQuestion) return; // Guard clause
      setAnswers((prev) => ({
        ...prev,
        [currentQuestion.id]: answer,
      }));
    },
    [questions, currentQuestionIndex],
  );

  const goToNextQuestion = useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  }, [currentQuestionIndex, questions.length]);

  const goToPreviousQuestion = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  }, [currentQuestionIndex]);

  const goToQuestion = useCallback(
    (index) => {
      setCurrentQuestionIndex(index);
    },
    [setCurrentQuestionIndex],
  );

  // Submit test
  const handleSubmit = useCallback(() => {
    const unansweredCount = questions.length - Object.keys(answers).length;

    if (unansweredCount > 0) {
      const confirmSubmit = window.confirm(
        `You have ${unansweredCount} unanswered question(s). Are you sure you want to submit?`,
      );

      if (!confirmSubmit) {
        return;
      }
    }

    setIsSubmitting(true);

    // Calculate time taken in seconds
    const currentTime = Date.now();
    const timeRemaining = Math.max(0, timerDeadline - currentTime);
    const testDurationMs = testData?.duration_minutes
      ? testData.duration_minutes * 60 * 1000
      : 0;
    const timeTakenMs = testDurationMs - timeRemaining;
    const timeTakenSeconds = Math.round(timeTakenMs / 1000);

    // Final save before submit
    if (Object.keys(answers).length > 0) {
      autosaveMutation.mutate(
        { attemptId, answers },
        {
          onSettled: () => {
            // Submit regardless of autosave success
            submitTestMutation.mutate({
              attemptId,
              answers,
              timeTakenSeconds,
            });
          },
        },
      );
    } else {
      submitTestMutation.mutate({
        attemptId,
        answers,
        timeTakenSeconds,
      });
    }
  }, [
    attemptId,
    answers,
    questions.length,
    autosaveMutation,
    submitTestMutation,
    timerDeadline,
    testData,
  ]);

  // Auto-submit when timer expires
  const handleTimerExpire = useCallback(() => {
    toast.error("Time's up! Submitting your test...");
    handleSubmit();
  }, [handleSubmit]);

  // Report question
  const handleReportQuestion = (questionId, reason) => {
    reportQuestion(questionId, reason)
      .then(() => {
        toast.success("Question reported. Thank you for your feedback!");
      })
      .catch(() => {
        toast.error("Failed to report question. Please try again.");
      });
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.ctrlKey || e.metaKey) return;

      if (e.key === "ArrowLeft") {
        goToPreviousQuestion();
      } else if (e.key === "ArrowRight") {
        goToNextQuestion();
      } else if (e.key >= "1" && e.key <= "4") {
        const optionKeys = ["a", "b", "c", "d"];
        handleAnswerSelect(optionKeys[parseInt(e.key) - 1]);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [goToPreviousQuestion, goToNextQuestion, handleAnswerSelect]); // Updated dependencies

  // Prevent accidental page close
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (!isSubmitting) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isSubmitting]);

  // Loading state
  if (startTestMutation.isPending || !attemptId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary-600 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">
            Loading your test...
          </p>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  // const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  // const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

 return (
    <div className="min-h-screen bg-[#f8f9fa] pb-24">
      {/* Editorial Header */}
      <div className="bg-white border-b border-[#c4c6cf]/15 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-manrope font-black text-[#000a1e] tracking-tight">
              {testTitle}
            </h1>
            <div className="flex items-center gap-3 mt-1">
              <div className="h-1.5 w-32 bg-[#f3f4f5] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#002147] to-[#000a1e] transition-all duration-500" 
                  style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                />
              </div>
              <span className="text-xs font-bold text-[#000a1e]/40 uppercase tracking-widest">
                Progress: {Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}%
              </span>
            </div>
          </div>
          <TestTimer deadlineMs={timerDeadline} onExpire={handleTimerExpire} />
          <TestTimer deadlineMs={timerDeadline} onExpire={handleTimerExpire} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-8">
          <QuestionDisplay
            question={currentQuestion}
            selectedAnswer={answers[currentQuestion?.id]}
            onAnswerSelect={handleAnswerSelect}
            questionNumber={currentQuestionIndex + 1}
            onReport={handleReportQuestion}
          />
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-8">
          <QuestionDisplay
            question={currentQuestion}
            selectedAnswer={answers[currentQuestion?.id]}
            onAnswerSelect={handleAnswerSelect}
            questionNumber={currentQuestionIndex + 1}
            onReport={handleReportQuestion}
          />

          <div className="flex justify-between items-center bg-[#f3f4f5] p-4 rounded-2xl">
            <button 
              onClick={goToPreviousQuestion} 
              disabled={currentQuestionIndex === 0}
              className="flex items-center gap-2 font-bold text-[#000a1e] px-6 py-3 disabled:opacity-20"
            >
              <ChevronLeft className="w-5 h-5" /> Previous
            </button>
            <button 
              onClick={handleSubmit} 
              className="px-8 py-3 bg-gradient-to-br from-[#002147] to-[#000a1e] text-white rounded-xl font-bold shadow-lg hover:scale-105 transition-transform"
            >
              Submit Examination
            </button>
            <button 
              onClick={goToNextQuestion} 
              disabled={currentQuestionIndex === questions.length - 1}
              className="flex items-center gap-2 font-bold text-[#000a1e] px-6 py-3 disabled:opacity-20"
            >
              Next <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="lg:col-span-4">
          <QuestionGrid
            questions={questions}
            answers={answers}
            currentIndex={currentQuestionIndex}
            onNavigate={goToQuestion}
          />
        </div>
      </div>
        <div className="lg:col-span-4">
          <QuestionGrid
            questions={questions}
            answers={answers}
            currentIndex={currentQuestionIndex}
            onNavigate={goToQuestion}
          />
        </div>
      </div>
    </div>
  );

};

export default TestTaking;
