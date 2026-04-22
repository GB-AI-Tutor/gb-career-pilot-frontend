// import { useQuery } from "@tanstack/react-query";
// import { Link } from "react-router-dom";
// import {
//   TrendingUp,
//   FileText,
//   CheckCircle,
//   Clock,
//   Calendar,
//   Loader2,
//   AlertCircle,
//   BookOpen,
// } from "lucide-react";
// import { getUserStats, getUserAttempts } from "../../api/tests";
// import StatsCard from "../../components/prep/StatsCard";
// import Button from "../../components/common/Button";

// const ProgressPage = () => {
//   const {
//     data: stats,
//     isLoading: statsLoading,
//     error: statsError,
//   } = useQuery({
//     queryKey: ["user-stats"],
//     queryFn: getUserStats,
//   });

//   const {
//     data: attempts,
//     isLoading: attemptsLoading,
//     error: attemptsError,
//   } = useQuery({
//     queryKey: ["user-attempts"],
//     queryFn: () => getUserAttempts(20, 0),
//   });

//   if (statsLoading || attemptsLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
//         <div className="text-center">
//           <Loader2 className="w-12 h-12 animate-spin text-primary-600 mx-auto mb-4" />
//           <p className="text-gray-600 dark:text-gray-400">
//             Loading progress...
//           </p>
//         </div>
//       </div>
//     );
//   }

//   if (statsError || attemptsError) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
//         <div className="text-center">
//           <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
//           <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
//             Failed to Load Progress
//           </h2>
//           <p className="text-gray-600 dark:text-gray-400 mb-6">
//             Please try again later
//           </p>
//           <Link to="/prep">
//             <Button>Back to Tests</Button>
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   const hasAttempts = attempts && attempts.length > 0;

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
//             Your Progress
//           </h1>
//           <p className="text-gray-600 dark:text-gray-400">
//             Track your test performance and improvement over time
//           </p>
//         </div>

//         {/* Stats Overview */}
//         {stats && (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//             <StatsCard
//               title="Total"
//               value={stats.total_attempts || 0}
//               subtitle="Tests taken"
//               icon={FileText}
//               color="primary"
//             />
//             <StatsCard
//               title="Questions Answered"
//               value={stats.total_questions_attempted || 0}
//               subtitle={`${stats.total_correct || 0} correct`}
//               icon={BookOpen}
//               color="blue"
//             />
//             <StatsCard
//               title="Overall Accuracy"
//               value={`${(stats.overall_accuracy || 0).toFixed(1)}%`}
//               subtitle="Overall performance"
//               icon={TrendingUp}
//               color="primary"
//             />
//             <StatsCard
//               title="Best Score"
//               value={`${stats.best_score || 0}`}
//               subtitle="Personal best"
//               icon={CheckCircle}
//               color="orange"
//             />
//           </div>
//         )}

//         {/* Attempt History */}
//         <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
//           <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
//             Recent Attempts
//           </h2>

//           {hasAttempts ? (
//             <div className="space-y-4">
//               {attempts.map((attempt) => {
//                 return (
//                   <div
//                     key={attempt.id}
//                     className="border dark:border-gray-700 rounded-lg p-4 hover:border-primary-500 dark:hover:border-primary-500 transition-colors"
//                   >
//                     <div className="flex items-start justify-between gap-4 flex-wrap">
//                       {/* Test Info */}
//                       <div className="flex-1 min-w-0">
//                         <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
//                           {attempt.test_title}
//                         </h3>
//                         <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 flex-wrap">
//                           <div className="flex items-center gap-1">
//                             <Calendar className="w-4 h-4" />
//                             <span>
//                               {new Date(
//                                 attempt.submitted_at,
//                               ).toLocaleDateString("en-US", {
//                                 year: "numeric",
//                                 month: "short",
//                                 day: "numeric",
//                                 hour: "2-digit",
//                                 minute: "2-digit",
//                               })}
//                             </span>
//                           </div>
//                           <div className="flex items-center gap-1">
//                             <FileText className="w-4 h-4" />
//                             <span>
//                               {attempt.score} / {attempt.total_questions}{" "}
//                               correct
//                             </span>
//                           </div>
//                         </div>
//                       </div>

