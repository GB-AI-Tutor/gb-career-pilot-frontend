import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import {
  User,
  Phone,
  MapPin,
  BookOpen,
  Award,
  Mail,
  Lock,
  Save,
  Camera,
  Settings,
  GraduationCap,
  Target,
  Heart,
  Shield,
  Bell,
  Eye,
  EyeOff,
  Loader2,
  ArrowLeft,
  CheckCircle2,
  TrendingUp,
  Star,
} from "lucide-react";
import { FIELD_TYPES } from "../../utils/constants";
import toast from "react-hot-toast";
import "../../styles/design-system.css";
import usersAPI from "../../api/users";

const ProfilePageModern = () => {
  const { user, updateProfile, loading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  // Profile form data
  const [formData, setFormData] = useState({
    full_name: user?.full_name || "",
    phone: user?.phone || "",
    city: user?.city || "",
    field_of_interest: user?.field_of_interest || "",
    fsc_percentage: user?.fsc_percentage || "",
  });

  // Password change data
  const [passwordData, setPasswordData] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
  });

  // Preferences data
  const [preferences, setPreferences] = useState({
    preferred_cities: user?.preferred_cities || [],
    preferred_sectors: user?.preferred_sectors || [],
    budget_range: user?.budget_range || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePreferenceChange = (e) => {
    const { name, value } = e.target;
    setPreferences((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
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

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (!passwordData.old_password?.trim()) {
      toast.error("Current password is required");
      return;
    }

    if (passwordData.new_password !== passwordData.confirm_password) {
      toast.error("New passwords don't match!");
      return;
    }

    if (passwordData.new_password.length < 8) {
      toast.error("Password must be at least 8 characters long!");
      return;
    }

    if (passwordData.new_password === passwordData.old_password) {
      toast.error("New password must be different from current password");
      return;
    }

    setLoading(true);
    try {
      await usersAPI.changePassword({
        old_password: passwordData.old_password,
        new_password: passwordData.new_password,
      });

      toast.success("Password changed successfully!");
      setPasswordData({
        old_password: "",
        new_password: "",
        confirm_password: "",
      });
    } catch (error) {
      const apiMessage =
        error?.response?.data?.detail ||
        error?.response?.data?.message ||
        error?.message ||
        "Failed to change password";
      toast.error(apiMessage);
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "preferences", label: "Preferences", icon: Heart },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  if (authLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-primary-500 animate-spin mx-auto mb-4" />
          <p className="text-body-lg text-neutral-600 font-medium">
            Loading profile...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#002147] via-[#0a3f6f] to-[#000a1e] py-8 md:py-10 overflow-hidden">
        <div className="absolute inset-0 bg-pattern-dots opacity-10"></div>

        {/* Decorative Blobs */}
        <div className="absolute top-0 right-0 w-72 h-72 md:w-96 md:h-96 bg-[#36a6fa] rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div
          className="absolute bottom-0 left-0 w-72 h-72 md:w-96 md:h-96 bg-[#0158a1] rounded-full blur-3xl opacity-20 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Back Button */}
          <Link to="/dashboard">
            <button className="btn-secondary bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 mb-6">
              <ArrowLeft className="w-4 h-4" />
              Dashboard
            </button>
          </Link>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8">
            {/* Profile Picture */}
            <div className="relative group">
              <div className="w-32 h-32 rounded-full bg-white/10 backdrop-blur-xl border-4 border-white/30 shadow-lifted flex items-center justify-center overflow-hidden">
                {user?.profile_picture ? (
                  <img
                    src={user.profile_picture}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-16 h-16 text-white" strokeWidth={1.5} />
                )}
              </div>
              <button className="absolute bottom-0 right-0 w-10 h-10 bg-accent-500 text-white rounded-full shadow-lifted flex items-center justify-center group-hover:scale-110 transition-transform">
                <Camera className="w-5 h-5" />
              </button>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left text-white">
              <h1 className="text-display-md mb-2">
                {user?.full_name || "Your Name"}
              </h1>
              <div className="flex items-center gap-2 justify-center md:justify-start mb-4">
                <Mail className="w-4 h-4 opacity-80" />
                <p className="text-body-lg opacity-90">{user?.email}</p>
              </div>
              <div className="flex items-center gap-3 justify-center md:justify-start">
                <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full">
                  <CheckCircle2 className="w-4 h-4 text-green-300" />
                  <span className="text-body-sm font-semibold">
                    Verified Account
                  </span>
                </div>
                {user?.fsc_percentage && (
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full">
                    <Award className="w-4 h-4 text-yellow-300" />
                    <span className="text-body-sm font-semibold">
                      FSC: {user.fsc_percentage}%
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="border-b border-neutral-200 bg-white sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 font-semibold transition-all border-b-2 whitespace-nowrap ${
                    activeTab === tab.id
                      ? "text-primary-700 border-primary-600 bg-primary-50/50"
                      : "text-neutral-600 border-transparent hover:text-primary-600 hover:bg-neutral-50"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 md:py-10 bg-gradient-hero">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div className="animate-stagger">
              <div className="card-float">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-lifted">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-heading-md text-primary-900">
                      Personal Information
                    </h2>
                    <p className="text-body-sm text-neutral-600">
                      Update your personal details
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div>
                      <label className="block text-body-sm font-semibold text-neutral-700 mb-2">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-400" />
                        <input
                          name="full_name"
                          value={formData.full_name}
                          onChange={handleChange}
                          required
                          className="w-full pl-12 pr-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-primary-500 focus:outline-none transition-colors text-body-md"
                          placeholder="Enter your full name"
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-body-sm font-semibold text-neutral-700 mb-2">
                        Phone Number
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-400" />
                        <input
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full pl-12 pr-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-primary-500 focus:outline-none transition-colors text-body-md"
                          placeholder="03XX-XXXXXXX"
                        />
                      </div>
                    </div>

                    {/* City */}
                    <div>
                      <label className="block text-body-sm font-semibold text-neutral-700 mb-2">
                        City
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-400" />
                        <input
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          className="w-full pl-12 pr-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-primary-500 focus:outline-none transition-colors text-body-md"
                          placeholder="e.g., Islamabad"
                        />
                      </div>
                    </div>

                    {/* Email (Disabled) */}
                    <div>
                      <label className="block text-body-sm font-semibold text-neutral-700 mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                        <input
                          value={user?.email || ""}
                          disabled
                          className="w-full pl-12 pr-4 py-3 border-2 border-neutral-200 rounded-xl bg-neutral-50 text-neutral-500 cursor-not-allowed"
                        />
                      </div>
                      <p className="text-body-sm text-neutral-500 mt-1 italic">
                        Email cannot be changed
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-end gap-4 pt-4 border-t border-neutral-200">
                    <Link to="/dashboard">
                      <button type="button" className="btn-secondary">
                        Cancel
                      </button>
                    </Link>
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-primary"
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
            </div>
          )}

          {/* Education Tab */}
          {activeTab === "education" && (
            <div className="animate-stagger space-y-6">
              {/* Academic Records */}
              <div className="card-float">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-lifted">
                    <GraduationCap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-heading-md text-primary-900">
                      Academic Information
                    </h2>
                    <p className="text-body-sm text-neutral-600">
                      Update your educational background
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Field of Interest */}
                    <div>
                      <label className="block text-body-sm font-semibold text-neutral-700 mb-2">
                        Field of Interest
                      </label>
                      <div className="relative">
                        <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-400" />
                        <select
                          name="field_of_interest"
                          value={formData.field_of_interest}
                          onChange={handleChange}
                          className="w-full pl-12 pr-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-primary-500 focus:outline-none transition-colors text-body-md appearance-none bg-white"
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
                      <label className="block text-body-sm font-semibold text-neutral-700 mb-2">
                        FSC Percentage
                      </label>
                      <div className="relative">
                        <Award className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-400" />
                        <input
                          name="fsc_percentage"
                          type="number"
                          step="0.01"
                          min="0"
                          max="100"
                          value={formData.fsc_percentage}
                          onChange={handleChange}
                          placeholder="e.g., 85.5"
                          className="w-full pl-12 pr-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-primary-500 focus:outline-none transition-colors text-body-md"
                        />
                      </div>
                    </div>
                  </div>

                  {/* FSC Impact Info */}
                  {formData.fsc_percentage && (
                    <div className="glass rounded-2xl p-6 border-2 border-primary-200">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center flex-shrink-0">
                          <Target className="w-5 h-5 text-primary-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-heading-sm text-primary-900 mb-3">
                            Eligibility Impact
                          </h3>
                          <div className="space-y-3 text-body-sm">
                            <div className="flex items-start gap-3">
                              <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <CheckCircle2 className="w-4 h-4 text-green-600" />
                              </div>
                              <div>
                                <p className="text-neutral-700">
                                  <strong className="text-green-700">
                                    Safety Programs:
                                  </strong>{" "}
                                  Cutoff ≤{" "}
                                  <span className="font-semibold">
                                    {parseFloat(formData.fsc_percentage) - 10}%
                                  </span>
                                </p>
                                <p className="text-neutral-600 text-xs mt-1">
                                  High chance of admission
                                </p>
                              </div>
                            </div>
                            <div className="flex items-start gap-3">
                              <div className="w-6 h-6 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <Star className="w-4 h-4 text-yellow-600" />
                              </div>
                              <div>
                                <p className="text-neutral-700">
                                  <strong className="text-yellow-700">
                                    Target Programs:
                                  </strong>{" "}
                                  Cutoff between{" "}
                                  <span className="font-semibold">
                                    {parseFloat(formData.fsc_percentage) - 10}%
                                    - {parseFloat(formData.fsc_percentage) + 10}
                                    %
                                  </span>
                                </p>
                                <p className="text-neutral-600 text-xs mt-1">
                                  Good match for your profile
                                </p>
                              </div>
                            </div>
                            <div className="flex items-start gap-3">
                              <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <TrendingUp className="w-4 h-4 text-orange-600" />
                              </div>
                              <div>
                                <p className="text-neutral-700">
                                  <strong className="text-orange-700">
                                    Reach Programs:
                                  </strong>{" "}
                                  Cutoff &gt;{" "}
                                  <span className="font-semibold">
                                    {parseFloat(formData.fsc_percentage) + 10}%
                                  </span>
                                </p>
                                <p className="text-neutral-600 text-xs mt-1">
                                  Challenging but worth applying
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex justify-end gap-4 pt-4 border-t border-neutral-200">
                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={() => setActiveTab("profile")}
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-primary"
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
            </div>
          )}

          {/* Preferences Tab */}
          {activeTab === "preferences" && (
            <div className="animate-stagger space-y-6">
              <div className="card-float">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-lifted">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-heading-md text-primary-900">
                      University Preferences
                    </h2>
                    <p className="text-body-sm text-neutral-600">
                      Set your preferences for better recommendations
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Preferred Cities */}
                  <div>
                    <label className="block text-body-sm font-semibold text-neutral-700 mb-2">
                      Preferred Cities
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {[
                        "Islamabad",
                        "Karachi",
                        "Lahore",
                        "Peshawar",
                        "Multan",
                        "Faisalabad",
                        "Rawalpindi",
                        "Quetta",
                      ].map((city) => (
                        <label
                          key={city}
                          className="flex items-center gap-2 px-4 py-3 border-2 border-neutral-200 rounded-xl cursor-pointer hover:border-primary-400 transition-colors"
                        >
                          <input
                            type="checkbox"
                            className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                            checked={preferences.preferred_cities?.includes(
                              city,
                            )}
                            onChange={(e) => {
                              const cities = e.target.checked
                                ? [
                                    ...(preferences.preferred_cities || []),
                                    city,
                                  ]
                                : preferences.preferred_cities?.filter(
                                    (c) => c !== city,
                                  );
                              setPreferences({
                                ...preferences,
                                preferred_cities: cities,
                              });
                            }}
                          />
                          <span className="text-body-sm">{city}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Preferred Sectors */}
                  <div>
                    <label className="block text-body-sm font-semibold text-neutral-700 mb-2">
                      Preferred University Type
                    </label>
                    <div className="grid md:grid-cols-2 gap-3">
                      {["Public", "Private"].map((sector) => (
                        <label
                          key={sector}
                          className="flex items-center gap-3 px-6 py-4 border-2 border-neutral-200 rounded-xl cursor-pointer hover:border-primary-400 transition-colors"
                        >
                          <input
                            type="checkbox"
                            className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
                            checked={preferences.preferred_sectors?.includes(
                              sector,
                            )}
                            onChange={(e) => {
                              const sectors = e.target.checked
                                ? [
                                    ...(preferences.preferred_sectors || []),
                                    sector,
                                  ]
                                : preferences.preferred_sectors?.filter(
                                    (s) => s !== sector,
                                  );
                              setPreferences({
                                ...preferences,
                                preferred_sectors: sectors,
                              });
                            }}
                          />
                          <span className="text-body-md font-medium">
                            {sector}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Budget Range */}
                  <div>
                    <label className="block text-body-sm font-semibold text-neutral-700 mb-2">
                      Annual Budget Range (PKR)
                    </label>
                    <select
                      name="budget_range"
                      value={preferences.budget_range}
                      onChange={handlePreferenceChange}
                      className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-primary-500 focus:outline-none transition-colors text-body-md appearance-none bg-white"
                    >
                      <option value="">Select budget range</option>
                      <option value="0-100000">Less than 100,000</option>
                      <option value="100000-300000">100,000 - 300,000</option>
                      <option value="300000-500000">300,000 - 500,000</option>
                      <option value="500000-1000000">
                        500,000 - 1,000,000
                      </option>
                      <option value="1000000+">1,000,000+</option>
                    </select>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-end gap-4 pt-4 border-t border-neutral-200">
                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={() => setActiveTab("education")}
                    >
                      Back
                    </button>
                    <button
                      onClick={() => toast.success("Preferences saved!")}
                      className="btn-primary"
                    >
                      <Save className="w-5 h-5" />
                      Save Preferences
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === "settings" && (
            <div className="animate-stagger space-y-6">
              {/* Password Change */}
              <div className="card-float">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-lifted">
                    <Lock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-heading-md text-primary-900">
                      Change Password
                    </h2>
                    <p className="text-body-sm text-neutral-600">
                      Update your account password
                    </p>
                  </div>
                </div>

                <form onSubmit={handlePasswordSubmit} className="space-y-6">
                  {/* Old Password */}
                  <div>
                    <label className="block text-body-sm font-semibold text-neutral-700 mb-2">
                      Current Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-400" />
                      <input
                        name="old_password"
                        type={showOldPassword ? "text" : "password"}
                        value={passwordData.old_password}
                        onChange={handlePasswordChange}
                        className="w-full pl-12 pr-12 py-3 border-2 border-neutral-200 rounded-xl focus:border-primary-500 focus:outline-none transition-colors text-body-md"
                        placeholder="Enter current password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowOldPassword(!showOldPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                      >
                        {showOldPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* New Password */}
                  <div>
                    <label className="block text-body-sm font-semibold text-neutral-700 mb-2">
                      New Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-400" />
                      <input
                        name="new_password"
                        type={showNewPassword ? "text" : "password"}
                        value={passwordData.new_password}
                        onChange={handlePasswordChange}
                        className="w-full pl-12 pr-12 py-3 border-2 border-neutral-200 rounded-xl focus:border-primary-500 focus:outline-none transition-colors text-body-md"
                        placeholder="Enter new password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                      >
                        {showNewPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="block text-body-sm font-semibold text-neutral-700 mb-2">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-400" />
                      <input
                        name="confirm_password"
                        type="password"
                        value={passwordData.confirm_password}
                        onChange={handlePasswordChange}
                        className="w-full pl-12 pr-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-primary-500 focus:outline-none transition-colors text-body-md"
                        placeholder="Confirm new password"
                      />
                    </div>
                  </div>

                  {/* Password Requirements */}
                  <div className="glass rounded-xl p-4 border border-neutral-200">
                    <p className="text-body-sm font-semibold text-neutral-700 mb-2">
                      Password Requirements:
                    </p>
                    <ul className="text-body-sm text-neutral-600 space-y-1">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary-500" />
                        At least 8 characters long
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary-500" />
                        Include uppercase and lowercase letters
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary-500" />
                        Include at least one number
                      </li>
                    </ul>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-end gap-4 pt-4 border-t border-neutral-200">
                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={() => {
                        setPasswordData({
                          old_password: "",
                          new_password: "",
                          confirm_password: "",
                        });
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-primary"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Updating...
                        </>
                      ) : (
                        <>
                          <Shield className="w-5 h-5" />
                          Update Password
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>

              {/* Notification Settings */}
              <div className="card-float">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-lifted">
                    <Bell className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-heading-md text-primary-900">
                      Notifications
                    </h2>
                    <p className="text-body-sm text-neutral-600">
                      Manage your notification preferences
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      title: "Email Notifications",
                      description:
                        "Receive updates about new programs and universities",
                    },
                    {
                      title: "Application Reminders",
                      description: "Get reminders about application deadlines",
                    },
                    {
                      title: "AI Chat Summaries",
                      description:
                        "Weekly summary of your AI counseling sessions",
                    },
                  ].map((notification) => (
                    <div
                      key={notification.title}
                      className="flex items-center justify-between p-4 border-2 border-neutral-200 rounded-xl hover:border-primary-300 transition-colors"
                    >
                      <div className="flex-1">
                        <p className="text-body-md font-semibold text-neutral-900">
                          {notification.title}
                        </p>
                        <p className="text-body-sm text-neutral-600">
                          {notification.description}
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          defaultChecked
                        />
                        <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Account Status */}
              <div className="card-float">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center shadow-lifted">
                    <CheckCircle2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-heading-md text-primary-900">
                      Account Status
                    </h2>
                    <p className="text-body-sm text-neutral-600">
                      Your account information
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-green-50 border-2 border-green-200 rounded-xl">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-6 h-6 text-green-600" />
                      <div>
                        <p className="text-body-sm text-neutral-600">
                          Account Status
                        </p>
                        <p className="text-body-md font-bold text-green-700">
                          Verified ✓
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-primary-50 border-2 border-primary-200 rounded-xl">
                    <div className="flex items-center gap-3">
                      <Award className="w-6 h-6 text-primary-600" />
                      <div>
                        <p className="text-body-sm text-neutral-600">
                          Account Type
                        </p>
                        <p className="text-body-md font-bold text-primary-700">
                          Free Plan
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ProfilePageModern;
