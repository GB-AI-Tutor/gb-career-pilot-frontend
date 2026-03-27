import { useEffect, useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../../api/auth';
import { CheckCircle, XCircle, Mail, Loader2, Sparkles } from 'lucide-react';

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [status, setStatus] = useState(token ? 'verifying' : 'error'); // verifying, success, error
  const [message, setMessage] = useState(token ? '' : 'No verification token provided');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      return;
    }

    let redirectTimeout;

    const verifyEmail = async () => {
      try {
        const response = await authAPI.verifyEmail(token);
        setStatus('success');
        setMessage(response.message || 'Email verified successfully!');
        
        // Redirect to login after 3 seconds
        redirectTimeout = setTimeout(() => {
          navigate('/login');
        }, 3000);
      } catch (error) {
        setStatus('error');
        setMessage(
          error.response?.data?.detail || 
          'Email verification failed. The link may be expired or invalid.'
        );
      }
    };

    verifyEmail();

    return () => {
      if (redirectTimeout) {
        clearTimeout(redirectTimeout);
      }
    };
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden" 
         style={{ background: 'linear-gradient(135deg, #FFE66D 0%, #FFB88C 50%, #4ECDC4 100%)' }}>
      
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="blob-float absolute -top-20 -left-20 w-96 h-96 rounded-full opacity-20"
             style={{ background: 'radial-gradient(circle, rgba(255,107,107,0.3) 0%, transparent 70%)', animation: 'blob-float 20s ease-in-out infinite' }} />
        <div className="blob-float absolute -bottom-20 -right-20 w-96 h-96 rounded-full opacity-20"
             style={{ background: 'radial-gradient(circle, rgba(78,205,196,0.3) 0%, transparent 70%)', animationDelay: '-7s', animation: 'blob-float 20s ease-in-out infinite' }} />
      </div>

      <div className="max-w-md w-full relative z-10">
        {/* Floating mail icon */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-white/40 rounded-full blur-xl" style={{ animation: 'float 3s ease-in-out infinite' }} />
            <div className="relative bg-white/90 backdrop-blur-md p-6 rounded-full shadow-xl border border-white/50" 
                 style={{ animation: 'float 3s ease-in-out infinite' }}>
              <Mail className="w-12 h-12 text-[#FF6B6B]" strokeWidth={2.5} />
            </div>
          </div>
        </div>

        {/* Main card */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 text-center">
          {status === 'verifying' && (
            <>
              <div className="inline-flex items-center justify-center mb-6">
                <Loader2 className="w-12 h-12 text-[#FF6B6B] animate-spin" strokeWidth={2.5} />
              </div>
              <h2 className="text-3xl font-bold mb-3 text-[#2C3E50]" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Verifying Your Email
              </h2>
              <p className="text-lg text-[#2C3E50]/70" style={{ fontFamily: 'Manrope, sans-serif' }}>
                Please wait while we verify your email address...
              </p>
              <div className="mt-8 flex justify-center gap-2">
                <div className="w-2 h-2 bg-[#FF6B6B] rounded-full" style={{ animation: 'float 1s ease-in-out infinite' }} />
                <div className="w-2 h-2 bg-[#FFB88C] rounded-full" style={{ animation: 'float 1s ease-in-out infinite 0.2s' }} />
                <div className="w-2 h-2 bg-[#4ECDC4] rounded-full" style={{ animation: 'float 1s ease-in-out infinite 0.4s' }} />
              </div>
            </>
          )}

          {status === 'success' && (
            <>
              <div className="inline-flex items-center justify-center mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-green-400/30 rounded-full animate-ping" />
                  <div className="relative w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-xl">
                    <CheckCircle className="w-14 h-14 text-white" strokeWidth={2.5} />
                  </div>
                  <Sparkles className="absolute -top-2 -right-2 w-8 h-8 text-yellow-400" style={{ animation: 'float 2s ease-in-out infinite' }} />
                </div>
              </div>
              <h2 className="text-3xl font-bold mb-3 text-[#2C3E50]" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Email Verified! 🎉
              </h2>
              <p className="text-lg text-[#2C3E50]/80 mb-6" style={{ fontFamily: 'Manrope, sans-serif' }}>
                {message}
              </p>
              <p className="text-sm text-[#2C3E50]/60 mb-6 italic">
                Redirecting to login page in 3 seconds...
              </p>
              <Link to="/login">
                <button className="w-full px-6 py-3.5 bg-gradient-to-r from-[#FF6B6B] to-[#FFB88C] text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                        style={{ fontFamily: 'Outfit, sans-serif' }}>
                  Go to Login Now →
                </button>
              </Link>
            </>
          )}

          {status === 'error' && (
            <>
              <div className="inline-flex items-center justify-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-red-400 to-rose-500 rounded-full flex items-center justify-center shadow-xl">
                  <XCircle className="w-14 h-14 text-white" strokeWidth={2.5} />
                </div>
              </div>
              <h2 className="text-3xl font-bold mb-3 text-[#2C3E50]" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Verification Failed
              </h2>
              <p className="text-lg text-[#2C3E50]/80 mb-8" style={{ fontFamily: 'Manrope, sans-serif' }}>
                {message}
              </p>
              <div className="space-y-3">
                <Link to="/register">
                  <button className="w-full px-6 py-3.5 bg-gradient-to-r from-[#FF6B6B] to-[#FFB88C] text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                          style={{ fontFamily: 'Outfit, sans-serif' }}>
                    Register Again
                  </button>
                </Link>
                <Link to="/login">
                  <button className="w-full px-6 py-3.5 bg-white text-[#FF6B6B] font-bold rounded-2xl border-2 border-[#FF6B6B] shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                          style={{ fontFamily: 'Outfit, sans-serif' }}>
                    Go to Login
                  </button>
                </Link>
              </div>
            </>
          )}
        </div>

        {/* Back to home link */}
        <div className="mt-8 text-center">
          <Link to="/" 
                className="inline-flex items-center gap-2 text-white/90 hover:text-white font-semibold transition-colors duration-200"
                style={{ fontFamily: 'Manrope, sans-serif', textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
