import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  Home,
  ChevronLeft,
  ChevronRight,
  MessageSquareWarning,
  Loader2,
  AlertCircle,
  Layers3,
} from "lucide-react";
import { getTestResults, getUserAttempts } from "../../api/tests";
import Button from "../../components/common/Button";
import StatsCard from "../../components/prep/StatsCard";

const unwrapPayload = (payload) => {
  let current = payload;

  for (let index = 0; index < 3; index += 1) {
    if (
      current &&
      typeof current === "object" &&
      !Array.isArray(current) &&
      current.data &&
      typeof current.data === "object"
    ) {
      current = current.data;
    } else {
      break;
    }
  }

  return current || {};
};

const extractFirstArray = (payload, paths = []) => {
  const root = unwrapPayload(payload);

  for (const path of paths) {
    const value = path.split(".").reduce((currentValue, key) => {
      if (currentValue === undefined || currentValue === null) {
        return undefined;
      }

      return currentValue[key];
    }, root);

    if (Array.isArray(value)) {
      return value;
    }
  }

  return [];
};

const getTextValue = (value) => {
  if (value === undefined || value === null) {
    return "";
  }

  if (typeof value === "string") {
    return value.trim();
  }

  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }

  return "";
};

const getQuestionSource = (question) => {
  if (
    question &&
    typeof question.question === "object" &&
    !Array.isArray(question.question)
  ) {
    return question.question;
  }

  return question || {};
};