//                       {/* Score */}
//                       <div className="flex items-center gap-4">
//                         <div
//                           className={`flex items-center justify-center w-16 h-16 rounded-lg font-bold text-lg ${
//                             attempt.accuracy >= 80
//                               ? "bg-primary-100 text-primary-600"
//                               : attempt.accuracy >= 60
//                                 ? "bg-yellow-100 text-yellow-600"
//                                 : "bg-red-100 text-red-600"
//                           }`}
//                         >
//                           {attempt.accuracy.toFixed(0)}%
//                         </div>
//                         <div className="flex flex-col sm:flex-row gap-2">
//                           <Link to={`/prep/results/${attempt.id}`}>
//                             <Button variant="secondary" size="sm">
//                               View Details
//                             </Button>
//                           </Link>
//                           <Link to={`/prep/results/${attempt.id}`}>
//                             <Button size="sm">See Results</Button>
//                           </Link>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           ) : (
//             <div className="text-center py-12">
//               <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//               <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
//                 No attempts yet
//               </h3>
//               <p className="text-gray-600 dark:text-gray-400 mb-6">
//                 Take your first test to start tracking your progress
//               </p>
//               <Link to="/prep">
//                 <Button>
//                   <BookOpen className="w-4 h-4 mr-2" />
//                   Browse Tests
//                 </Button>
//               </Link>
//             </div>
//           )}
//         </div>

//         {/* Insights */}
//         {hasAttempts && stats && (
//           <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* Performance Insight */}
//             <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
//               <div className="flex items-start gap-3">
//                 <TrendingUp className="w-6 h-6 text-blue-600 mt-1" />
//                 <div>
//                   <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">
//                     Performance Insight
//                   </h3>
//                   <p className="text-sm text-blue-800 dark:text-blue-200">
//                     {stats.overall_accuracy >= 80
//                       ? "Excellent! You're performing consistently well. Keep up the great work!"
//                       : stats.overall_accuracy >= 60
//                         ? "Good progress! Focus on improving weak areas to reach excellence."
//                         : "Keep practicing! Regular practice will help improve your scores."}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Next Steps */}
//             <div className="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-6">
//               <div className="flex items-start gap-3">
//                 <CheckCircle className="w-6 h-6 text-primary-600 mt-1" />
//                 <div>
//                   <h3 className="font-semibold text-primary-900 dark:text-primary-300 mb-2">
//                     Recommended Next Steps
//                   </h3>
//                   <p className="text-sm text-primary-800 dark:text-primary-200">
//                     {stats.total_attempts < 3
//                       ? "Take more practice tests to identify your strengths and weaknesses."
//                       : "Review incorrect answers and focus on challenging topics."}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProgressPage;
// import { useQuery } from "@tanstack/react-query";
// import { Link } from "react-router-dom";
// import {
//   TrendingUp,
//   FileText,
//   CheckCircle,
//   Clock,
//   Calendar,
//   Loader2,
//   AlertCircle,
//   BookOpen,
// } from "lucide-react";
// import { getUserStats, getUserAttempts } from "../../api/tests";
// import StatsCard from "../../components/prep/StatsCard";
// import Button from "../../components/common/Button";

// const ProgressPage = () => {
//   const {
//     data: stats,
//     isLoading: statsLoading,
//     error: statsError,
//   } = useQuery({
//     queryKey: ["user-stats"],
//     queryFn: getUserStats,
//   });

//   const {
//     data: attempts,
//     isLoading: attemptsLoading,
//     error: attemptsError,
//   } = useQuery({
//     queryKey: ["user-attempts"],
//     queryFn: () => getUserAttempts(20, 0),
//   });

