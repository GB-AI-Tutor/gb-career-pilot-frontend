import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Compass, Sparkles } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden" 
         style={{ background: 'linear-gradient(135deg, #FF6B6B 0%, #FFB88C 50%, #FFE66D 100%)' }}>
      
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="blob-float absolute top-20 left-20 w-96 h-96 rounded-full opacity-20"
             style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 70%)', animation: 'blob-float 20s ease-in-out infinite' }} />
        <div className="blob-float absolute bottom-20 right-20 w-80 h-80 rounded-full opacity-20"
             style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)', animationDelay: '-10s', animation: 'blob-float 20s ease-in-out infinite' }} />
      </div>

      <div className="text-center relative z-10">
        {/* Floating compass icon */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-white/40 rounded-full blur-2xl" style={{ animation: 'float 3s ease-in-out infinite' }} />
            <div className="relative p-8 bg-white/90 backdrop-blur-md rounded-full shadow-2xl border-4 border-white/50" 
                 style={{ animation: 'float 3s ease-in-out infinite' }}>
              <Compass className="w-20 h-20 text-[#FF6B6B]" strokeWidth={2.5} style={{ animation: 'spin 10s linear infinite' }} />
            </div>
            <Sparkles className="absolute -top-2 -right-2 w-10 h-10 text-white" style={{ animation: 'float 2s ease-in-out infinite 0.5s' }} />
          </div>
        </div>

        {/* 404 Text */}
        <h1 className="text-9xl font-black text-white mb-4" 
            style={{ fontFamily: 'Outfit, sans-serif', textShadow: '4px 4px 8px rgba(0,0,0,0.2)' }}>
          404
        </h1>
        
        {/* Message */}
        <p className="text-3xl font-bold text-white mb-3" 
           style={{ fontFamily: 'Outfit, sans-serif', textShadow: '2px 2px 4px rgba(0,0,0,0.15)' }}>
          Oops! Lost in Space
        </p>
        <p className="text-xl text-white/90 mb-12 max-w-md mx-auto" 
           style={{ fontFamily: 'Manrope, sans-serif', textShadow: '1px 1px 2px rgba(0,0,0,0.1)' }}>
          The page you're looking for doesn't exist. Let's get you back on track!
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link to="/">
            <button className="flex items-center gap-2 px-8 py-4 bg-white text-[#FF6B6B] font-bold rounded-2xl shadow-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:scale-105"
                    style={{ fontFamily: 'Outfit, sans-serif' }}>
              <Home className="w-5 h-5" />
              Back to Home
            </button>
          </Link>
          <Link to="/dashboard">
            <button className="flex items-center gap-2 px-8 py-4 bg-[#2C3E50] text-white font-bold rounded-2xl shadow-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:scale-105"
                    style={{ fontFamily: 'Outfit, sans-serif' }}>
              <ArrowLeft className="w-5 h-5" />
              Go to Dashboard
            </button>
          </Link>
        </div>

        {/* Fun note */}
        <p className="text-sm text-white/70 mt-12 italic" style={{ fontFamily: 'Manrope, sans-serif' }}>
          "Not all who wander are lost... but you might be." - J.R.R. Tolkien (probably)
        </p>
      </div>
    </div>
  );
};

export default NotFound;
