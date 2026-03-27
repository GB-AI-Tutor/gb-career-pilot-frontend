import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";
import { authAPI } from "../../api/auth";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      await authAPI.forgotPassword(email);
      setSubmitted(true);
      toast.success("If your email is registered, a reset link has been sent.");
    } catch (error) {
      const message =
        error.response?.data?.detail ||
        "Failed to process forgot password request";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FF6B6B] via-[#FFB88C] to-[#FFE66D] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-[2rem] p-8 shadow-2xl">
          <h1 className="text-3xl font-black text-[#2C3E50] mb-3">
            Forgot Password
          </h1>
          <p className="text-[#2C3E50]/80 mb-6">
            Enter your email and we will send a password reset link.
          </p>

          {submitted ? (
            <div className="rounded-2xl bg-green-50 border border-green-200 p-4 text-green-800 text-sm font-medium">
              Check your email for the reset instructions.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-[#2C3E50] mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#FF6B6B]" />
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@example.com"
                    required
                    autoComplete="email"
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-[#FF6B6B] focus:ring-4 focus:ring-[#FF6B6B]/10 transition-all text-[#2C3E50] font-medium placeholder:text-gray-400"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#FF6B6B] to-[#FFB88C] text-white py-4 rounded-2xl font-black text-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  "Sending..."
                ) : (
                  <>
                    Send Reset Link
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          )}

          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="text-[#FF6B6B] hover:text-[#FFB88C] font-bold transition-colors"
            >
              Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
