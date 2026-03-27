import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { LogIn, ArrowRight, Mail, Lock } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  if (isAuthenticated) {
    navigate("/dashboard");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login({ email, password });
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FF6B6B] via-[#FFB88C] to-[#FFE66D] flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Animated Blobs */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-white/10 rounded-full blob animate-blob-float"></div>
        <div
          className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-[#4ECDC4]/20 rounded-full blob-2 animate-blob-float"
          style={{ animationDelay: "7s" }}
        ></div>
      </div>

      <div className="max-w-md w-full relative z-10">
        {/* Floating Badge */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 glass rounded-3xl mb-6 animate-float">
            <LogIn className="w-10 h-10 text-white" strokeWidth={2.5} />
          </div>
          <h1 className="text-5xl font-black text-white mb-3 leading-tight">
            Welcome <span className="text-[#FFE66D] italic">Back!</span>
          </h1>
          <p className="text-xl text-white/90 font-medium">
            Sign in to continue your journey
          </p>
        </div>

        {/* Login Card */}
        <div
          className="bg-white rounded-[2rem] p-8 shadow-2xl animate-scale-in"
          style={{ animationDelay: "0.1s" }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-bold text-[#2C3E50] mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#FF6B6B]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  autoComplete="email"
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-[#FF6B6B] focus:ring-4 focus:ring-[#FF6B6B]/10 transition-all text-[#2C3E50] font-medium placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-bold text-[#2C3E50] mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#FF6B6B]" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-[#FF6B6B] focus:ring-4 focus:ring-[#FF6B6B]/10 transition-all text-[#2C3E50] font-medium placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center cursor-pointer group">
                <input
                  type="checkbox"
                  className="w-5 h-5 rounded-lg border-2 border-gray-300 text-[#FF6B6B] focus:ring-[#FF6B6B] cursor-pointer"
                />
                <span className="ml-3 text-[#2C3E50] font-medium group-hover:text-[#FF6B6B] transition-colors">
                  Remember me
                </span>
              </label>
              <Link
                to="/forgot-password"
                className="text-[#FF6B6B] hover:text-[#FFB88C] font-bold transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#FF6B6B] to-[#FFB88C] text-white py-4 rounded-2xl font-black text-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                "Signing in..."
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-8 flex items-center">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="px-4 text-sm text-gray-500 font-medium">or</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* Sign Up Link */}
          <div className="text-center">
            <p className="text-[#2C3E50] font-medium">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-[#FF6B6B] hover:text-[#FFB88C] font-black transition-colors"
              >
                Sign up for free
              </Link>
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div
          className="mt-8 text-center animate-fade-in"
          style={{ animationDelay: "0.2s" }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-white font-bold hover:gap-3 transition-all"
          >
            <span>←</span>
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