const TestResults = () => {
  const { attemptId } = useParams();
  const navigate = useNavigate();
  const [currentWrongIndex, setCurrentWrongIndex] = useState(0);

  const { data: recentAttempts, isLoading: attemptsLoading } = useQuery({
    queryKey: ["recent-attempts-for-results"],
    queryFn: () => getUserAttempts(1, 0),
    enabled: !attemptId,
  });

  const resolvedAttemptId = attemptId || recentAttempts?.[0]?.id || null;

  const {
    data: results,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["test-results", resolvedAttemptId],
    queryFn: () => getTestResults(resolvedAttemptId),
    enabled: Boolean(resolvedAttemptId),
  });

  const normalizedResults = useMemo(() => unwrapPayload(results), [results]);
  const attempt =
    normalizedResults?.attempt || normalizedResults?.attempt_data || {};

  const reviewedQuestions = useMemo(() => {
    const questionResults = extractFirstArray(normalizedResults, [
      "results",
      "questions",
      "question_results",
      "items",
      "attempt.results",
      "attempt.questions",
      "attempt.question_results",
      "attempt.items",
      "attempt_data.results",
      "attempt_data.questions",
      "attempt_data.question_results",
      "attempt_data.items",
    ]);

    const getNestedValue = (question, paths) => {
      for (const path of paths) {
        const value = path.split(".").reduce((currentValue, key) => {
          if (currentValue === undefined || currentValue === null) {
            return undefined;
          }

          return currentValue[key];
        }, question);

        if (value !== undefined && value !== null && `${value}`.trim() !== "") {
          return value;
        }
      }

      return "";
    };

    const normalizeAnswer = (question, keys) => {
      for (const key of keys) {
        const value = getNestedValue(question, [key]);
        if (value !== undefined && value !== null && `${value}`.trim() !== "") {
          return `${value}`.trim().toLowerCase();
        }
      }

      return "";
    };

    return questionResults
      .map((question, index) => {
        if (!question || typeof question !== "object") {
          return null;
        }

        const userAnswer = normalizeAnswer(question, [
          "user_answer",
          "selected_answer",
          "selected_option",
          "answer",
          "userChoice",
        ]);
        const correctAnswer = normalizeAnswer(question, [
          "correct_answer",
          "correct_option",
          "answer_key",
          "correctChoice",
        ]);

        const isCorrect =
          userAnswer.length > 0 &&
          correctAnswer.length > 0 &&
          userAnswer === correctAnswer;

        return {
          ...question,
          questionNumber: index + 1,
          userAnswer,
          correctAnswer,
          isCorrect,
        };
      })
      .filter(Boolean);
  }, [normalizedResults]);

  const totalReviewedQuestions = reviewedQuestions.length;
  const wrongAnsweredCount = reviewedQuestions.filter(
    (question) => !question.isCorrect,
  ).length;

  if (isLoading || attemptsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary-600 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading results...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Failed to Load Results
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {error.message || "Something went wrong"}
          </p>
          <Button onClick={() => navigate("/prep")}>Back to Tests</Button>
        </div>
      </div>
    );
  }

  const testTitle = attempt?.tests?.title || "Test";
  const totalQuestions = attempt?.total_questions || 0;
  const correctCount = attempt?.score || 0;
  const accuracy = attempt?.accuracy || 0;
  const timeTakenSeconds = attempt?.time_taken_seconds || 0;
  const timeTakenMinutes = Math.round(timeTakenSeconds / 60);
  const wrongCount =
    wrongAnsweredCount || Math.max(0, totalQuestions - correctCount);

  if (!resolvedAttemptId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-lg mx-auto px-4 text-center">
          <AlertCircle className="w-16 h-16 text-amber-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
            No attempt selected
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Open a test result from your progress history, or take a test first
            so there is a result to review.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/prep/progress">
              <Button variant="secondary">Go to Progress</Button>
            </Link>
            <Link to="/prep">
              <Button>Browse Tests</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!isLoading && !error && reviewedQuestions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 text-center">
            <AlertCircle className="w-16 h-16 text-amber-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              No review data returned
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              The results endpoint responded, but it did not include any
              question review data for this attempt.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                variant="secondary"
                onClick={() => navigate("/prep/progress")}
              >
                View Progress
              </Button>
              <Button onClick={() => navigate("/prep")}>Back to Tests</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const getQuestionText = (question) => {
    const source = getQuestionSource(question);
    const value =
      getTextValue(source.question_text) ||
      getTextValue(source.stem) ||
      getTextValue(source.prompt) ||
      getTextValue(source.text);

    return value || "Question text unavailable from the backend response.";
  };

  const getOptionValue = (question, option) => {
    const source = getQuestionSource(question);
    return (
      getTextValue(source[`option_${option}`]) ||
      getTextValue(source[`${option}_option`]) ||
      getTextValue(source[`choice_${option}`]) ||
      getTextValue(source[`answer_${option}`])
    );
  };

  const goToNextWrongQuestion = () => {
    if (currentWrongIndex < reviewedQuestions.length - 1) {
      setCurrentWrongIndex((prev) => prev + 1);
    }
  };

  const goToPreviousWrongQuestion = () => {
    if (currentWrongIndex > 0) {
      setCurrentWrongIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Test Results
          </h1>
          <p className="text-gray-600 dark:text-gray-400">{testTitle}</p>
        </div>

        {/* Score Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8 text-center">
          <div className="mb-6">
            <div
              className={`inline-flex items-center justify-center w-32 h-32 rounded-full text-4xl font-bold ${
                accuracy >= 80
                  ? "bg-primary-100 text-primary-600"
                  : accuracy >= 60
                    ? "bg-yellow-100 text-yellow-600"
                    : "bg-red-100 text-red-600"
              }`}
            >
              {accuracy.toFixed(1)}%
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {accuracy >= 80
              ? "Excellent Work! 🎉"
              : accuracy >= 60
                ? "Good Effort! 👍"
                : "Keep Practicing! 💪"}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            You scored {correctCount} out of {totalQuestions} questions
            correctly
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatsCard
            title="Correct Answers"
            value={correctCount}
            subtitle={`${((correctCount / totalQuestions) * 100).toFixed(1)}%`}
            icon={CheckCircle}
            color="primary"
          />
          <StatsCard
            title="Wrong Answers"
            value={wrongCount}
            subtitle={`${((wrongCount / totalQuestions) * 100).toFixed(1)}%`}
            icon={XCircle}
            color="red"
          />
          {timeTakenMinutes && (
            <StatsCard
              title="Time Taken"
              value={`${timeTakenMinutes} min`}
              icon={Clock}
              color="blue"
            />
          )}
        </div>

        {/* Question Review */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Question Review
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Review each question one by one, with the correct answer
                highlighted in green.
              </p>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-gray-100 dark:bg-gray-700 text-sm text-gray-700 dark:text-gray-300">
              <Layers3 className="w-4 h-4" />
              {totalReviewedQuestions} question
              {totalReviewedQuestions === 1 ? "" : "s"}
            </div>
          </div>

          {totalReviewedQuestions > 0 ? (
            <div className="space-y-5">
              <div className="flex items-center justify-between gap-3">
                <Button
                  variant="secondary"
                  onClick={goToPreviousWrongQuestion}
                  disabled={currentWrongIndex === 0}
                  className="min-w-0"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </Button>

                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <MessageSquareWarning className="w-4 h-4 text-red-500" />
                  <span>
                    {currentWrongIndex + 1} / {totalReviewedQuestions}
                  </span>
                </div>

                <Button
                  variant="secondary"
                  onClick={goToNextWrongQuestion}
                  disabled={currentWrongIndex === totalReviewedQuestions - 1}
                  className="min-w-0"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>

              <div className="relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/40">
                <div
                  className="flex transition-transform duration-300 ease-out"
                  style={{
                    transform: `translateX(-${currentWrongIndex * 100}%)`,
                  }}
                >
                  {reviewedQuestions.map((q, index) => {
                    const userAnswerLabel = q.userAnswer
                      ? q.userAnswer.toUpperCase()
                      : "-";
                    const correctAnswerLabel = q.correctAnswer
                      ? q.correctAnswer.toUpperCase()
                      : "-";

                    return (
                      <div
                        key={q.question_id || `${q.question_text}-${index}`}
                        className="w-full shrink-0 p-5 sm:p-6 md:p-8"
                      >
                        <div className="flex items-start justify-between gap-4 mb-4">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-gray-900 dark:text-white">
                              Q{q.questionNumber}.
                            </span>
                            {q.isCorrect ? (
                              <CheckCircle className="w-5 h-5 text-green-600" />
                            ) : (
                              <XCircle className="w-5 h-5 text-red-600" />
                            )}
                          </div>
                          {q.subject && (
                            <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-gray-600 dark:text-gray-300">
                              {q.subject}
                            </span>
                          )}
                        </div>

                        <p className="text-gray-900 dark:text-white mb-5 text-lg leading-relaxed">
                          {getQuestionText(q)}
                        </p>

                        <div className="space-y-3 mb-5">
                          {["a", "b", "c", "d"].map((option) => {
                            const optionText = getOptionValue(q, option);
                            const isCorrectAnswer = q.correctAnswer === option;
                            const isUserAnswer = q.userAnswer === option;

                            return (
                              <div
                                key={option}
                                className={`p-4 rounded-xl border-2 transition-all ${
                                  isCorrectAnswer
                                    ? "bg-green-50 dark:bg-green-900/20 border-green-500"
                                    : isUserAnswer
                                      ? "bg-red-50 dark:bg-red-900/20 border-red-500"
                                      : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                                }`}
                              >
                                <div className="flex items-center gap-3">
                                  <span
                                    className={`font-semibold ${isCorrectAnswer ? "text-green-700 dark:text-green-300" : isUserAnswer ? "text-red-700 dark:text-red-300" : "text-gray-700 dark:text-gray-300"}`}
                                  >
                                    {option.toUpperCase()}.
                                  </span>
                                  <span
                                    className={`flex-1 ${isCorrectAnswer ? "text-green-900 dark:text-green-100 font-medium" : isUserAnswer ? "text-red-900 dark:text-red-100" : "text-gray-900 dark:text-white"}`}
                                  >
                                    {optionText || "-"}
                                  </span>
                                  {isCorrectAnswer && (
                                    <span className="inline-flex items-center gap-1 text-green-700 dark:text-green-300 text-sm font-semibold">
                                      <CheckCircle className="w-4 h-4" />
                                      Correct
                                    </span>
                                  )}
                                  {isUserAnswer && !isCorrectAnswer && (
                                    <span className="inline-flex items-center gap-1 text-red-700 dark:text-red-300 text-sm font-semibold">
                                      <XCircle className="w-4 h-4" />
                                      Your answer
                                    </span>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        <div className="grid md:grid-cols-3 gap-3 mb-5">
                          <div className="rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4">
                            <p className="text-xs font-semibold text-red-700 dark:text-red-300 uppercase tracking-wide mb-1">
                              Your Answer
                            </p>
                            <p className="text-base font-bold text-red-900 dark:text-red-100">
                              {userAnswerLabel}
                            </p>
                          </div>
                          <div className="rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-4">
                            <p className="text-xs font-semibold text-green-700 dark:text-green-300 uppercase tracking-wide mb-1">
                              Correct Answer
                            </p>
                            <p className="text-base font-bold text-green-900 dark:text-green-100">
                              {correctAnswerLabel}
                            </p>
                          </div>
                          <div className="rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-4">
                            <p className="text-xs font-semibold text-blue-700 dark:text-blue-300 uppercase tracking-wide mb-1">
                              Review Status
                            </p>
                            <p className="text-base font-bold text-blue-900 dark:text-blue-100">
                              {q.isCorrect ? "Correct" : "Needs review"}
                            </p>
                          </div>
                        </div>

                        {q.explanation && (
                          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-200 dark:border-blue-800">
                            <p className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-1">
                              Explanation:
                            </p>
                            <p className="text-sm text-blue-800 dark:text-blue-200 leading-relaxed">
                              {q.explanation}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 rounded-2xl bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800">
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                No wrong answers to review
              </h4>
              <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
                Great work. Every question in this attempt was answered
                correctly, so there’s no wrong-answer carousel to show.
              </p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/prep">
            <Button variant="secondary" className="w-full sm:w-auto">
              <Home className="w-4 h-4 mr-2" />
              Back to Tests
            </Button>
          </Link>
          <Link to="/prep/progress">
            <Button variant="secondary" className="w-full sm:w-auto">
              <TrendingUp className="w-4 h-4 mr-2" />
              View Progress
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TestResults;
