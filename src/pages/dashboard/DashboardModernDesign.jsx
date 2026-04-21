import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import {
  MessageCircle,
  School,
  GraduationCap,
  ArrowRight,
  Clock,
  CheckCircle2,
  Brain,
  Lightbulb,
  Calendar,
  Route as RouteIcon,
  Brain as BrainIcon,
  MessageCircle as ChatIcon,
  Zap,
} from "lucide-react";
import "../../styles/design-system.css";

const DashboardModernDesign = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8f9fa] font-body text-[#191c1d] flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full animate-float mx-auto mb-4 flex items-center justify-center shadow-lg">
            <Brain className="w-10 h-10 text-white animate-pulse" />
          </div>
          <p className="text-heading-md text-[#002147]">
            Loading your dashboard...
          </p>
        </div>
      </div>
    );
  }

  // Get completion percentage (placeholder)
  const readinessPercentage = user?.fsc_percentage
    ? Math.min(user.fsc_percentage, 100)
    : 0;

  return (
    <div className="bg-[#f8f9fa] font-body text-[#191c1d]">
      {/* Main Content */}
      <main className="py-8 md:py-10 px-4 sm:px-6 min-h-screen">
        <div className="max-w-6xl mx-auto space-y-10">
          {/* Welcome Section */}
          <section className="flex flex-col md:flex-row justify-between items-end gap-6">
            <div className="space-y-2">
              <h2 className="font-headline font-extrabold text-4xl lg:text-5xl text-[#002147] tracking-tighter">
                Welcome back, {user?.full_name?.split(" ")[0] || "Student"}!
              </h2>
              <p className="text-[#44474e] text-lg max-w-xl">
                Your career readiness is {Math.ceil(readinessPercentage)}%
                complete. Continue building your journey.
              </p>
            </div>
            <div className="flex gap-4">
              <Link
                to="/chat"
                className="bg-gradient-to-br from-[#002147] to-[#000a1e] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:opacity-90 transition-all shadow-md"
              >
                <Zap className="w-5 h-5" />
                Start AI Coaching
              </Link>
            </div>
          </section>

          {/* Asymmetric Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Progress Card */}
              <div className="bg-white p-8 rounded-2xl shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-headline font-bold text-xl text-[#002147]">
                    Career Readiness
                  </h3>
                  <span className="bg-[#83fba5] text-[#00743a] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    On Track
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="relative h-4 bg-[#e7e8e9] rounded-full overflow-hidden mb-6">
                  <div
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#002147] to-[#006d36] w-full rounded-full transition-all"
                    style={{ width: `${readinessPercentage}%` }}
                  />
                </div>

                {/* Progress Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <span className="text-xs text-[#44474e] uppercase font-bold tracking-widest">
                      Profile Status
                    </span>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-[#006d36]" />
                      <span className="font-bold text-[#002147]">
                        {user?.email ? "100% Verified" : "Incomplete"}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <span className="text-xs text-[#44474e] uppercase font-bold tracking-widest">
                      Current Stage
                    </span>
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-[#aec7f6]" />
                      <span className="font-bold text-[#002147]">
                        Stage {Math.ceil(readinessPercentage / 20)} of 5
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <span className="text-xs text-[#44474e] uppercase font-bold tracking-widest">
                      AI Guidance
                    </span>
                    <div className="flex items-center gap-2 text-[#006d36]">
                      <MessageCircle className="w-5 h-5" />
                      <Link
                        to="/chat"
                        className="font-bold underline hover:no-underline"
                      >
                        Start Chatting
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recommended Universities */}
              <div className="space-y-6">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-headline font-bold text-2xl text-[#002147]">
                    AI Recommended Universities
                  </h3>
                  <Link
                    to="/universities"
                    className="text-sm font-bold text-[#006d36] hover:underline"
                  >
                    View All Matches
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* University Card 1 */}
                  <div className="group relative overflow-hidden rounded-2xl bg-white transition-all hover:shadow-lg">
                    <div className="h-48 relative overflow-hidden bg-gradient-to-br from-[#002147]/20 to-[#006d36]/20 flex items-center justify-center">
                      <div className="text-center">
                        <GraduationCap className="w-16 h-16 text-[#002147]/30 mx-auto mb-2" />
                        <p className="text-[#44474e]/70 text-sm">
                          Featured University
                        </p>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-headline font-bold text-lg text-[#002147]">
                          NUST Islamabad
                        </h4>
                        <span className="text-xs font-bold bg-[#83fba5] text-[#00743a] px-2 py-1 rounded-full">
                          98% Match
                        </span>
                      </div>
                      <p className="text-[#44474e] text-sm mb-4">
                        Islamabad, Pakistan • Engineering
                      </p>
                      <div className="flex gap-2">
                        <span className="px-2 py-1 bg-[#e7e8e9] rounded text-[10px] font-bold text-[#44474e] uppercase">
                          Top 100 Global
                        </span>
                        <span className="px-2 py-1 bg-[#e7e8e9] rounded text-[10px] font-bold text-[#44474e] uppercase">
                          Safety Tier
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* University Card 2 */}
                  <div className="group relative overflow-hidden rounded-2xl bg-white transition-all hover:shadow-lg">
                    <div className="h-48 relative overflow-hidden bg-gradient-to-br from-[#ffdbcb]/30 to-[#000a1e]/20 flex items-center justify-center">
                      <div className="text-center">
                        <School className="w-16 h-16 text-[#aec7f6]/70 mx-auto mb-2" />
                        <p className="text-[#44474e]/70 text-sm">
                          Featured University
                        </p>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-headline font-bold text-lg text-[#002147]">
                          UET Lahore
                        </h4>
                        <span className="text-xs font-bold bg-[#83fba5] text-[#00743a] px-2 py-1 rounded-full">
                          92% Match
                        </span>
                      </div>
                      <p className="text-[#44474e] text-sm mb-4">
                        Lahore, Pakistan • Mechanical
                      </p>
                      <div className="flex gap-2">
                        <span className="px-2 py-1 bg-[#e7e8e9] rounded text-[10px] font-bold text-[#44474e] uppercase">
                          Industry Ties
                        </span>
                        <span className="px-2 py-1 bg-[#e7e8e9] rounded text-[10px] font-bold text-[#44474e] uppercase">
                          Target Tier
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-8">
              {/* Upcoming Deadlines */}
              <div className="bg-[#002147] text-white p-8 rounded-2xl shadow-lg relative overflow-hidden">
                <div className="absolute -right-8 -top-8 w-32 h-32 bg-[#006d36] opacity-20 rounded-full blur-3xl"></div>
                <h3 className="font-headline font-bold text-xl mb-6 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[#83fba5]" />
                  Upcoming Deadlines
                </h3>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-white/10 rounded-xl flex flex-col items-center justify-center border border-white/5">
                      <span className="text-[10px] uppercase font-bold">
                        Oct
                      </span>
                      <span className="text-lg font-bold">24</span>
                    </div>
                    <div>
                      <p className="font-bold text-[#83fba5] leading-tight">
                        Commonwealth Scholarship
                      </p>
                      <p className="text-xs text-[#aec7f6] mt-1">
                        Full funding application
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-white/10 rounded-xl flex flex-col items-center justify-center border border-white/5">
                      <span className="text-[10px] uppercase font-bold">
                        Nov
                      </span>
                      <span className="text-lg font-bold">02</span>
                    </div>
                    <div>
                      <p className="font-bold text-white leading-tight">
                        NUST Entrance Test
                      </p>
                      <p className="text-xs text-[#aec7f6] mt-1">
                        Early bird registration
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 opacity-50">
                    <div className="flex-shrink-0 w-12 h-12 bg-white/10 rounded-xl flex flex-col items-center justify-center border border-white/5">
                      <span className="text-[10px] uppercase font-bold">
                        Dec
                      </span>
                      <span className="text-lg font-bold">15</span>
                    </div>
                    <div>
                      <p className="font-bold text-white/70 leading-tight">
                        UET General Admission
                      </p>
                      <p className="text-xs text-[#aec7f6] mt-1">
                        Online submission
                      </p>
                    </div>
                  </div>
                </div>
                <button className="w-full mt-8 py-3 bg-gradient-to-br from-[#002147] to-[#000a1e] text-white font-bold rounded-xl transition-all hover:opacity-90">
                  Sync to Calendar
                </button>
              </div>

              {/* Quick Links */}
              <div className="bg-[#e7e8e9] p-1 rounded-2xl">
                <div className="p-6">
                  <h3 className="font-headline font-bold text-lg text-[#002147] mb-4">
                    Support & Tools
                  </h3>
                  <div className="space-y-2">
                    <Link
                      to="/chat"
                      className="flex items-center justify-between p-4 bg-white rounded-xl group transition-all hover:bg-[#83fba5]/10"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-[#f3f4f5] rounded-lg flex items-center justify-center">
                          <BrainIcon className="w-5 h-5 text-[#006d36]" />
                        </div>
                        <span className="font-bold text-sm text-[#002147]">
                          AI Career Coach
                        </span>
                      </div>
                      <ArrowRight className="w-5 h-5 text-[#44474e]/50 group-hover:text-[#006d36] transition-colors" />
                    </Link>
                    <Link
                      to="/universities"
                      className="flex items-center justify-between p-4 bg-white rounded-xl group transition-all hover:bg-[#83fba5]/10"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-[#f3f4f5] rounded-lg flex items-center justify-center">
                          <RouteIcon className="w-5 h-5 text-[#006d36]" />
                        </div>
                        <span className="font-bold text-sm text-[#002147]">
                          Explore Universities
                        </span>
                      </div>
                      <ArrowRight className="w-5 h-5 text-[#44474e]/50 group-hover:text-[#006d36] transition-colors" />
                    </Link>
                    <Link
                      to="/programs"
                      className="flex items-center justify-between p-4 bg-white rounded-xl group transition-all hover:bg-[#83fba5]/10"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-[#f3f4f5] rounded-lg flex items-center justify-center">
                          <ChatIcon className="w-5 h-5 text-[#006d36]" />
                        </div>
                        <span className="font-bold text-sm text-[#002147]">
                          Find Programs
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-[#006d36] rounded-full"></span>
                        <ArrowRight className="w-5 h-5 text-[#44474e]/50 group-hover:text-[#006d36] transition-colors" />
                      </div>
                    </Link>
                  </div>
                </div>
              </div>

              {/* AI Tip Card */}
              <div className="bg-[#83fba5]/40 p-6 rounded-2xl shadow-sm">
                <div className="flex gap-4">
                  <Lightbulb className="w-6 h-6 text-[#006d36] flex-shrink-0 mt-0.5" />
                  <div className="space-y-2">
                    <h4 className="font-bold text-[#00743a]">Pro Tip</h4>
                    <p className="text-sm text-[#00743a]/80 leading-relaxed">
                      Students who explore 10+ universities are 3x more likely
                      to find their perfect match. Start exploring now!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-12 bg-[#002147]">
        <div className="flex flex-col md:flex-row justify-between items-center px-12 gap-8 max-w-7xl mx-auto">
          <div className="space-y-2">
            <span className="font-headline font-black text-[#83fba5] text-xl">
              GB Career Pilot
            </span>
            <p className="text-[#aec7f6] text-xs uppercase tracking-widest">
              © 2024 GB Career Pilot. Empowering Pakistan's Future Leaders.
            </p>
          </div>
          <nav className="flex flex-wrap justify-center gap-6">
            <Link
              to="#"
              className="text-[#aec7f6] text-xs uppercase tracking-widest hover:text-[#83fba5] transition-colors"
            >
              Academic Resources
            </Link>
            <Link
              to="#"
              className="text-[#aec7f6] text-xs uppercase tracking-widest hover:text-[#83fba5] transition-colors"
            >
              Career Blog
            </Link>
            <Link
              to="#"
              className="text-[#aec7f6] text-xs uppercase tracking-widest hover:text-[#83fba5] transition-colors"
            >
              Student Support
            </Link>
            <Link
              to="#"
              className="text-[#aec7f6] text-xs uppercase tracking-widest hover:text-[#83fba5] transition-colors"
            >
              Privacy Policy
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default DashboardModernDesign;
