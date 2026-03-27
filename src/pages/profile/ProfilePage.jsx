import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Save,
  User,
  Phone,
  MapPin,
  BookOpen,
  Award,
  Mail,
  Sparkles,
  CheckCircle,
  Clock,
  Loader2,
} from "lucide-react";
import { FIELD_TYPES } from "../../utils/constants";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const { user, updateProfile, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    full_name: user?.full_name || "",
    phone: user?.phone || "",
    city: user?.city || "",
    field_of_interest: user?.field_of_interest || "",
    fsc_percentage: user?.fsc_percentage || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Convert FSC percentage to number
      const dataToSend = {
        ...formData,
        fsc_percentage: formData.fsc_percentage
          ? parseFloat(formData.fsc_percentage)
          : null,
      };

      await updateProfile(dataToSend);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error(error.response?.data?.detail || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "#FFF9F0" }}
      >
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-[#FF6B6B] animate-spin mx-auto mb-4" />
          <p
            className="text-[#2C3E50]/60 font-medium"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            Loading profile...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen relative py-8"
      style={{ background: "#FFF9F0" }}
    >
      {/* Decorative blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-15">
        <div
          className="blob-float absolute top-20 -left-20 w-96 h-96 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(255,107,107,0.3) 0%, transparent 70%)",
            animation: "blob-float 25s ease-in-out infinite",
          }}
        />
        <div
          className="blob-float absolute -bottom-20 right-20 w-80 h-80 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(78,205,196,0.3) 0%, transparent 70%)",
            animationDelay: "-12s",
            animation: "blob-float 25s ease-in-out infinite",
          }}
        />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/dashboard">
            <button
              className="flex items-center gap-2 px-4 py-2.5 bg-white text-[#FF6B6B] font-semibold rounded-2xl border-2 border-[#FF6B6B] shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              <ArrowLeft className="w-4 h-4" />
              Dashboard
            </button>
          </Link>
          <div className="flex items-center gap-3">
            <div
              className="p-3 bg-gradient-to-br from-[#FF6B6B] to-[#FFB88C] rounded-2xl shadow-lg"
              style={{ animation: "float 3s ease-in-out infinite" }}
            >
              <User className="w-7 h-7 text-white" strokeWidth={2.5} />
            </div>
            <h1
              className="text-4xl font-black text-[#2C3E50]"
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              Profile Settings
            </h1>
            <Sparkles
              className="w-6 h-6 text-[#FFE66D]"
              style={{ animation: "float 2s ease-in-out infinite 0.5s" }}
            />
          </div>
        </div>

        {/* Main Form Card */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50 mb-6">
          <h2
            className="text-2xl font-bold text-[#2C3E50] mb-6 flex items-center gap-2"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            <User className="w-6 h-6 text-[#FF6B6B]" />
            Personal Information
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Name Input */}
              <div>
                <label
                  className="block text-sm font-semibold text-[#2C3E50]/80 mb-2"
                  style={{ fontFamily: "Manrope, sans-serif" }}
                >
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#FF6B6B]/50" />
                  <input
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-3 bg-white border-2 border-[#FF6B6B]/20 rounded-2xl text-[#2C3E50] font-medium shadow-md hover:shadow-lg transition-all duration-300 focus:outline-none focus:border-[#FF6B6B] focus:ring-2 focus:ring-[#FF6B6B]/20"
                    style={{ fontFamily: "Manrope, sans-serif" }}
                  />
                </div>
              </div>

              {/* Phone Input */}
              <div>
                <label
                  className="block text-sm font-semibold text-[#2C3E50]/80 mb-2"
                  style={{ fontFamily: "Manrope, sans-serif" }}
                >
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#FF6B6B]/50" />
                  <input
                    name="phone_number"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 bg-white border-2 border-[#FF6B6B]/20 rounded-2xl text-[#2C3E50] font-medium shadow-md hover:shadow-lg transition-all duration-300 focus:outline-none focus:border-[#FF6B6B] focus:ring-2 focus:ring-[#FF6B6B]/20"
                    style={{ fontFamily: "Manrope, sans-serif" }}
                  />
                </div>
              </div>

              {/* City Input */}
              <div>
                <label
                  className="block text-sm font-semibold text-[#2C3E50]/80 mb-2"
                  style={{ fontFamily: "Manrope, sans-serif" }}
                >
                  City
                </label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#FF6B6B]/50" />
                  <input
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 bg-white border-2 border-[#FF6B6B]/20 rounded-2xl text-[#2C3E50] font-medium shadow-md hover:shadow-lg transition-all duration-300 focus:outline-none focus:border-[#FF6B6B] focus:ring-2 focus:ring-[#FF6B6B]/20"
                    style={{ fontFamily: "Manrope, sans-serif" }}
                  />
                </div>
              </div>

              {/* Field of Interest */}
              <div>
                <label
                  className="block text-sm font-semibold text-[#2C3E50]/80 mb-2"
                  style={{ fontFamily: "Manrope, sans-serif" }}
                >
                  Field of Interest
                </label>
                <div className="relative">
                  <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#FF6B6B]/50" />
                  <select
                    name="field_of_interest"
                    value={formData.field_of_interest}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 bg-white border-2 border-[#FF6B6B]/20 rounded-2xl text-[#2C3E50] font-medium shadow-md hover:shadow-lg transition-all duration-300 focus:outline-none focus:border-[#FF6B6B] focus:ring-2 focus:ring-[#FF6B6B]/20"
                    style={{ fontFamily: "Manrope, sans-serif" }}
                  >
                    <option value="">Select a field</option>
                    {FIELD_TYPES.map((field) => (
                      <option key={field} value={field}>
                        {field}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* FSC Percentage */}
              <div>
                <label
                  className="block text-sm font-semibold text-[#2C3E50]/80 mb-2"
                  style={{ fontFamily: "Manrope, sans-serif" }}
                >
                  FSC Percentage
                </label>
                <div className="relative">
                  <Award className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#FF6B6B]/50" />
                  <input
                    name="fsc_percentage"
                    type="number"
                    step="0.01"
                    min="0"
                    max="100"
                    value={formData.fsc_percentage}
                    onChange={handleChange}
                    placeholder="e.g., 85.5"
                    className="w-full pl-12 pr-4 py-3 bg-white border-2 border-[#FF6B6B]/20 rounded-2xl text-[#2C3E50] font-medium shadow-md hover:shadow-lg transition-all duration-300 focus:outline-none focus:border-[#FF6B6B] focus:ring-2 focus:ring-[#FF6B6B]/20"
                    style={{ fontFamily: "Manrope, sans-serif" }}
                  />
                </div>
              </div>

              {/* Email (Disabled) */}
              <div className="md:col-span-2">
                <label
                  className="block text-sm font-semibold text-[#2C3E50]/80 mb-2"
                  style={{ fontFamily: "Manrope, sans-serif" }}
                >
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2C3E50]/30" />
                  <input
                    value={user?.email || ""}
                    disabled
                    className="w-full pl-12 pr-4 py-3 bg-[#2C3E50]/5 border-2 border-[#2C3E50]/10 rounded-2xl text-[#2C3E50]/60 font-medium cursor-not-allowed"
                    style={{ fontFamily: "Manrope, sans-serif" }}
                  />
                </div>
                <p
                  className="text-sm text-[#2C3E50]/50 mt-2 italic"
                  style={{ fontFamily: "Manrope, sans-serif" }}
                >
                  Email cannot be changed
                </p>
              </div>
            </div>

            {/* FSC Impact Info */}
            {formData.fsc_percentage && (
              <div className="bg-gradient-to-r from-[#FFE66D]/20 to-[#FFB88C]/20 backdrop-blur-xl border-2 border-[#FFE66D]/30 rounded-3xl p-6 shadow-lg">
                <h3
                  className="font-bold text-lg text-[#2C3E50] mb-3 flex items-center gap-2"
                  style={{ fontFamily: "Outfit, sans-serif" }}
                >
                  <Sparkles className="w-5 h-5 text-[#FFE66D]" />
                  How your FSC percentage affects eligibility
                </h3>
                <div
                  className="text-sm text-[#2C3E50]/80 space-y-2"
                  style={{ fontFamily: "Manrope, sans-serif" }}
                >
                  <p>
                    • Programs with cutoff ≤{" "}
                    <strong>{parseFloat(formData.fsc_percentage) - 10}%</strong>{" "}
                    are <strong className="text-green-600">Safety</strong>
                  </p>
                  <p>
                    • Programs with cutoff between{" "}
                    <strong>{parseFloat(formData.fsc_percentage) - 10}%</strong>{" "}
                    and{" "}
                    <strong>{parseFloat(formData.fsc_percentage) + 10}%</strong>{" "}
                    are <strong className="text-yellow-600">Target</strong>
                  </p>
                  <p>
                    • Programs with cutoff &gt;{" "}
                    <strong>{parseFloat(formData.fsc_percentage) + 10}%</strong>{" "}
                    are <strong className="text-orange-600">Reach</strong>
                  </p>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end gap-4">
              <Link to="/dashboard">
                <button
                  type="button"
                  className="px-6 py-3 bg-white text-[#FF6B6B] font-bold rounded-2xl border-2 border-[#FF6B6B] shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  style={{ fontFamily: "Outfit, sans-serif" }}
                >
                  Cancel
                </button>
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#FF6B6B] to-[#FFB88C] text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Account Status Card */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50">
          <h2
            className="text-2xl font-bold text-[#2C3E50] mb-6"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            Account Status
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-center gap-3">
              <div
                className={`p-3 rounded-2xl shadow-lg ${user?.is_verified ? "bg-green-100" : "bg-yellow-100"}`}
              >
                {user?.is_verified ? (
                  <CheckCircle className="w-6 h-6 text-green-600" />
                ) : (
                  <Clock className="w-6 h-6 text-yellow-600" />
                )}
              </div>
              <div>
                <p
                  className="text-sm text-[#2C3E50]/60 font-medium"
                  style={{ fontFamily: "Manrope, sans-serif" }}
                >
                  Account Status
                </p>
                <p
                  className="text-lg font-bold text-[#2C3E50]"
                  style={{ fontFamily: "Outfit, sans-serif" }}
                >
                  {"Verified ✓"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#4ECDC4]/10 rounded-2xl shadow-lg">
                <Award className="w-6 h-6 text-[#4ECDC4]" />
              </div>
              <div>
                <p
                  className="text-sm text-[#2C3E50]/60 font-medium"
                  style={{ fontFamily: "Manrope, sans-serif" }}
                >
                  Account Type
                </p>
                <p
                  className="text-lg font-bold text-[#2C3E50]"
                  style={{ fontFamily: "Outfit, sans-serif" }}
                >
                  Free
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
