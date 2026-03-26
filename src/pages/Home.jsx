import { Link } from 'react-router-dom';
import { GraduationCap, Sparkles, Target, TrendingUp, MessageCircle, School, Award, ChevronRight, Sunrise, Zap, Heart } from 'lucide-react';
import Button from '../components/common/Button';

const Home = () => {
  const features = [
    {
      icon: MessageCircle,
      title: 'AI Career Counselor',
      description: 'Chat with our intelligent AI that understands Pakistani education system and guides you based on your FSC marks.',
      gradient: 'from-[#FF6B6B] to-[#FFB88C]',
      iconBg: 'bg-gradient-to-br from-[#FF6B6B] to-[#FFB88C]',
    },
    {
      icon: School,
      title: 'University Explorer',
      description: 'Browse 100+ universities across Pakistan. Compare rankings, fees, and facilities to find your perfect match.',
      gradient: 'from-[#4ECDC4] to-[#44A08D]',
      iconBg: 'bg-gradient-to-br from-[#4ECDC4] to-[#44A08D]',
    },
    {
      icon: Target,
      title: 'Smart Program Matching',
      description: 'Get eligibility predictions for programs. Know which are Safety, Target, or Reach based on your FSC percentage.',
      gradient: 'from-[#FFE66D] to-[#FFB88C]',
      iconBg: 'bg-gradient-to-br from-[#FFE66D] to-[#FFB88C]',
    },
    {
      icon: TrendingUp,
      title: 'Real FSC Analysis',
      description: 'Upload your FSC marks and get instant analysis. Understand your chances at top universities and programs.',
      gradient: 'from-[#FF6B6B] to-[#4ECDC4]',
      iconBg: 'bg-gradient-to-br from-[#FF6B6B] to-[#4ECDC4]',
    },
  ];

  const steps = [
    { number: '01', title: 'Create Account', desc: 'Sign up in seconds with your email' },
    { number: '02', title: 'Add Your Marks', desc: 'Enter your FSC percentage and field' },
    { number: '03', title: 'Get Guidance', desc: 'Chat with AI, explore universities, find programs' },
    { number: '04', title: 'Make Decision', desc: 'Apply with confidence to the right places' },
  ];

  return (
    <div className="min-h-screen bg-[#FFF9F0]">
      {/* Hero Section - Sunrise Theme */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#FF6B6B] via-[#FFB88C] to-[#FFE66D] min-h-[90vh] flex items-center">
        {/* Animated Organic Blobs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-96 h-96 bg-white/10 rounded-full blob animate-blob-float"></div>
          <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-[#4ECDC4]/20 rounded-full blob-2 animate-blob-float" style={{ animationDelay: '5s' }}></div>
          <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-[#FFE66D]/20 rounded-full blob animate-blob-float" style={{ animationDelay: '10s' }}></div>
        </div>

        {/* Floating Decorative Elements */}
        <div className="absolute top-20 right-20 animate-float">
          <Sunrise className="w-16 h-16 text-white/30" />
        </div>
        <div className="absolute bottom-32 left-32 animate-float" style={{ animationDelay: '1s' }}>
          <Sparkles className="w-12 h-12 text-[#FFE66D]/50" />
        </div>
        <div className="absolute top-1/3 right-1/4 animate-float" style={{ animationDelay: '2s' }}>
          <Zap className="w-10 h-10 text-white/40" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            {/* Floating Badge */}
            <div className="inline-flex items-center gap-2 px-6 py-3 glass rounded-full mb-8 animate-fade-in">
              <Sparkles className="w-5 h-5 text-[#FFE66D]" />
              <span className="text-sm font-semibold text-white">AI-Powered Career Guidance for Pakistan</span>
            </div>

            {/* Main Headline - Bold & Energetic */}
            <h1 className="text-6xl md:text-8xl font-black text-white mb-6 animate-slide-up leading-tight">
              Your <span className="italic">Bright</span> Future
              <span className="block mt-2 text-[#FFE66D] drop-shadow-lg">
                Starts Here ✨
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-white/90 font-medium mb-12 max-w-3xl mx-auto animate-slide-up leading-relaxed" style={{ animationDelay: '0.1s' }}>
              Navigate Pakistan's university landscape with confidence. Get personalized AI guidance based on your FSC marks and career dreams.
            </p>

            {/* CTA Buttons - Bold & Eye-catching */}
            <div className="flex flex-col sm:flex-row gap-5 justify-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <Link to="/register">
                <button className="group px-10 py-5 bg-white text-[#FF6B6B] rounded-2xl font-bold text-lg shadow-2xl hover:scale-105 hover:shadow-[0_20px_50px_rgba(255,107,107,0.4)] transition-all duration-300 flex items-center gap-3">
                  <GraduationCap className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                  Start Your Journey
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <Link to="/login">
                <button className="px-10 py-5 glass text-white rounded-2xl font-bold text-lg hover:bg-white/20 transition-all duration-300">
                  Sign In
                </button>
              </Link>
            </div>

            {/* Stats - Playful floating cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-20 max-w-4xl mx-auto animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="glass rounded-3xl p-8 hover-lift">
                <div className="text-5xl font-black text-white mb-2">100+</div>
                <div className="text-white/80 font-semibold">Universities Listed</div>
                <School className="w-8 h-8 text-white/50 mt-3" />
              </div>
              <div className="glass rounded-3xl p-8 hover-lift" style={{ animationDelay: '0.1s' }}>
                <div className="text-5xl font-black text-white mb-2">500+</div>
                <div className="text-white/80 font-semibold">Programs Available</div>
                <Target className="w-8 h-8 text-white/50 mt-3" />
              </div>
              <div className="glass rounded-3xl p-8 hover-lift" style={{ animationDelay: '0.2s' }}>
                <div className="text-5xl font-black text-white mb-2">24/7</div>
                <div className="text-white/80 font-semibold">AI Support</div>
                <MessageCircle className="w-8 h-8 text-white/50 mt-3" />
              </div>
            </div>
          </div>
        </div>

        {/* Organic Wave Separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-24 md:h-32" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#FFF9F0"></path>
          </svg>
        </div>
      </section>

      {/* Features Section - Organic Cards */}
      <section className="py-24 bg-[#FFF9F0] relative">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#FFE66D]/10 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-20">
            <div className="inline-block px-5 py-2 bg-[#4ECDC4]/10 rounded-full mb-4">
              <span className="text-[#4ECDC4] font-bold text-sm uppercase tracking-wider">Features</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-[#2C3E50] mb-6 leading-tight">
              Everything You Need<br/>
              <span className="text-[#FF6B6B]">in One Place</span>
            </h2>
            <p className="text-xl text-[#2C3E50]/70 max-w-2xl mx-auto font-medium">
              From choosing your field to getting admission - we've got your back every step of the way
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-[2rem] p-10 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 animate-scale-in overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Decorative blob background */}
                <div className={`absolute -top-10 -right-10 w-40 h-40 ${feature.iconBg} opacity-10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700`}></div>
                
                {/* Icon - Floating effect */}
                <div className={`relative w-20 h-20 ${feature.iconBg} rounded-3xl flex items-center justify-center mb-6 group-hover:rotate-6 group-hover:scale-110 transition-all duration-300 shadow-lg`}>
                  <feature.icon className="w-10 h-10 text-white" strokeWidth={2.5} />
                </div>

                <h3 className="text-2xl font-black text-[#2C3E50] mb-4 group-hover:text-[#FF6B6B] transition-colors">
                  {feature.title}
                </h3>
                <p className="text-[#2C3E50]/70 text-lg leading-relaxed font-medium">
                  {feature.description}
                </p>

                {/* Animated underline */}
                <div className={`mt-6 h-1 w-0 group-hover:w-full ${feature.iconBg} rounded-full transition-all duration-500`}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section - Energetic Timeline */}
      <section className="py-24 bg-gradient-to-br from-[#4ECDC4]/10 via-[#FFF9F0] to-[#FFE66D]/10 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#FF6B6B]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-[#4ECDC4]/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-20">
            <div className="inline-block px-5 py-2 bg-[#FFE66D]/20 rounded-full mb-4">
              <span className="text-[#FF6B6B] font-bold text-sm uppercase tracking-wider">Simple Process</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-[#2C3E50] mb-6">
              How It <span className="text-[#4ECDC4] italic">Works</span>
            </h2>
            <p className="text-xl text-[#2C3E50]/70 font-medium">
              Getting started is super simple - just 4 easy steps
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <div key={index} className="relative animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                {/* Connecting line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 -right-3 w-6 h-1 bg-gradient-to-r from-[#FF6B6B] to-[#FFB88C] z-0"></div>
                )}
                
                {/* Step Card */}
                <div className="relative bg-white rounded-[2rem] p-8 hover-lift group">
                  {/* Step Number - Large and Bold */}
                  <div className="absolute -top-6 -left-6 w-16 h-16 bg-gradient-to-br from-[#FF6B6B] to-[#FFB88C] rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                    <span className="text-2xl font-black text-white">{step.number}</span>
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="text-2xl font-black text-[#2C3E50] mb-3 group-hover:text-[#FF6B6B] transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-[#2C3E50]/70 font-medium leading-relaxed">
                      {step.desc}
                    </p>
                  </div>

                  {/* Decorative corner */}
                  <div className="absolute bottom-4 right-4 w-8 h-8 border-r-4 border-b-4 border-[#FFE66D] rounded-br-xl opacity-30 group-hover:opacity-100 transition-opacity"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Vibrant & Bold */}
      <section className="py-32 bg-gradient-to-br from-[#FF6B6B] via-[#FFB88C] to-[#4ECDC4] relative overflow-hidden">
        {/* Animated background blobs */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-96 h-96 bg-white/10 rounded-full blob animate-blob-float blur-2xl"></div>
          <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-[#FFE66D]/20 rounded-full blob-2 animate-blob-float blur-2xl" style={{ animationDelay: '5s' }}></div>
        </div>
        
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Floating icon */}
          <div className="inline-flex items-center justify-center w-24 h-24 bg-white/20 backdrop-blur-md rounded-3xl mb-10 animate-float">
            <Heart className="w-12 h-12 text-white" fill="white" />
          </div>
          
          <h2 className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight">
            Ready to Find Your<br/>
            <span className="text-[#FFE66D] drop-shadow-lg">Dream University?</span>
          </h2>
          <p className="text-2xl text-white/90 font-semibold mb-12 max-w-3xl mx-auto leading-relaxed">
            Join thousands of Pakistani students making smarter university decisions with AI guidance
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center mb-10">
            <Link to="/register">
              <button className="group px-12 py-6 bg-white text-[#FF6B6B] rounded-2xl font-black text-xl shadow-2xl hover:scale-105 hover:shadow-[0_25px_60px_rgba(255,255,255,0.3)] transition-all duration-300 flex items-center gap-3">
                <GraduationCap className="w-7 h-7 group-hover:rotate-12 transition-transform" />
                Get Started for Free
                <Sparkles className="w-6 h-6 group-hover:scale-125 transition-transform" />
              </button>
            </Link>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-8 text-white/80 text-sm font-bold">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#FFE66D] rounded-full"></div>
              No credit card required
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#FFE66D] rounded-full"></div>
              Free forever
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#FFE66D] rounded-full"></div>
              Instant access
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
