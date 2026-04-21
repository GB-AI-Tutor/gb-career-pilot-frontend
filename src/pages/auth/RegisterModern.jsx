import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import {
  UserPlus,
  ArrowRight,
  Mail,
  Lock,
  User,
  Phone,
  MapPin,
  BookOpen,
  GraduationCap,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import "../../styles/design-system.css";

const RegisterModern = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    city: "",
    field_of_interest: "Computer Science",
    fsc_percentage: "",
    // Preferences
    preferred_sector: "Any",
    preferred_cities: [], // Array of cities
    max_budget_per_semester: "",
    scholarship_priority: true,
    hostel_requirement: false,
    min_national_ranking: "",
    acceptTerms: false,
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { register, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  if (isAuthenticated) {
    navigate("/dashboard");
  }

  const validateStep = (currentStep) => {
    const newErrors = {};

    if (currentStep === 1) {
      if (!formData.name.trim()) newErrors.name = "Name is required";
      if (!formData.email.trim()) newErrors.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(formData.email))
        newErrors.email = "Email is invalid";
    }

    if (currentStep === 2) {
      if (!formData.password) newErrors.password = "Password is required";
      else if (formData.password.length < 8)
        newErrors.password = "Password must be at least 8 characters";
      if (formData.password !== formData.confirmPassword)
        newErrors.confirmPassword = "Passwords do not match";
    }

    if (currentStep === 3) {
      if (!formData.city.trim()) newErrors.city = "City is required";

      if (!formData.field_of_interest)
        newErrors.field_of_interest = "Field of interest is required";

      if (!formData.fsc_percentage) {
        newErrors.fsc_percentage = "FSC percentage is required";
      } else {
        const fscValue = parseFloat(formData.fsc_percentage);
        if (Number.isNaN(fscValue) || fscValue <= 0 || fscValue >= 100) {
          newErrors.fsc_percentage = "FSC percentage must be between 0 and 100";
        }
      }
    }

    if (currentStep === 4) {
      // Preferences validation
      if (!formData.preferred_sector) {
        newErrors.preferred_sector = "Please select a sector preference";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(step)) return;
    if (!formData.acceptTerms) {
      setErrors({ acceptTerms: "You must accept the terms and conditions" });
      return;
    }

    setLoading(true);

    try {
      await register({
        full_name: formData.name.trim(),
        email: formData.email.trim(),
        password_hash: formData.password,
        phone: formData.phone,
        city: formData.city.trim(),
        field_of_interest: formData.field_of_interest,
        fsc_percentage: parseFloat(formData.fsc_percentage),
        // Preferences to be saved via separate API call
        preferences: {
          preferred_sector: formData.preferred_sector,
          preferred_cities: formData.preferred_cities,
          max_budget_per_semester: formData.max_budget_per_semester
            ? parseFloat(formData.max_budget_per_semester)
            : null,
          scholarship_priority: formData.scholarship_priority,
          hostel_requirement: formData.hostel_requirement,
          min_national_ranking: formData.min_national_ranking
            ? parseInt(formData.min_national_ranking)
            : null,
        },
      });
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
      setErrors({ submit: error.message || "Registration failed" });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const steps = [
    { number: 1, label: "Basic Info" },
    { number: 2, label: "Security" },
    { number: 3, label: "Profile" },
    { number: 4, label: "Preferences" },
  ];

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-pattern-dots opacity-40"></div>

      {/* Floating Decorative Elements */}
      <div className="absolute top-20 right-10 w-32 h-32 bg-primary-200/30 rounded-full blur-3xl animate-float"></div>
      <div
        className="absolute bottom-20 left-10 w-40 h-40 bg-accent-200/30 rounded-full blur-3xl animate-float"
        style={{ animationDelay: "2s" }}
      ></div>

      {/* Main Content */}
      <div className="max-w-2xl w-full relative z-10">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in-up">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl mb-6 shadow-lifted animate-float">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-display-md text-primary-900 mb-2">
            Start Your Journey
          </h1>
          <p className="text-body-md text-neutral-600">
            Create your account and discover your perfect university
          </p>
        </div>

        {/* Progress Steps */}
        <div
          className="mb-8 animate-fade-in-up"
          style={{ animationDelay: "0.1s" }}
        >
          <div className="flex items-center justify-between max-w-md mx-auto">
            {steps.map((s, index) => (
              <div key={s.number} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-body-md transition-all ${
                      step >= s.number
                        ? "bg-gradient-to-br from-primary-500 to-primary-700 text-white shadow-lifted"
                        : "bg-white/80 text-neutral-400 border-2 border-neutral-200"
                    }`}
                  >
                    {step > s.number ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : (
                      s.number
                    )}
                  </div>
                  <span
                    className={`mt-2 text-body-sm font-medium ${
                      step >= s.number ? "text-primary-700" : "text-neutral-500"
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`h-0.5 flex-1 mx-2 transition-all ${
                      step > s.number
                        ? "bg-gradient-to-r from-primary-500 to-primary-700"
                        : "bg-neutral-200"
                    }`}
                  ></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Registration Card */}
        <div
          className="card-float bg-white p-8 animate-fade-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          <form onSubmit={handleSubmit}>
            {/* Step 1: Basic Info */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-body-md font-semibold text-primary-900 mb-2"
                  >
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Muhammad Ahmed"
                      className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 ${
                        errors.name
                          ? "border-red-300 focus:border-red-500"
                          : "border-neutral-200 focus:border-primary-500"
                      } focus:outline-none focus:ring-4 focus:ring-primary-100 transition-all text-body-md`}
                    />
                  </div>
                  {errors.name && (
                    <p className="mt-1 text-body-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-body-md font-semibold text-primary-900 mb-2"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="ahmed@example.com"
                      className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 ${
                        errors.email
                          ? "border-red-300 focus:border-red-500"
                          : "border-neutral-200 focus:border-primary-500"
                      } focus:outline-none focus:ring-4 focus:ring-primary-100 transition-all text-body-md`}
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-body-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-body-md font-semibold text-primary-900 mb-2"
                  >
                    Phone Number{" "}
                    <span className="text-neutral-400 font-normal">
                      (Optional)
                    </span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+92 300 1234567"
                      className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-neutral-200 focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-100 transition-all text-body-md"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleNext}
                  className="btn-primary w-full group"
                >
                  Continue
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}

            {/* Step 2: Security */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="password"
                    className="block text-body-md font-semibold text-primary-900 mb-2"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                    <input
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 ${
                        errors.password
                          ? "border-red-300 focus:border-red-500"
                          : "border-neutral-200 focus:border-primary-500"
                      } focus:outline-none focus:ring-4 focus:ring-primary-100 transition-all text-body-md`}
                    />
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-body-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.password}
                    </p>
                  )}
                  <p className="mt-2 text-body-sm text-neutral-600">
                    Must be at least 8 characters long
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-body-md font-semibold text-primary-900 mb-2"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 ${
                        errors.confirmPassword
                          ? "border-red-300 focus:border-red-500"
                          : "border-neutral-200 focus:border-primary-500"
                      } focus:outline-none focus:ring-4 focus:ring-primary-100 transition-all text-body-md`}
                    />
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-1 text-body-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="btn-secondary flex-1"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="btn-primary flex-1 group"
                  >
                    Continue
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Profile */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="bg-primary-50 border border-primary-200 rounded-xl p-6">
                  <h3 className="text-heading-sm text-primary-900 mb-4">
                    Account Summary
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-body-md text-neutral-600">
                        Name:
                      </span>
                      <span className="text-body-md font-semibold text-primary-900">
                        {formData.name}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-body-md text-neutral-600">
                        Email:
                      </span>
                      <span className="text-body-md font-semibold text-primary-900">
                        {formData.email}
                      </span>
                    </div>
                    {formData.phone && (
                      <div className="flex justify-between items-center">
                        <span className="text-body-md text-neutral-600">
                          Phone:
                        </span>
                        <span className="text-body-md font-semibold text-primary-900">
                          {formData.phone}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between items-center">
                      <span className="text-body-md text-neutral-600">
                        City:
                      </span>
                      <span className="text-body-md font-semibold text-primary-900">
                        {formData.city || "--"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-body-md text-neutral-600">
                        Field:
                      </span>
                      <span className="text-body-md font-semibold text-primary-900">
                        {formData.field_of_interest || "--"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-body-md text-neutral-600">
                        FSC %:
                      </span>
                      <span className="text-body-md font-semibold text-primary-900">
                        {formData.fsc_percentage || "--"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="city"
                      className="block text-body-md font-semibold text-primary-900 mb-2"
                    >
                      City
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                      <input
                        id="city"
                        name="city"
                        type="text"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="Lahore"
                        className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 ${
                          errors.city
                            ? "border-red-300 focus:border-red-500"
                            : "border-neutral-200 focus:border-primary-500"
                        } focus:outline-none focus:ring-4 focus:ring-primary-100 transition-all text-body-md`}
                      />
                    </div>
                    {errors.city && (
                      <p className="mt-1 text-body-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.city}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="field_of_interest"
                      className="block text-body-md font-semibold text-primary-900 mb-2"
                    >
                      Field of Interest
                    </label>
                    <div className="relative">
                      <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                      <select
                        id="field_of_interest"
                        name="field_of_interest"
                        value={formData.field_of_interest}
                        onChange={handleChange}
                        className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 appearance-none bg-white ${
                          errors.field_of_interest
                            ? "border-red-300 focus:border-red-500"
                            : "border-neutral-200 focus:border-primary-500"
                        } focus:outline-none focus:ring-4 focus:ring-primary-100 transition-all text-body-md`}
                      >
                        <option value="Computer Science">
                          Computer Science
                        </option>
                        <option value="Medical">Medical</option>
                        <option value="Engineering">Engineering</option>
                      </select>
                    </div>
                    {errors.field_of_interest && (
                      <p className="mt-1 text-body-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.field_of_interest}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="fsc_percentage"
                    className="block text-body-md font-semibold text-primary-900 mb-2"
                  >
                    FSC Percentage
                  </label>
                  <div className="relative">
                    <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                    <input
                      id="fsc_percentage"
                      name="fsc_percentage"
                      type="number"
                      value={formData.fsc_percentage}
                      onChange={handleChange}
                      placeholder="85"
                      min="0"
                      max="100"
                      step="0.01"
                      className={`w-full pl-12 pr-4 py-3 rounded-xl border-2 ${
                        errors.fsc_percentage
                          ? "border-red-300 focus:border-red-500"
                          : "border-neutral-200 focus:border-primary-500"
                      } focus:outline-none focus:ring-4 focus:ring-primary-100 transition-all text-body-md`}
                    />
                  </div>
                  {errors.fsc_percentage && (
                    <p className="mt-1 text-body-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.fsc_percentage}
                    </p>
                  )}
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="btn-secondary flex-1"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="btn-primary flex-1 group"
                  >
                    Continue
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Preferences */}
            {step === 4 && (
              <div className="space-y-6">
                <div className="bg-accent-50 border border-accent-200 rounded-xl p-6">
                  <h3 className="text-heading-sm text-accent-900 mb-2">
                    🎯 AI University Matching
                  </h3>
                  <p className="text-body-sm text-accent-700">
                    Tell us your preferences so we can recommend the best
                    universities for you
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="preferred_sector"
                      className="block text-body-md font-semibold text-primary-900 mb-2"
                    >
                      University Sector
                    </label>
                    <select
                      id="preferred_sector"
                      name="preferred_sector"
                      value={formData.preferred_sector}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border-2 appearance-none bg-white ${
                        errors.preferred_sector
                          ? "border-red-300 focus:border-red-500"
                          : "border-neutral-200 focus:border-primary-500"
                      } focus:outline-none focus:ring-4 focus:ring-primary-100 transition-all text-body-md`}
                    >
                      <option value="Any">Any (All Types)</option>
                      <option value="Public">Public Universities</option>
                      <option value="Private">Private Universities</option>
                      <option value="Semi-Government">Semi-Government</option>
                    </select>
                    {errors.preferred_sector && (
                      <p className="mt-1 text-body-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.preferred_sector}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="max_budget_per_semester"
                      className="block text-body-md font-semibold text-primary-900 mb-2"
                    >
                      Max Budget Per Semester (Optional)
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400">
                        PKR
                      </span>
                      <input
                        id="max_budget_per_semester"
                        name="max_budget_per_semester"
                        type="number"
                        value={formData.max_budget_per_semester}
                        onChange={handleChange}
                        placeholder="500000"
                        className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-neutral-200 focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-100 transition-all text-body-md"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-body-md font-semibold text-primary-900 mb-3">
                    Preferred Cities for University
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {[
                      "Islamabad",
                      "Lahore",
                      "Karachi",
                      "Peshawar",
                      "Quetta",
                      "Multan",
                      "Faisalabad",
                      "Rawalpindi",
                    ].map((cityOption) => (
                      <label
                        key={cityOption}
                        className="flex items-center gap-2 p-3 border-2 border-neutral-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 cursor-pointer transition-all"
                      >
                        <input
                          type="checkbox"
                          checked={formData.preferred_cities.includes(
                            cityOption,
                          )}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFormData((prev) => ({
                                ...prev,
                                preferred_cities: [
                                  ...prev.preferred_cities,
                                  cityOption,
                                ],
                              }));
                            } else {
                              setFormData((prev) => ({
                                ...prev,
                                preferred_cities: prev.preferred_cities.filter(
                                  (c) => c !== cityOption,
                                ),
                              }));
                            }
                          }}
                          className="w-4 h-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
                        />
                        <span className="text-body-sm font-medium text-primary-900">
                          {cityOption}
                        </span>
                      </label>
                    ))}
                  </div>
                  <p className="text-body-sm text-neutral-500 mt-2">
                    Select one or more cities where you'd prefer to study
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <label className="flex items-center gap-3 p-4 border-2 border-neutral-200 rounded-xl hover:border-primary-300 hover:bg-primary-50 cursor-pointer transition-all">
                    <input
                      type="checkbox"
                      name="scholarship_priority"
                      checked={formData.scholarship_priority}
                      onChange={handleChange}
                      className="w-5 h-5 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
                    />
                    <div>
                      <p className="font-semibold text-primary-900">
                        Scholarship Available
                      </p>
                      <p className="text-body-sm text-neutral-600">
                        Prioritize universities offering scholarships
                      </p>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-4 border-2 border-neutral-200 rounded-xl hover:border-primary-300 hover:bg-primary-50 cursor-pointer transition-all">
                    <input
                      type="checkbox"
                      name="hostel_requirement"
                      checked={formData.hostel_requirement}
                      onChange={handleChange}
                      className="w-5 h-5 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
                    />
                    <div>
                      <p className="font-semibold text-primary-900">
                        Hostel Facility
                      </p>
                      <p className="text-body-sm text-neutral-600">
                        Universities with hostel accommodation
                      </p>
                    </div>
                  </label>
                </div>

                <div>
                  <label
                    htmlFor="min_national_ranking"
                    className="block text-body-md font-semibold text-primary-900 mb-2"
                  >
                    Minimum National Ranking (Optional)
                  </label>
                  <input
                    id="min_national_ranking"
                    name="min_national_ranking"
                    type="number"
                    value={formData.min_national_ranking}
                    onChange={handleChange}
                    placeholder="e.g., 20 for top 20"
                    className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-100 transition-all text-body-md"
                  />
                  <p className="text-body-sm text-neutral-500 mt-1">
                    Leave blank for no preference
                  </p>
                </div>

                <div>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="acceptTerms"
                      checked={formData.acceptTerms}
                      onChange={handleChange}
                      className="mt-1 w-5 h-5 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
                    />
                    <span className="text-body-md text-neutral-700">
                      I agree to the{" "}
                      <Link
                        to="/terms"
                        className="text-primary-600 hover:text-primary-700 font-semibold"
                      >
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link
                        to="/privacy"
                        className="text-primary-600 hover:text-primary-700 font-semibold"
                      >
                        Privacy Policy
                      </Link>
                    </span>
                  </label>
                  {errors.acceptTerms && (
                    <p className="mt-2 text-body-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.acceptTerms}
                    </p>
                  )}
                </div>

                {errors.submit && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                    <p className="text-body-md text-red-600 flex items-center gap-2">
                      <AlertCircle className="w-5 h-5" />
                      {errors.submit}
                    </p>
                  </div>
                )}

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="btn-secondary flex-1"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-accent flex-1 group"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg
                          className="animate-spin h-5 w-5"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Creating account...
                      </span>
                    ) : (
                      <>
                        Create Account
                        <UserPlus className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </form>

          {/* Sign In Link */}
          <p className="text-center mt-8 text-body-md text-neutral-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-primary-600 hover:text-primary-700 transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>

        {/* Feature Highlights */}
        <div
          className="mt-8 grid grid-cols-3 gap-4 animate-fade-in-up"
          style={{ animationDelay: "0.3s" }}
        >
          <div className="text-center">
            <div className="w-10 h-10 bg-white/80 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-2 shadow-soft">
              <CheckCircle2 className="w-5 h-5 text-success-600" />
            </div>
            <p className="text-body-sm text-neutral-700 font-medium">
              Free Forever
            </p>
          </div>
          <div className="text-center">
            <div className="w-10 h-10 bg-white/80 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-2 shadow-soft">
              <Lock className="w-5 h-5 text-primary-600" />
            </div>
            <p className="text-body-sm text-neutral-700 font-medium">Secure</p>
          </div>
          <div className="text-center">
            <div className="w-10 h-10 bg-white/80 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-2 shadow-soft">
              <UserPlus className="w-5 h-5 text-accent-600" />
            </div>
            <p className="text-body-sm text-neutral-700 font-medium">
              Easy Setup
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterModern;
