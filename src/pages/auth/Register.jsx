import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { UserPlus, Sparkles, ArrowRight, Mail, Lock, User, Phone, MapPin, GraduationCap, BookOpen, Check } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password_hash: '',
    full_name: '',
    phone: '',
    city: '',
    field_of_interest: 'Computer Science',
    fsc_percentage: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await registerUser({
        ...formData,
        fsc_percentage: parseFloat(formData.fsc_percentage),
      });
      setSuccess(true);
      setTimeout(() => navigate('/login'), 3000);
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#4ECDC4] via-[#44A08D] to-[#FFE66D] flex items-center justify-center px-4 relative overflow-hidden">
        {/* Animated Blobs */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-white/10 rounded-full blob animate-blob-float"></div>
        </div>

        <div className="bg-white rounded-[2rem] p-12 shadow-2xl max-w-md w-full text-center relative z-10 animate-scale-in">
          <div className="w-24 h-24 bg-gradient-to-br from-[#4ECDC4] to-[#44A08D] rounded-full flex items-center justify-center mx-auto mb-6 animate-float">
            <Check className="w-12 h-12 text-white" strokeWidth={3} />
          </div>
          <h2 className="text-4xl font-black text-[#2C3E50] mb-4">
            You're <span className="text-[#4ECDC4] italic">In!</span>
          </h2>
          <p className="text-lg text-[#2C3E50]/70 font-medium mb-4">
            Please check your email to verify your account.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FFE66D]/20 rounded-full">
            <div className="w-2 h-2 bg-[#FFE66D] rounded-full animate-pulse"></div>
            <span className="text-sm font-bold text-[#2C3E50]">Redirecting to login...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4ECDC4] via-[#44A08D] to-[#FFE66D] flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Animated Blobs */}
      <div className="absolute inset-0">
        <div className="absolute top-10 right-20 w-96 h-96 bg-white/10 rounded-full blob animate-blob-float"></div>
        <div className="absolute bottom-20 left-20 w-[500px] h-[500px] bg-[#FF6B6B]/20 rounded-full blob-2 animate-blob-float" style={{ animationDelay: '7s' }}></div>
      </div>

      <div className="max-w-3xl w-full relative z-10">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 glass rounded-3xl mb-6 animate-float">
            <UserPlus className="w-10 h-10 text-white" strokeWidth={2.5} />
          </div>
          <h1 className="text-5xl font-black text-white mb-3 leading-tight">
            Join <span className="text-[#FFE66D] italic">The Journey!</span>
          </h1>
          <p className="text-xl text-white/90 font-medium">
            Create your account and find your perfect university
          </p>
        </div>

        {/* Registration Card */}
        <div className="bg-white rounded-[2rem] p-8 shadow-2xl animate-scale-in" style={{ animationDelay: '0.1s' }}>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name & Email */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-[#2C3E50] mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4ECDC4]" />
                  <input
                    type="text"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-[#4ECDC4] focus:ring-4 focus:ring-[#4ECDC4]/10 transition-all text-[#2C3E50] font-medium placeholder:text-gray-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-[#2C3E50] mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4ECDC4]" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-[#4ECDC4] focus:ring-4 focus:ring-[#4ECDC4]/10 transition-all text-[#2C3E50] font-medium placeholder:text-gray-400"
                  />
                </div>
              </div>
            </div>

            {/* Password & Phone */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-[#2C3E50] mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4ECDC4]" />
                  <input
                    type="password"
                    name="password_hash"
                    value={formData.password_hash}
                    onChange={handleChange}
                    placeholder="••••••••"
                    required
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-[#4ECDC4] focus:ring-4 focus:ring-[#4ECDC4]/10 transition-all text-[#2C3E50] font-medium placeholder:text-gray-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-[#2C3E50] mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4ECDC4]" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="03001234567"
                    maxLength={11}
                    required
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-[#4ECDC4] focus:ring-4 focus:ring-[#4ECDC4]/10 transition-all text-[#2C3E50] font-medium placeholder:text-gray-400"
                  />
                </div>
              </div>
            </div>

            {/* City & Field */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-[#2C3E50] mb-2">
                  City
                </label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4ECDC4]" />
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Lahore"
                    required
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-[#4ECDC4] focus:ring-4 focus:ring-[#4ECDC4]/10 transition-all text-[#2C3E50] font-medium placeholder:text-gray-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-[#2C3E50] mb-2">
                  Field of Interest
                </label>
                <div className="relative">
                  <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4ECDC4]" />
                  <select
                    name="field_of_interest"
                    value={formData.field_of_interest}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-[#4ECDC4] focus:ring-4 focus:ring-[#4ECDC4]/10 transition-all text-[#2C3E50] font-medium appearance-none bg-white cursor-pointer"
                  >
                    <option value="Computer Science">Computer Science</option>
                    <option value="Medical">Medical</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Business">Business</option>
                    <option value="Arts & Humanities">Arts & Humanities</option>
                  </select>
                </div>
              </div>
            </div>

            {/* FSC Percentage */}
            <div>
              <label className="block text-sm font-bold text-[#2C3E50] mb-2">
                FSC Percentage
              </label>
              <div className="relative">
                <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4ECDC4]" />
                <input
                  type="number"
                  name="fsc_percentage"
                  value={formData.fsc_percentage}
                  onChange={handleChange}
                  placeholder="85.50"
                  min="0"
                  max="100"
                  step="0.01"
                  required
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-[#4ECDC4] focus:ring-4 focus:ring-[#4ECDC4]/10 transition-all text-[#2C3E50] font-medium placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#4ECDC4] to-[#44A08D] text-white py-4 rounded-2xl font-black text-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                'Creating Account...'
              ) : (
                <>
                  Create Account
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Sign In Link */}
          <div className="mt-8 text-center">
            <p className="text-[#2C3E50] font-medium">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-[#4ECDC4] hover:text-[#44A08D] font-black transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="mt-8 text-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-white font-bold hover:gap-3 transition-all"
          >
            <span>←</span>
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;

// const Register = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password_hash: '',
//     full_name: '',
//     phone: '',
//     city: '',
//     field_of_interest: 'Computer Science',
//     fsc_percentage: '',
//   });
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const { register: registerUser } = useAuth();
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
    
//     try {
//       await registerUser({
//         ...formData,
//         fsc_percentage: parseFloat(formData.fsc_percentage),
//       });
//       setSuccess(true);
//       setTimeout(() => navigate('/login'), 3000);
//     } catch (error) {
//       console.error('Registration error:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (success) {
//     return (
//       <div className="min-h-screen flex items-center justify-center px-4">
       
//         <Card className="max-w-md w-full text-center">
//           <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
//             <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//             </svg>
//           </div>
//           <h2 className="text-2xl font-bold mb-2">Registration Successful!</h2>
//           <p className="text-gray-600 dark:text-gray-400 mb-4">
//             Please check your email to verify your account.
//           </p>
//           <p className="text-sm text-gray-500">
//             Redirecting to login...
//           </p>
//         </Card>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-900 dark:to-gray-800">
//       <div className="bg-gray max-w-md w-full border border-gray-200 dark:border-gray-700 rounded-xl p-6">
     
//       <div className="max-w-2xl w-full">
//         <div className="text-center mb-8">
//           <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-600 rounded-full mb-4">
//             <UserPlus className="w-8 h-8 text-white" />
//           </div>
//           <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
//             Create Your Account
//           </h1>
//           <p className="text-gray-600 dark:text-gray-400">
//             Join GB Career Pilot and find your perfect university
//           </p>
//         </div>

//         <Card>
//           <form onSubmit={handleSubmit} className="space-y-4 text-white">
//             <div className="grid md:grid-cols-2 gap-4">
//               <Input
//                 label="Full Name"
//                 type="text"
//               className="w-full border border-gray-100 rounded-md focus:border-primary-500 focus:ring-1 focus:ring-primary-500"

//                 name="full_name"
//                 value={formData.full_name}
//                 onChange={handleChange}
//                 placeholder="John Doe"
//                 required
//               />

//               <Input
//                 label="Email Address"
//                 type="email"
//               className="w-full border border-gray-100 rounded-md focus:border-primary-500 focus:ring-1 focus:ring-primary-500"

//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 placeholder="you@example.com"
//                 required
//               />
//             </div>

//             <div className="grid md:grid-cols-2 gap-4">
//               <Input
//                 label="Password"
//                 type="password"
//               className="w-full border border-gray-100 rounded-md focus:border-primary-500 focus:ring-1 focus:ring-primary-500"

//                 name="password_hash"
//                 value={formData.password_hash}
//                 onChange={handleChange}
//                 placeholder="••••••••"
//                 required
//               />

//               <Input
//                 label="Phone Number"
//                 type="tel"
//               className="w-full border border-gray-100 rounded-md focus:border-primary-500 focus:ring-1 focus:ring-primary-500"

//                 name="phone"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 placeholder="03001234567"
//                 maxLength={11}
//                 required
//               />
//             </div>

//             <div className="grid md:grid-cols-2 gap-4">
//               <Input
//                 label="City"
//                 type="text"
//               className="w-full border border-gray-100 rounded-md focus:border-primary-500 focus:ring-1 focus:ring-primary-500"

//                 name="city"
//                 value={formData.city}
//                 onChange={handleChange}
//                 placeholder="Lahore"
//                 required
//               />

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                   Field of Interest
//                 </label>
//                 <select
//                   name="field_of_interest"
//                   value={formData.field_of_interest}
//                   onChange={handleChange}
//                   className="input-field w-full border border-gray-300 rounded-md focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
//                   required
//                 >
//                   <option value="Computer Science">Computer Science</option>
//                   <option value="Medical">Medical</option>
//                   <option value="Engineering">Engineering</option>
//                 </select>
//               </div>
//             </div>

//             <Input
//               label="FSC Percentage"
//               type="number"
//               name="fsc_percentage"
//               className="w-half border border-gray-100 rounded-md focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
              
//               value={formData.fsc_percentage}
//               onChange={handleChange}
//               placeholder="85.50"
//               min="0"
//               max="100"
//               step="0.01"
//               required
//             />

//             <Button
//               type="submit"
//               className="w-full border border-gray-100 rounded-md focus:border-primary-500 focus:ring-1 focus:ring-primary-500"

//               disabled={loading}
//             >
//               {loading ? 'Creating Account...' : 'Create Account'}
//             </Button>
//           </form>

//           <div className="mt-6 text-center">
//             <p className="text-sm text-gray-600 dark:text-gray-400">
//               Already have an account?{' '}
//               <Link
//                 to="/login"
//                 className="font-medium text-primary-600 hover:text-primary-200 dark:text-primary-400"
//               >
//                 Sign in
//               </Link>
//             </p>
//           </div>
//         </Card>

//         <div className="mt-8 text-center">
//           <Link
//             to="/"
//             className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
//           >
//             ← Back to Home
//           </Link>
//         </div>
//       </div>
//       </div>
//     </div>
//   );
// };

// export default Register;
