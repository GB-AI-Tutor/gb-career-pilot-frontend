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
  const [showQuestionGrid, setShowQuestionGrid] = useState(false);
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
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20 md:pb-4">
      {/* Header - Sticky */}
      <div className="sticky top-16 z-30 bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            {/* Test Title */}
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                {testTitle}
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Question {currentQuestionIndex + 1} of {questions.length}
              </p>
            </div>

            {/* Timer & Actions */}
            <div className="flex items-center gap-3">
              <TestTimer
                deadlineMs={timerDeadline}
                onExpire={handleTimerExpire}
              />

              <button
                onClick={() => setShowQuestionGrid(true)}
                className="md:hidden p-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                <Grid3x3 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-primary-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Question Display - Main Column */}
          <div className="lg:col-span-2 space-y-4">
            <QuestionDisplay
              question={currentQuestion}
              selectedAnswer={answers[currentQuestion?.id]}
              onAnswerSelect={handleAnswerSelect}
              questionNumber={currentQuestionIndex + 1}
              onReport={handleReportQuestion}
            />

            {/* Navigation Buttons - Desktop */}
            <div className="hidden md:flex items-center justify-between">
              <Button
                variant="secondary"
                onClick={goToPreviousQuestion}
                disabled={currentQuestionIndex === 0}
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Previous
              </Button>

              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  onClick={() =>
                    autosaveMutation.mutate({ attemptId, answers })
                  }
                >
                  <Save className="w-4 h-4 mr-1" />
                  Save Progress
                </Button>

                <Button onClick={handleSubmit} disabled={isSubmitting}>
                  {isSubmitting ? (
                    <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4 mr-1" />
                  )}
                  Submit Test
                </Button>
              </div>

              <Button
                variant="secondary"
                onClick={goToNextQuestion}
                disabled={currentQuestionIndex === questions.length - 1}
              >
                Next
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>

          {/* Question Grid - Sidebar (Desktop) */}
          <div className="hidden lg:block">
            <div className="sticky top-36">
              <QuestionGrid
                questions={questions}
                answers={answers}
                currentIndex={currentQuestionIndex}
                onNavigate={goToQuestion}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t dark:border-gray-700 p-4 md:hidden z-40">
        <div className="flex items-center justify-between gap-2 mb-3">
          <Button
            variant="secondary"
            onClick={goToPreviousQuestion}
            disabled={currentQuestionIndex === 0}
            className="flex-1"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>

          <Button
            variant="secondary"
            onClick={goToNextQuestion}
            disabled={currentQuestionIndex === questions.length - 1}
            className="flex-1"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>

          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex-1"
          >
            {isSubmitting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Question Grid Modal (Mobile) */}
      <QuestionGrid
        questions={questions}
        answers={answers}
        currentIndex={currentQuestionIndex}
        onNavigate={goToQuestion}
        isOpen={showQuestionGrid}
        onClose={() => setShowQuestionGrid(false)}
      />
    </div>
  );
};

export default TestTaking;
