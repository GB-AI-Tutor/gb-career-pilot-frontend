export { default } from "./DashboardModernDesign";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";
// import { useState } from "react";
import {
  MessageCircle,
  School,
  BookOpen,
  User,
  TrendingUp,
  Award,
  Sparkles,
  Target,
  GraduationCap,
  ArrowRight,
  Clock,
  CheckCircle2,
  BarChart3,
  Brain,
} from "lucide-react";
import "../../styles/design-system.css";

const DashboardModern = () => {
  const { user, loading } = useAuth();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    else if (hour < 18) return "Good Afternoon";
    else return "Good Evening";
  };

  const greeting = getGreeting();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full animate-float mx-auto mb-4 flex items-center justify-center shadow-lifted">
            <Brain className="w-10 h-10 text-white animate-pulse" />
          </div>
          <p className="text-heading-md text-primary-900">
            Loading your dashboard...
          </p>
        </div>
      </div>
    );
  }

  // const stats = [
  //   {
  //     label: "Universities Explored",
  //     value: "24",
  //     change: "+12 this month",
  //     icon: School,
  //     gradient: "from-primary-500 to-primary-700",
  //   },
  //   {
  //     label: "Programs Matched",
  //     value: "8",
  //     change: "Safety, Target, Reach",
  //     icon: Target,
  //     gradient: "from-accent-500 to-accent-600",
  //   },
  //   {
  //     label: "Test Prep Progress",
  //     value: "75%",
  //     change: "1,500 questions done",
  //     icon: BookOpen,
  //     gradient: "from-primary-400 to-primary-600",
  //   },
  //   {
  //     label: "AI Conversations",
  //     value: "42",
  //     change: "28 hours of guidance",
  //     icon: MessageCircle,
  //     gradient: "from-accent-400 to-accent-500",
  //   },
  // ];

  const quickActions = [
    {
      title: "AI Career Counselor",
      description: "Get personalized guidance instantly",
      icon: MessageCircle,
      link: "/chat",
      color: "primary",
    },
    {
      title: "Explore Universities",
      description: "Browse and compare options",
      icon: School,
      link: "/universities",
      color: "accent",
    },
    {
      title: "Find Programs",
      description: "Search with eligibility matching",
      icon: Target,
      link: "/programs",
      color: "primary",
    },
    {
      title: "Test Preparation",
      description: "Practice and track progress",
      icon: BookOpen,
      link: "/prep",
      color: "accent",
    },
  ];

  // const recentActivity = [
  //   {
  //     type: "university",
  //     title: "Viewed NUST Islamabad",
  //     time: "2 hours ago",
  //     icon: School,
  //   },
  //   {
  //     type: "test",
  //     title: "Completed ECAT Practice Test",
  //     time: "5 hours ago",
  //     icon: CheckCircle2,
  //   },
  //   {
  //     type: "chat",
  //     title: "Asked about admission requirements",
  //     time: "Yesterday",
  //     icon: MessageCircle,
  //   },
  //   {
  //     type: "program",
  //     title: "Bookmarked Computer Science at FAST",
  //     time: "2 days ago",
  //     icon: Award,
  //   },
  // ];

  // const recommendations = [
  //   {
  //     name: "FAST-NUCES Islamabad",
  //     type: "Target",
  //     match: "92%",
  //     image: "https://picsum.photos/seed/fast/400/300",
  //   },
  //   {
  //     name: "NUST Islamabad",
  //     type: "Reach",
  //     match: "85%",
  //     image: "https://picsum.photos/seed/nust/400/300",
  //   },
  //   {
  //     name: "COMSATS Islamabad",
  //     type: "Safety",
  //     match: "98%",
  //     image: "https://picsum.photos/seed/comsats/400/300",
  //   },
  // ];

  const getEligibilityBadge = (fsc) => {
    if (!fsc)
      return {
        text: "Add FSC Marks",
        color: "bg-neutral-100 text-neutral-600",
      };
    if (fsc >= 90)
      return {
        text: "Excellent Standing",
        color: "bg-success-100 text-success-700",
      };
    if (fsc >= 80)
      return {
        text: "Great Standing",
        color: "bg-primary-100 text-primary-700",
      };
    if (fsc >= 70)
      return { text: "Good Standing", color: "bg-accent-100 text-accent-700" };
    return { text: "Keep Improving", color: "bg-neutral-100 text-neutral-600" };
  };

  const eligibility = getEligibilityBadge(user?.fsc_percentage);

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-blue-400 from-primary-600 via-primary-700 to-primary-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern-dots opacity-10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-primary-100 text-body-lg mb-2">{greeting},</p>
              <h1 className="text-display-lg text-white mb-4">
                {user?.full_name || "Student"}
              </h1>
              <div className="flex items-center gap-3">
                <div
                  className={`px-4 py-2 rounded-full text-body-sm font-semibold ${eligibility.color}`}
                >
                  {eligibility.text}
                </div>
                {user?.fsc_percentage && (
                  <div className="px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-body-sm font-semibold">
                    FSC: {user.fsc_percentage}%
                  </div>
                )}
              </div>
            </div>
            <div className="hidden md:block">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm flex items-center justify-center shadow-lifted">
                <GraduationCap className="w-12 h-12 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats Grid */}

        {/* Quick Actions */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-heading-lg text-primary-900">Quick Actions</h2>
            <Sparkles className="w-6 h-6 text-accent-500" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Link key={index} to={action.link}>
                  <div className="card-feature group cursor-pointer">
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${
                        action.color === "primary"
                          ? "from-primary-500 to-primary-700"
                          : "from-accent-500 to-accent-600"
                      } flex items-center justify-center mb-6 shadow-soft group-hover:scale-110 transition-transform`}
                    >
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-heading-sm text-primary-900 mb-2">
                      {action.title}
                    </h3>
                    <p className="text-body-md text-neutral-600 mb-4">
                      {action.description}
                    </p>
                    <div className="flex items-center text-primary-600 font-semibold text-body-sm group-hover:gap-2 transition-all">
                      Get Started
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

// export default DashboardModern;
