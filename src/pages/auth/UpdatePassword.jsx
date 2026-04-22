import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, CheckCircle2, KeyRound, Lock, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";
import { authAPI } from "../../api/auth";
import "../../styles/design-system.css";

const MIN_PASSWORD_LENGTH = 8;

const UpdatePassword = () => {
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [updated, setUpdated] = useState(false);

  const validate = () => {
    if (newPassword.length < MIN_PASSWORD_LENGTH) {
      toast.error(`Password must be at least ${MIN_PASSWORD_LENGTH} characters.`);
      return false;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    setLoading(true);
    try {
      await authAPI.resetPassword({ new_password: newPassword });
      setUpdated(true);
      toast.success("Password updated successfully.");
    } catch (error) {
      const message =
        error?.response?.data?.detail ||
        error?.response?.data?.message ||
        "Unable to update password. Please request a new reset link.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] relative overflow-hidden px-4 py-12 md:py-16">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -left-16 h-72 w-72 rounded-full bg-[#002147]/10 blur-3xl motion-safe:animate-pulse" />
        <div
          className="absolute top-1/3 -right-24 h-96 w-96 rounded-full bg-[#83fba5]/20 blur-3xl motion-safe:animate-pulse"
          style={{ animationDelay: "0.8s" }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,33,71,0.09)_1px,transparent_0)] [background-size:24px_24px] opacity-30" />
      </div>

      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
        <section className="lg:col-span-5 lg:pt-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm font-semibold text-[#00743a] backdrop-blur-xl">
            <ShieldCheck className="h-4 w-4" />
            Secure Recovery
          </div>
          <h1
            className="mt-5 text-[clamp(2.1rem,5vw,3.2rem)] leading-[1.04] tracking-[-0.02em] text-[#000a1e]"
            style={{ fontFamily: "Manrope, var(--font-display)" }}
          >
            Set a fresh password and continue your career journey.
          </h1>
          <p
            className="mt-4 max-w-md text-base leading-relaxed text-[#3a4a62]"
            style={{ fontFamily: "Inter, var(--font-body)" }}
          >
            This private workspace uses your secure reset token to restore access.
            Choose a strong password to protect your plans, recommendations, and
            progress.
          </p>
        </section>

        <div className="hidden lg:block lg:col-span-1" />

        <section className="lg:col-span-6">
          <div className="rounded-2xl bg-white/80 p-2 backdrop-blur-2xl">
            <div className="rounded-2xl bg-white p-7 shadow-[0_24px_60px_-45px_rgba(0,33,71,0.45)] md:p-9">
              {updated ? (
                <div className="text-center">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-[#83fba5]/30 text-[#00743a]">
                    <CheckCircle2 className="h-10 w-10" />
                  </div>
                  <h2
                    className="mt-6 text-3xl text-[#000a1e]"
                    style={{ fontFamily: "Manrope, var(--font-display)" }}
                  >
                    Password Updated
                  </h2>
                  <p
                    className="mt-3 text-[#3a4a62]"
                    style={{ fontFamily: "Inter, var(--font-body)" }}
                  >
                    Your account is ready. Sign in with your new password.
                  </p>
                  <button
                    type="button"
                    onClick={() => navigate("/login")}
                    className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[linear-gradient(135deg,#002147,#000a1e)] px-6 py-3 text-sm font-semibold text-white shadow-[0_20px_45px_-25px_rgba(0,33,71,0.7)] transition-transform duration-300 hover:-translate-y-0.5"
                  >
                    Continue to Login
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-7 rounded-xl bg-[#e7e8e9] p-4 text-sm text-[#2e3f58]">
                    Use at least {MIN_PASSWORD_LENGTH} characters. Include letters, numbers, and symbols for stronger protection.
                  </div>

                  <div className="mb-6 rounded-xl bg-[#eef4ff] p-4 text-sm text-[#1e3a5f]">
                    Password update requires a valid <span className="font-semibold">refresh_token</span> cookie from your backend flow.
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label
                        htmlFor="newPassword"
                        className="mb-2 block text-sm font-semibold text-[#000a1e]"
                      >
                        New Password
                      </label>
                      <div className="relative">
                        <KeyRound className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#52708f]" />
                        <input
                          id="newPassword"
                          type="password"
                          value={newPassword}
                          onChange={(event) => setNewPassword(event.target.value)}
                          autoComplete="new-password"
                          required
                          className="w-full rounded-xl bg-[#f3f4f5] py-3.5 pl-12 pr-4 text-[#000a1e] outline-none ring-0 transition-all duration-200 placeholder:text-[#6b7f97] focus:bg-white focus:ring-2 focus:ring-[#006d36]/35"
                          placeholder="Enter your new password"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="confirmPassword"
                        className="mb-2 block text-sm font-semibold text-[#000a1e]"
                      >
                        Confirm Password
                      </label>
                      <div className="relative">
                        <Lock className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#52708f]" />
                        <input
                          id="confirmPassword"
                          type="password"
                          value={confirmPassword}
                          onChange={(event) => setConfirmPassword(event.target.value)}
                          autoComplete="new-password"
                          required
                          className="w-full rounded-xl bg-[#f3f4f5] py-3.5 pl-12 pr-4 text-[#000a1e] outline-none ring-0 transition-all duration-200 placeholder:text-[#6b7f97] focus:bg-white focus:ring-2 focus:ring-[#006d36]/35"
                          placeholder="Re-enter your new password"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[linear-gradient(135deg,#002147,#000a1e)] px-6 py-3.5 text-base font-semibold text-white shadow-[0_20px_45px_-25px_rgba(0,33,71,0.7)] transition-all duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-55"
                    >
                      {loading ? "Updating..." : "Update Password"}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </button>
                  </form>

                  <p
                    className="mt-6 text-center text-sm text-[#4f627c]"
                    style={{ fontFamily: "Inter, var(--font-body)" }}
                  >
                    Remembered it?{" "}
                    <Link
                      to="/login"
                      className="font-semibold text-[#00743a] transition-colors hover:text-[#006d36]"
                    >
                      Back to sign in
                    </Link>
                  </p>
                </>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default UpdatePassword;
