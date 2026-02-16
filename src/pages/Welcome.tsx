// src/pages/Welcome.tsx
// import React from 'react';
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

export function Welcome() {
  const { isAuthenticated } = useAuth();

  // If already logged in, redirect to dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in">
          {/* Logo */}
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-2xl shadow-2xl mb-6 transform hover:scale-110 transition-transform duration-300">
            <span className="text-4xl font-bold text-blue-600">GB</span>
          </div>

          {/* Main Title */}
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            GB AI Tutor
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Your AI-powered guide to university admissions in Pakistan
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/register"
              className="w-full sm:w-auto px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <span>Get Started</span>
              <span>→</span>
            </Link>

            <Link
              to="/login"
              className="w-full sm:w-auto px-8 py-4 bg-blue-800 text-white font-semibold rounded-xl shadow-lg hover:bg-blue-900 transform hover:-translate-y-1 transition-all duration-200"
            >
              Login
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          <FeatureCard
            icon="🎓"
            title="University Search"
            description="Find the perfect university based on your FSc percentage and budget"
          />
          <FeatureCard
            icon="🤖"
            title="AI Counselor"
            description="Get personalized guidance from our AI-powered counselor 24/7"
          />
          <FeatureCard
            icon="📊"
            title="Study Roadmap"
            description="Receive customized study plans for entrance exams like ECAT and MDCAT"
          />
        </div>

        {/* Stats Section */}
        <div className="mt-12 grid grid-cols-3 gap-6 text-center">
          <StatCard number="200+" label="Universities" />
          <StatCard number="50+" label="Fields" />
          <StatCard number="24/7" label="AI Support" />
        </div>
      </div>
    </div>
  );
}

// Feature Card Component
function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-white hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-1">
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-blue-100 text-sm">{description}</p>
    </div>
  );
}

// Stat Card Component
function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <div className="text-white">
      <div className="text-3xl md:text-4xl font-bold mb-1">{number}</div>
      <div className="text-blue-100 text-sm">{label}</div>
    </div>
  );
}