//   if (statsLoading || attemptsLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
//         <div className="text-center">
//           <Loader2 className="w-12 h-12 animate-spin text-primary-600 mx-auto mb-4" />
//           <p className="text-gray-600 dark:text-gray-400">
//             Loading progress...
//           </p>
//         </div>
//       </div>
//     );
//   }

//   if (statsError || attemptsError) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
//         <div className="text-center">
//           <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
//           <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
//             Failed to Load Progress
//           </h2>
//           <p className="text-gray-600 dark:text-gray-400 mb-6">
//             Please try again later
//           </p>
//           <Link to="/prep">
//             <Button>Back to Tests</Button>
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   const hasAttempts = attempts && attempts.length > 0;

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
//             Your Progress
//           </h1>
//           <p className="text-gray-600 dark:text-gray-400">
//             Track your test performance and improvement over time
//           </p>
//         </div>

//         {/* Stats Overview */}
//         {stats && (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//             <StatsCard
//               title="Total"
//               value={stats.total_attempts || 0}
//               subtitle="Tests taken"
//               icon={FileText}
//               color="primary"
//             />
//             <StatsCard
//               title="Questions Answered"
//               value={stats.total_questions_attempted || 0}
//               subtitle={`${stats.total_correct || 0} correct`}
//               icon={BookOpen}
//               color="blue"
//             />
//             <StatsCard
//               title="Overall Accuracy"
//               value={`${(stats.overall_accuracy || 0).toFixed(1)}%`}
//               subtitle="Overall performance"
//               icon={TrendingUp}
//               color="primary"
//             />
//             <StatsCard
//               title="Best Score"
//               value={`${stats.best_score || 0}`}
//               subtitle="Personal best"
//               icon={CheckCircle}
//               color="orange"
//             />
//           </div>
//         )}

//         {/* Attempt History */}
//         <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
//           <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
//             Recent Attempts
//           </h2>

//           {hasAttempts ? (
//             <div className="space-y-4">
//               {attempts.map((attempt) => {
//                 return (
//                   <div
//                     key={attempt.id}
//                     className="border dark:border-gray-700 rounded-lg p-4 hover:border-primary-500 dark:hover:border-primary-500 transition-colors"
//                   >
//                     <div className="flex items-start justify-between gap-4 flex-wrap">
//                       {/* Test Info */}
//                       <div className="flex-1 min-w-0">
//                         <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
//                           {attempt.test_title}
//                         </h3>
//                         <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 flex-wrap">
//                           <div className="flex items-center gap-1">
//                             <Calendar className="w-4 h-4" />
//                             <span>
//                               {new Date(
//                                 attempt.submitted_at,
//                               ).toLocaleDateString("en-US", {
//                                 year: "numeric",
//                                 month: "short",
//                                 day: "numeric",
//                                 hour: "2-digit",
//                                 minute: "2-digit",
//                               })}
//                             </span>
//                           </div>
//                           <div className="flex items-center gap-1">
//                             <FileText className="w-4 h-4" />
//                             <span>
//                               {attempt.score} / {attempt.total_questions}{" "}
//                               correct
//                             </span>
//                           </div>
//                         </div>
//                       </div>

//                       {/* Score */}
//                       <div className="flex items-center gap-4">
//                         <div
//                           className={`flex items-center justify-center w-16 h-16 rounded-lg font-bold text-lg ${
//                             attempt.accuracy >= 80
//                               ? "bg-primary-100 text-primary-600"
//                               : attempt.accuracy >= 60
//                                 ? "bg-yellow-100 text-yellow-600"
//                                 : "bg-red-100 text-red-600"
//                           }`}
//                         >
//                           {attempt.accuracy.toFixed(0)}%
//                         </div>
//                         <div className="flex flex-col sm:flex-row gap-2">
//                           <Link to={`/prep/results/${attempt.id}`}>
//                             <Button variant="secondary" size="sm">
//                               View Details
//                             </Button>
//                           </Link>
//                           <Link to={`/prep/results/${attempt.id}`}>
//                             <Button size="sm">See Results</Button>
//                           </Link>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           ) : (
//             <div className="text-center py-12">
//               <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//               <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
//                 No attempts yet
//               </h3>
//               <p className="text-gray-600 dark:text-gray-400 mb-6">
//                 Take your first test to start tracking your progress
//               </p>
//               <Link to="/prep">
//                 <Button>
//                   <BookOpen className="w-4 h-4 mr-2" />
//                   Browse Tests
//                 </Button>
//               </Link>
//             </div>
//           )}
//         </div>

