import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Card from '../../components/common/Card';
import { UserPlus } from 'lucide-react';

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
      <div className="min-h-screen flex items-center justify-center px-4">
       
        <Card className="max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2">Registration Successful!</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Please check your email to verify your account.
          </p>
          <p className="text-sm text-gray-500">
            Redirecting to login...
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-900 dark:to-gray-800">
      <div className="bg-gray max-w-md w-full border border-gray-200 dark:border-gray-700 rounded-xl p-6">
     
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-600 rounded-full mb-4">
            <UserPlus className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Create Your Account
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Join GB Career Pilot and find your perfect university
          </p>
        </div>

        <Card>
          <form onSubmit={handleSubmit} className="space-y-4 text-white">
            <div className="grid md:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                type="text"
              className="w-full border border-gray-100 rounded-md focus:border-primary-500 focus:ring-1 focus:ring-primary-500"

                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                placeholder="John Doe"
                required
              />

              <Input
                label="Email Address"
                type="email"
              className="w-full border border-gray-100 rounded-md focus:border-primary-500 focus:ring-1 focus:ring-primary-500"

                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <Input
                label="Password"
                type="password"
              className="w-full border border-gray-100 rounded-md focus:border-primary-500 focus:ring-1 focus:ring-primary-500"

                name="password_hash"
                value={formData.password_hash}
                onChange={handleChange}
                placeholder="••••••••"
                required
              />

              <Input
                label="Phone Number"
                type="tel"
              className="w-full border border-gray-100 rounded-md focus:border-primary-500 focus:ring-1 focus:ring-primary-500"

                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="03001234567"
                maxLength={11}
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <Input
                label="City"
                type="text"
              className="w-full border border-gray-100 rounded-md focus:border-primary-500 focus:ring-1 focus:ring-primary-500"

                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Lahore"
                required
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Field of Interest
                </label>
                <select
                  name="field_of_interest"
                  value={formData.field_of_interest}
                  onChange={handleChange}
                  className="input-field w-full border border-gray-300 rounded-md focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                  required
                >
                  <option value="Computer Science">Computer Science</option>
                  <option value="Medical">Medical</option>
                  <option value="Engineering">Engineering</option>
                </select>
              </div>
            </div>

            <Input
              label="FSC Percentage"
              type="number"
              name="fsc_percentage"
              className="w-half border border-gray-100 rounded-md focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
              
              value={formData.fsc_percentage}
              onChange={handleChange}
              placeholder="85.50"
              min="0"
              max="100"
              step="0.01"
              required
            />

            <Button
              type="submit"
              className="w-full border border-gray-100 rounded-md focus:border-primary-500 focus:ring-1 focus:ring-primary-500"

              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-medium text-primary-600 hover:text-primary-200 dark:text-primary-400"
              >
                Sign in
              </Link>
            </p>
          </div>
        </Card>

        <div className="mt-8 text-center">
          <Link
            to="/"
            className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Register;
