// src/pages/Dashboard.tsx
// import React from 'react';
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                GB
              </div>
              <span className="text-xl font-bold text-gray-900">
                GB AI Tutor
              </span>
            </div>

            {/* User Menu */}
            <div className="flex items-center gap-4">
              <span className="text-gray-700 hidden sm:block">
                {user?.full_name}
              </span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium hover:bg-gray-100 rounded-lg transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl shadow-md p-8 mb-8 text-white">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Welcome, {user?.full_name}! 👋
          </h1>
          <p className="text-blue-100 text-lg">
            Ready to find your perfect university?
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Your Profile
            </h2>
            <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
              Edit Profile
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <InfoItem label="Email" value={user?.email} icon="📧" />
            <InfoItem
              label="Phone"
              value={user?.phone || "Not provided"}
              icon="📱"
            />
            <InfoItem
              label="FSc Percentage"
              value={
                user?.fsc_percentage
                  ? `${user.fsc_percentage}%`
                  : "Not provided"
              }
              icon="📊"
            />
            <InfoItem
              label="City"
              value={user?.city || "Not provided"}
              icon="📍"
            />
            <InfoItem
              label="Field of Interest"
              value={user?.field_of_interest || "Not provided"}
              icon="🎓"
            />
            <InfoItem
              label="Member Since"
              value={
                user?.created_at
                  ? new Date(user.created_at).toLocaleDateString()
                  : "N/A"
              }
              icon="📅"
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ActionCard
              icon="🔍"
              title="Search Universities"
              description="Find universities matching your profile and budget"
              onClick={() => navigate("/search")}
              color="blue"
            />
            <ActionCard
              icon="💬"
              title="AI Counselor"
              description="Chat with our AI for personalized guidance"
              onClick={() => navigate("/chat")}
              color="green"
            />
            <ActionCard
              icon="📚"
              title="Study Roadmap"
              description="Get a customized study plan for entrance exams"
              onClick={() => navigate("/roadmap")}
              color="purple"
            />
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Recent Activity
          </h2>
          <div className="text-center py-8 text-gray-500">
            <p>No recent activity yet</p>
            <p className="text-sm mt-2">
              Start by searching for universities or chatting with our AI
              counselor
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Info Item Component
function InfoItem({
  label,
  value,
  icon,
}: {
  label: string;
  value: string | undefined;
  icon: string;
}) {
  return (
    <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
      <span className="text-2xl">{icon}</span>
      <div>
        <p className="text-sm text-gray-600 mb-1">{label}</p>
        <p className="text-base font-semibold text-gray-900">{value}</p>
      </div>
    </div>
  );
}

// Action Card Component
function ActionCard({
  icon,
  title,
  description,
  onClick,
  color = "blue",
}: {
  icon: string;
  title: string;
  description: string;
  onClick: () => void;
  color?: "blue" | "green" | "purple";
}) {
  const colorClasses = {
    blue: "hover:border-blue-500 hover:shadow-blue-100",
    green: "hover:border-green-500 hover:shadow-green-100",
    purple: "hover:border-purple-500 hover:shadow-purple-100",
  };

  return (
    <button
      onClick={onClick}
      className={`bg-white rounded-xl shadow-md p-6 text-left hover:shadow-lg transition-all border-2 border-transparent ${colorClasses[color]}`}
    >
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </button>
  );
}
