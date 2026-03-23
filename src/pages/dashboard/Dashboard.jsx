import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { 
  MessageCircle, 
  School, 
  Search, 
  User, 
  TrendingUp, 
  Award,
  Sparkles,
  Target,
  MapPin,
  GraduationCap
} from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Loader from '../../components/common/Loader';

const Dashboard = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  const quickActions = [
    {
      title: 'AI Career Chat',
      description: 'Get instant guidance from our AI counselor',
      icon: MessageCircle,
      link: '/chat',
      gradient: 'from-blue-500 to-cyan-500',
      iconBg: 'bg-blue-100 dark:bg-blue-900/30',
      iconColor: 'text-blue-600 dark:text-blue-400',
    },
    {
      title: 'Explore Universities',
      description: 'Browse and compare 100+ universities',
      icon: School,
      link: '/universities',
      gradient: 'from-purple-500 to-pink-500',
      iconBg: 'bg-purple-100 dark:bg-purple-900/30',
      iconColor: 'text-purple-600 dark:text-purple-400',
    },
    {
      title: 'Find Programs',
      description: 'Search programs with eligibility matching',
      icon: Search,
      link: '/programs',
      gradient: 'from-orange-500 to-red-500',
      iconBg: 'bg-orange-100 dark:bg-orange-900/30',
      iconColor: 'text-orange-600 dark:text-orange-400',
    },
    {
      title: 'Update Profile',
      description: 'Manage your info and preferences',
      icon: User,
      link: '/profile',
      gradient: 'from-green-500 to-emerald-500',
      iconBg: 'bg-green-100 dark:bg-green-900/30',
      iconColor: 'text-green-600 dark:text-green-400',
    },
  ];

  const getEligibilityMessage = (fsc) => {
    if (!fsc) return { text: 'Add your FSC marks to see eligibility', color: 'text-gray-600' };
    if (fsc >= 90) return { text: 'Excellent! Top universities await you 🌟', color: 'text-green-600' };
    if (fsc >= 80) return { text: 'Great marks! Many great options available', color: 'text-blue-600' };
    if (fsc >= 70) return { text: 'Good! You have solid opportunities', color: 'text-yellow-600' };
    return { text: 'Keep working! Many programs are still accessible', color: 'text-orange-600' };
  };

  const eligibility = getEligibilityMessage(user?.fsc_percentage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header with Gradient */}
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-8 md:p-12 mb-8 shadow-2xl animate-fade-in">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
          
          <div className="relative">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-8 h-8 text-yellow-300 animate-pulse" />
              <span className="text-blue-100 text-sm font-medium">Welcome back!</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Hey {user?.name || 'Student'}! 👋
            </h1>
            
            <p className="text-xl text-blue-100 mb-6">
              {eligibility.text}
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/chat">
                <Button variant="secondary" className="bg-white/10 backdrop-blur-md text-white border-white/30 hover:bg-white/20">
                  <Target className="w-4 h-4 mr-2" />
                  Start Chatting
                </Button>
              </Link>
              <Link to="/programs">
                <Button variant="secondary" className="bg-white/10 backdrop-blur-md text-white border-white/30 hover:bg-white/20">
                  <Target className="w-4 h-4 mr-2" />
                  Find Programs
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white border-0 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-white/20 backdrop-blur-md rounded-xl">
                <TrendingUp className="w-6 h-6" />
              </div>
              <Award className="w-12 h-12 opacity-20" />
            </div>
            <div className="text-3xl font-bold mb-1">
              {user?.fsc_percentage ? `${user.fsc_percentage}%` : 'Not Set'}
            </div>
            <div className="text-blue-100">FSC Percentage</div>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-pink-500 text-white border-0 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-white/20 backdrop-blur-md rounded-xl">
                <GraduationCap className="w-6 h-6" />
              </div>
              <School className="w-12 h-12 opacity-20" />
            </div>
            <div className="text-3xl font-bold mb-1">
              {user?.field_of_interest || 'Not Selected'}
            </div>
            <div className="text-purple-100">Field of Interest</div>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-red-500 text-white border-0 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-white/20 backdrop-blur-md rounded-xl">
                <MapPin className="w-6 h-6" />
              </div>
              <Target className="w-12 h-12 opacity-20" />
            </div>
            <div className="text-3xl font-bold mb-1">
              {user?.city || 'Not Set'}
            </div>
            <div className="text-orange-100">Your City</div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            Quick Actions
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                to={action.link}
                className="group animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Card className="h-full hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-2 bg-white dark:bg-gray-800 relative overflow-hidden">
                  {/* Gradient Overlay on Hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-0 group-hover:opacity-10 transition-opacity`}></div>
                  
                  <div className="relative">
                    <div className={`w-14 h-14 ${action.iconBg} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <action.icon className={`w-7 h-7 ${action.iconColor}`} />
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      {action.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {action.description}
                    </p>

                    <div className="mt-4 flex items-center text-sm font-medium text-purple-600 dark:text-purple-400 group-hover:translate-x-2 transition-transform">
                      Get Started
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Tips Section */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 border-2 border-blue-200 dark:border-blue-900 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-500 rounded-xl flex-shrink-0">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                Pro Tip for Students
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Start by chatting with our AI counselor to understand your options. Then explore universities 
                that match your FSC percentage. Don't forget to save your favorites! 🎯
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
