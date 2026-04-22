import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/common/ProtectedRoute";
import Navbar from "./components/layout/Navbar";

// Pages
import LandingPageModern from "./pages/LandingPageModern";
import LoginModern from "./pages/auth/LoginModern";
import RegisterModern from "./pages/auth/RegisterModern";
import VerifyEmail from "./pages/auth/VerifyEmail";
import ForgotPassword from "./pages/auth/ForgotPassword";
import UpdatePassword from "./pages/auth/UpdatePassword";
import DashboardModern from "./pages/dashboard/DashboardModern";
import ChatPageModern from "./pages/chat/ChatPageModern";
import UniversitiesPageModern from "./pages/universities/UniversitiesPageModern";
import ProgramSearchPageModern from "./pages/programs/ProgramSearchPageModern";
import ProfilePageModern from "./pages/profile/ProfilePageModern";
import ReportIssuePageModern from "./pages/ReportIssuePageModern";
import PrepHubModern from "./pages/prep/PrepHubModern";
import TestTakingModern from "./pages/prep/TestTakingModern";
import TestResultsModern from "./pages/prep/TestResultsModern";
import ProgressPageModern from "./pages/prep/ProgressPageModern";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <Navbar />
            <Routes>
              <Route path="/" element={<LandingPageModern />} />
              <Route path="/home" element={<LandingPageModern />} />
              <Route path="/login" element={<LoginModern />} />
              <Route path="/register" element={<RegisterModern />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/update-password" element={<UpdatePassword />} />
              <Route
                path="/update-password/:token"
                element={<UpdatePassword />}
              />
              <Route path="/verify" element={<VerifyEmail />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardModern />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/chat"
                element={
                  <ProtectedRoute>
                    <ChatPageModern />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/universities"
                element={
                  <ProtectedRoute>
                    <UniversitiesPageModern />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/programs"
                element={
                  <ProtectedRoute>
                    <ProgramSearchPageModern />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfilePageModern />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/prep"
                element={
                  <ProtectedRoute>
                    <PrepHubModern />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/prep/test/:testId"
                element={
                  <ProtectedRoute>
                    <TestTakingModern />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/prep/results/:attemptId"
                element={
                  <ProtectedRoute>
                    <TestResultsModern />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/prep/progress"
                element={
                  <ProtectedRoute>
                    <ProgressPageModern />
                  </ProtectedRoute>
                }
              />
              <Route path="/report-issue" element={<ReportIssuePageModern />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Toaster position="top-right" />
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
