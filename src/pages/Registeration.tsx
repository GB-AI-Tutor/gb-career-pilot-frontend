// src/pages/Registration.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  full_name: string;
  phone: string;
  fsc_percentage: string;
  city: string;
  field_of_interest: string;
}

export function Registration() {
  const navigate = useNavigate();
  const { register } = useAuth();
  
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
    full_name: '',
    phone: '',
    fsc_percentage: '',
    city: '',
    field_of_interest: '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  // Form validation
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and number';
    }

    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Full name validation
    if (!formData.full_name) {
      newErrors.full_name = 'Full name is required';
    } else if (formData.full_name.length < 2) {
      newErrors.full_name = 'Full name must be at least 2 characters';
    }

    // FSc percentage validation (optional but if provided, validate)
    if (formData.fsc_percentage) {
      const percentage = parseFloat(formData.fsc_percentage);
      if (isNaN(percentage) || percentage < 0 || percentage > 100) {
        newErrors.fsc_percentage = 'FSc percentage must be between 0 and 100';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      await register({
        email: formData.email,
        password: formData.password,
        full_name: formData.full_name,
        phone: formData.phone || undefined,
        fsc_percentage: formData.fsc_percentage ? parseFloat(formData.fsc_percentage) : undefined,
        city: formData.city || undefined,
        field_of_interest: formData.field_of_interest || undefined,
      });

      // Redirect to dashboard on success
      navigate('/dashboard');
    } catch (error: unknown) {
      console.error('Registration error:', error);
      let errorMessage = 'Registration failed. Please try again.';
      if (typeof error === 'object' && error !== null) {
        if ('detail' in error && typeof (error as { detail?: string }).detail === 'string') {
          errorMessage = (error as { detail: string }).detail;
        } else if ('message' in error && typeof (error as { message?: string }).message === 'string') {
          errorMessage = (error as { message: string }).message;
        }
      }
      setErrors({
        general: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 py-12">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500 rounded-2xl mb-4">
            <span className="text-3xl font-bold text-white">GB</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
          <p className="text-gray-600">Join GB AI Tutor to start your university journey</p>
        </div>

        {/* General Error Message */}
        {errors.general && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 text-sm">{errors.general}</p>
          </div>
        )}

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="you@example.com"
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
          </div>

          {/* Full Name */}
          <div>
            <label htmlFor="full_name" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              id="full_name"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                errors.full_name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Ahmed Khan"
            />
            {errors.full_name && <p className="mt-1 text-sm text-red-600">{errors.full_name}</p>}
          </div>

          {/* Password Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password *
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="••••••••"
              />
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password *
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                  errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="••••••••"
              />
              {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
            </div>
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number <span className="text-gray-400">(Optional)</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="+92 300 1234567"
            />
          </div>

          {/* Student Profile Section */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Student Profile <span className="text-sm font-normal text-gray-500">(Optional)</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* FSc Percentage */}
              <div>
                <label htmlFor="fsc_percentage" className="block text-sm font-medium text-gray-700 mb-2">
                  FSc Percentage
                </label>
                <input
                  type="number"
                  id="fsc_percentage"
                  name="fsc_percentage"
                  value={formData.fsc_percentage}
                  onChange={handleChange}
                  min="0"
                  max="100"
                  step="0.01"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    errors.fsc_percentage ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="85.5"
                />
                {errors.fsc_percentage && <p className="mt-1 text-sm text-red-600">{errors.fsc_percentage}</p>}
              </div>

              {/* City */}
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                  City
                </label>
                <select
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="">Select City</option>
                  <option value="Islamabad">Islamabad</option>
                  <option value="Lahore">Lahore</option>
                  <option value="Karachi">Karachi</option>
                  <option value="Peshawar">Peshawar</option>
                  <option value="Gilgit">Gilgit</option>
                  <option value="Skardu">Skardu</option>
                  <option value="Rawalpindi">Rawalpindi</option>
                  <option value="Faisalabad">Faisalabad</option>
                  <option value="Multan">Multan</option>
                  <option value="Quetta">Quetta</option>
                </select>
              </div>
            </div>

            {/* Field of Interest */}
            <div className="mt-4">
              <label htmlFor="field_of_interest" className="block text-sm font-medium text-gray-700 mb-2">
                Field of Interest
              </label>
              <select
                id="field_of_interest"
                name="field_of_interest"
                value={formData.field_of_interest}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="">Select Field</option>
                <option value="Engineering">Engineering</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Medicine">Medicine</option>
                <option value="Business Administration">Business Administration</option>
                <option value="Arts & Humanities">Arts & Humanities</option>
                <option value="Sciences">Sciences</option>
                <option value="Law">Law</option>
                <option value="Architecture">Architecture</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Creating Account...</span>
              </>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        {/* Login Link */}
        <p className="mt-6 text-center text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:text-blue-700 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}