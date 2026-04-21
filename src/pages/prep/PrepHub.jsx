import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Clock,
  FileText,
  Filter,
  Loader2,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";
import { getTests, getUserAttempts, getUserStats } from "../../api/tests";
import "../../styles/design-system.css";

const PrepHub = () => {
  const [examFilter, setExamFilter] = useState(null);

  // Fetch user stats
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["user-stats"],
    queryFn: getUserStats,
  });

  // Fetch tests
  const { data: tests, isLoading: testsLoading } = useQuery({
    queryKey: ["tests", examFilter],
    queryFn: () => getTests(examFilter),
  });

  const { data: attemptsData, isLoading: attemptsLoading } = useQuery({
    queryKey: ["user-attempts"],
    queryFn: () => getUserAttempts(8, 0),
  });

  const examTypes = [
    { value: null, label: "All Tests" },
    { value: "NUST NET", label: "NUST NET" },
    { value: "MDCAT", label: "MDCAT" },
    { value: "ECAT", label: "ECAT" },
    { value: "LUMS", label: "LUMS" },
  ];

  const recentAttempts = useMemo(() => {
    if (!attemptsData) return [];
    if (Array.isArray(attemptsData)) return attemptsData;
    if (Array.isArray(attemptsData.items)) return attemptsData.items;
    if (Array.isArray(attemptsData.results)) return attemptsData.results;
    return [];
  }, [attemptsData]);

  const chartData = recentAttempts.slice(0, 5).map((attempt, index) => {
    const rawScore =
      attempt.score_percentage ??
      attempt.percentage ??
      attempt.score ??
      attempt.accuracy ??
      0;

    const score = Math.max(0, Math.min(100, Number(rawScore) || 0));
    const label =
      attempt.completed_at || attempt.created_at
        ? new Date(
            attempt.completed_at || attempt.created_at,
          ).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })
        : `Try ${index + 1}`;

    return {
      ...attempt,
      score,
      label,
      id: attempt.id || `${label}-${index}`,
      title: attempt.test_title || attempt.title || "Practice Attempt",
    };
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8fbff] via-[#f8f9fa] to-[#eef4fa] py-8 md:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 rounded-2xl p-7 md:p-8 text-white bg-gradient-to-br from-[#002147] to-[#000a1e] shadow-[0_10px_30px_rgba(0,10,30,0.2)] relative overflow-hidden">
            <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-white/10 blur-2xl" />
            <div className="space-y-2 relative z-10">
              <h1 className="text-heading-lg md:text-display-md tracking-tight text-white">
                Test Prep Hub
              </h1>
              <p className="text-sm md:text-base text-blue-100 max-w-xl">
                Practice smarter with focused mocks, track your progress, and
                improve weak areas before the final exam.
              </p>
            </div>
            <div className="mt-7 md:mt-8 flex items-end gap-8">
              <div>
                <p className="text-[11px] uppercase tracking-[0.15em] text-blue-200 font-semibold">
                  Average Score
                </p>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-5xl font-black leading-none">
                    {Number(stats?.overall_accuracy || 0).toFixed(0)}
                  </span>
                  <span className="text-2xl text-emerald-300">%</span>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 rounded-md bg-emerald-300 px-2.5 py-1 text-xs font-bold text-emerald-900">
                <TrendingUp className="w-3.5 h-3.5" />
                Keep climbing
              </span>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm flex flex-col justify-center items-center text-center">
            <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center mb-4 text-[#002147]">
              <Target className="w-7 h-7" />
            </div>
            <h3 className="text-heading-sm text-[#002147] font-bold">
              {statsLoading ? "..." : stats?.total_attempts || 0}
            </h3>
            <p className="text-sm text-slate-600 mt-1">Tests Completed</p>
            <div className="mt-4 h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
              <div
                className="h-full rounded-full bg-emerald-500"
                style={{
                  width: `${Math.min(100, ((stats?.total_attempts || 0) / 20) * 100)}%`,
                }}
              />
            </div>
          </div>
        </section>

        <section>
          <div className="mb-5 flex items-center justify-between gap-4 flex-wrap">
            <h2 className="text-heading-md text-[#002147] font-bold tracking-tight">
              Available Practice Tests
            </h2>
            <Link
              to="/prep/progress"
              className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-700 hover:underline"
            >
              View Progress
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="mb-6 flex items-center gap-3 flex-wrap">
            <div className="inline-flex items-center gap-2 text-sm text-slate-600 font-medium">
              <Filter className="w-4 h-4" />
              Filter by exam:
            </div>
            {examTypes.map((type) => (
              <button
                key={type.value || "all"}
                onClick={() => setExamFilter(type.value)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  examFilter === type.value
                    ? "bg-[#002147] text-white shadow"
                    : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>

          {testsLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-[#002147]" />
            </div>
          ) : tests && tests.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tests.map((test) => (
                <div
                  key={test.id}
                  className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm transition-transform duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-xl bg-slate-100 text-[#002147] flex items-center justify-center shrink-0">
                        <BookOpen className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">
                          {test.title}
                        </h3>
                        {test.description && (
                          <p className="text-sm text-slate-600 mt-1 line-clamp-2">
                            {test.description}
                          </p>
                        )}
                      </div>
                    </div>
                    {test.exam_type && (
                      <span className="px-2 py-1 rounded bg-emerald-50 text-emerald-700 text-xs font-semibold whitespace-nowrap">
                        {test.exam_type}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-4 text-xs text-slate-500 mb-5 flex-wrap">
                    <span className="inline-flex items-center gap-1">
                      <FileText className="w-3.5 h-3.5" />
                      {test.total_questions || 0} MCQs
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {test.duration_minutes || 0} min
                    </span>
                  </div>

                  <Link
                    to={`/prep/test/${test.id}`}
                    className="inline-flex items-center justify-center gap-2 w-full rounded-xl bg-[#002147] text-white py-2.5 px-4 font-semibold hover:bg-[#011631] transition-colors"
                  >
                    <Sparkles className="w-4 h-4" />
                    Start Test
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 rounded-2xl border border-slate-200/70 bg-white">
              <BookOpen className="w-14 h-14 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-slate-900">
                No tests available
              </h3>
              <p className="text-slate-600 mt-1">
                {examFilter
                  ? `No tests found for ${examFilter}. Try another filter.`
                  : "No tests are available right now. Please check back soon."}
              </p>
            </div>
          )}
        </section>

        <section className="rounded-2xl border border-slate-200/70 bg-white p-6 md:p-7 shadow-sm">
          <h2 className="text-heading-sm text-[#002147] font-bold mb-5 tracking-tight">
            Recent Results
          </h2>

          {attemptsLoading ? (
            <div className="flex justify-center py-10">
              <Loader2 className="w-8 h-8 animate-spin text-[#002147]" />
            </div>
          ) : chartData.length > 0 ? (
            <>
              <div className="h-44 w-full flex items-end gap-3 border-b border-slate-200 pb-3">
                {chartData.map((entry, index) => (
                  <div key={entry.id} className="flex-1">
                    <div
                      className={`rounded-t-md transition-all ${
                        index === chartData.length - 1
                          ? "bg-emerald-500 shadow-[0_0_18px_rgba(16,185,129,0.35)]"
                          : "bg-slate-300"
                      }`}
                      style={{ height: `${Math.max(12, entry.score)}%` }}
                      title={`${entry.score.toFixed(0)}%`}
                    />
                  </div>
                ))}
              </div>
              <div className="mt-2 flex justify-between text-xs text-slate-500">
                {chartData.map((entry) => (
                  <span
                    key={`${entry.id}-label`}
                    className="truncate max-w-[72px]"
                  >
                    {entry.label}
                  </span>
                ))}
              </div>

              <div className="mt-7 divide-y divide-slate-200">
                {chartData.map((entry) => (
                  <div
                    key={`${entry.id}-row`}
                    className="py-4 flex items-center justify-between gap-3"
                  >
                    <div>
                      <p className="font-semibold text-slate-900 text-sm">
                        {entry.title}
                      </p>
                      <p className="text-xs text-slate-500">{entry.label}</p>
                    </div>
                    <span className="font-bold text-[#002147]">
                      {entry.score.toFixed(0)}%
                    </span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-sm text-slate-600 py-6">
              No recent test attempts yet. Start a practice test to see your
              results trend.
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default PrepHub;