//         {/* Insights */}
//         {hasAttempts && stats && (
//           <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* Performance Insight */}
//             <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
//               <div className="flex items-start gap-3">
//                 <TrendingUp className="w-6 h-6 text-blue-600 mt-1" />
//                 <div>
//                   <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">
//                     Performance Insight
//                   </h3>
//                   <p className="text-sm text-blue-800 dark:text-blue-200">
//                     {stats.overall_accuracy >= 80
//                       ? "Excellent! You're performing consistently well. Keep up the great work!"
//                       : stats.overall_accuracy >= 60
//                         ? "Good progress! Focus on improving weak areas to reach excellence."
//                         : "Keep practicing! Regular practice will help improve your scores."}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Next Steps */}
//             <div className="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-6">
//               <div className="flex items-start gap-3">
//                 <CheckCircle className="w-6 h-6 text-primary-600 mt-1" />
//                 <div>
//                   <h3 className="font-semibold text-primary-900 dark:text-primary-300 mb-2">
//                     Recommended Next Steps
//                   </h3>
//                   <p className="text-sm text-primary-800 dark:text-primary-200">
//                     {stats.total_attempts < 3
//                       ? "Take more practice tests to identify your strengths and weaknesses."
//                       : "Review incorrect answers and focus on challenging topics."}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProgressPage;
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import {
  TrendingUp,
  FileText,
  CheckCircle,
  Target,
  Target,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { getUserStats, getUserAttempts } from "../../api/tests";
import StatsCard from "../../components/prep/StatsCard";
import Button from "../../components/common/Button";

// Helper to handle FastAPI/Pydantic wrapped responses
const unwrapData = (payload) => {
  return payload?.data || payload || {};
};

const ProgressPageModern = () => {
// Helper to handle FastAPI/Pydantic wrapped responses
const unwrapData = (payload) => {
  return payload?.data || payload || {};
};

const ProgressPageModern = () => {
  const {
    data: rawStats,
    data: rawStats,
    isLoading: statsLoading,
    error: statsError,
  } = useQuery({
    queryKey: ["user-stats"],
    queryFn: getUserStats,
  });

  const {
    data: rawAttempts,
    data: rawAttempts,
    isLoading: attemptsLoading,
    error: attemptsError,
  } = useQuery({
    queryKey: ["user-attempts"],
    queryFn: () => getUserAttempts(20, 0),
  });

  if (statsLoading || attemptsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa]">
        <Loader2 className="w-12 h-12 animate-spin text-[#000a1e]" />
      <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa]">
        <Loader2 className="w-12 h-12 animate-spin text-[#000a1e]" />
      </div>
    );
  }

  if (statsError || attemptsError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa] text-center p-6">
        <div>
      <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa] text-center p-6">
        <div>
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-[#000a1e]">
            Connection Interrupted
          </h2>
          <p className="text-[#000a1e]/60 mb-6">
            We couldn't retrieve your academic record.
          </p>
          <Link to="/prep">
            <Button>Return to Prep Hub</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Safely unwrap data to avoid .map() or .toFixed() crashes
  const stats = unwrapData(rawStats);
  const attemptsData = unwrapData(rawAttempts);
  const attempts = Array.isArray(attemptsData) ? attemptsData : [];
  // Safely unwrap data to avoid .map() or .toFixed() crashes
  const stats = unwrapData(rawStats);
  const attemptsData = unwrapData(rawAttempts);
  const attempts = Array.isArray(attemptsData) ? attemptsData : [];

  return (
    <div className="min-h-screen bg-[#f8f9fa] py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Editorial Header - Design.md Specification */}
        <header className="mb-16 max-w-2xl animate-fade-in">
          <div className="inline-block px-4 py-1 bg-[#006d36]/10 rounded-full mb-4">
            <span className="text-[#006d36] font-black text-[10px] uppercase tracking-widest leading-none">
              Intelligence Navigator
            </span>
          </div>
          <h1 className="text-6xl font-manrope font-black text-[#000a1e] mb-4 tracking-tighter">
            Your Academic{" "}
            <span className="italic text-[#006d36]">Evolution</span>
          </h1>
          <p className="text-xl text-[#000a1e]/50 font-inter leading-relaxed">
            Quantifying your path to excellence through AI-driven analytics.
          <p className="text-xl text-[#000a1e]/50 font-inter leading-relaxed">
            Quantifying your path to excellence through AI-driven analytics.
          </p>
        </header>
        </header>

        {/* Stats Grid - No borders, just tonal shifts */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <StatsCard
            title="Campaigns"
            value={stats?.total_attempts || 0}
            subtitle="Tests Completed"
            icon={FileText}
          />
          <StatsCard
            title="Precision"
            value={`${Number(stats?.overall_accuracy || 0).toFixed(1)}%`}
            subtitle="Target Accuracy"
            icon={Target}
          />
          <StatsCard
            title="Conquered"
            value={stats?.total_correct || 0}
            subtitle="Correct Answers"
            icon={CheckCircle}
          />
          <StatsCard
            title="Zenith"
            value={stats?.best_score || 0}
            subtitle="Personal Record"
            icon={TrendingUp}
          />
        </div>

        {/* Recent Performance List */}
        <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-[0_24px_48px_-12px_rgba(0,10,30,0.04)]">
          <h2 className="text-3xl font-manrope font-black text-[#000a1e] mb-10">
            Recent Attempts:
          </h2>

          {attempts.length > 0 ? (
            <div className="space-y-4">
              {attempts.map((attempt) => (
                <div
                  key={attempt.id}
                  className="group flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 rounded-2xl hover:bg-[#f3f4f5] transition-all duration-300 border border-[#c4c6cf]/10"
                >
                  <div className="flex items-center gap-6 mb-4 sm:mb-0">
                    <div
                      className={`w-14 h-14 rounded-xl flex items-center justify-center font-black text-sm shadow-sm ${
                        (attempt.accuracy || 0) >= 80
                          ? "bg-[#83fba5] text-[#00743a]"
                          : "bg-[#f3f4f5] text-[#000a1e]"
                      }`}
                    >
                      {(attempt.accuracy || 0).toFixed(0)}%
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#000a1e] group-hover:text-[#006d36] transition-colors">
                        {attempt.test_title || "Untitled Test"}
                      </h3>
                      <p className="text-[10px] text-[#000a1e]/40 font-black uppercase tracking-widest mt-1">
                        {attempt.submitted_at
                          ? new Date(attempt.submitted_at).toLocaleDateString()
                          : "Recent"}{" "}
                        • {attempt.score}/{attempt.total_questions} Units
                      </p>
                    </div>
                  </div>
                  <Link
                    to={`/prep/results/${attempt.id}`}
                    className="w-full sm:w-auto"
                  >
                    <button className="w-full sm:w-auto px-8 py-2.5 rounded-full border border-[#000a1e]/10 text-xs font-bold hover:bg-[#000a1e] hover:text-white transition-all uppercase tracking-widest">
                      Review Matrix
                    </button>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-[#f8f9fa] rounded-3xl">
              <p className="text-[#000a1e]/40 font-bold uppercase tracking-widest">
                No data points recorded yet
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgressPageModern;
