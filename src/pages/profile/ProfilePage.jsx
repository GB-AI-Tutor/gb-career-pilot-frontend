import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Loader from '../../components/common/Loader';
import { ArrowLeft, Save } from 'lucide-react';
import { FIELD_TYPES } from '../../utils/constants';
import toast from 'react-hot-toast';

const ProfilePage = () => {
  const { user, updateProfile, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone_number: user?.phone_number || '',
    city: user?.city || '',
    field_of_interest: user?.field_of_interest || '',
    fsc_percentage: user?.fsc_percentage || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Convert FSC percentage to number
      const dataToSend = {
        ...formData,
        fsc_percentage: formData.fsc_percentage ? parseFloat(formData.fsc_percentage) : null,
      };

      await updateProfile(dataToSend);
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('Profile update error:', error);
      toast.error(error.response?.data?.detail || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-6">
          <Link to="/dashboard">
            <Button variant="secondary" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Dashboard
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Profile Settings
          </h1>
        </div>

        <Card>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Personal Information
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Input
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <Input
                label="Phone Number"
                name="phone_number"
                type="tel"
                value={formData.phone_number}
                onChange={handleChange}
              />

              <Input
                label="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Field of Interest
                </label>
                <select
                  name="field_of_interest"
                  value={formData.field_of_interest}
                  onChange={handleChange}
                  className="input-field"
                >
                  <option value="">Select a field</option>
                  {FIELD_TYPES.map(field => (
                    <option key={field} value={field}>{field}</option>
                  ))}
                </select>
              </div>

              <Input
                label="FSC Percentage"
                name="fsc_percentage"
                type="number"
                step="0.01"
                min="0"
                max="100"
                value={formData.fsc_percentage}
                onChange={handleChange}
                placeholder="e.g., 85.5"
              />

              <div className="md:col-span-2">
                <Input
                  label="Email"
                  value={user?.email || ''}
                  disabled
                  className="bg-gray-100 dark:bg-gray-800"
                />
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Email cannot be changed
                </p>
              </div>
            </div>

            {/* FSC Impact Info */}
            {formData.fsc_percentage && (
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                  How your FSC percentage affects eligibility
                </h3>
                <div className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                  <p>• Programs with cutoff ≤ {parseFloat(formData.fsc_percentage) - 10}% are <strong>Safety</strong></p>
                  <p>• Programs with cutoff between {parseFloat(formData.fsc_percentage) - 10}% and {parseFloat(formData.fsc_percentage) + 10}% are <strong>Target</strong></p>
                  <p>• Programs with cutoff &gt; {parseFloat(formData.fsc_percentage) + 10}% are <strong>Reach</strong></p>
                </div>
              </div>
            )}

            <div className="flex justify-end gap-4">
              <Link to="/dashboard">
                <Button variant="secondary">
                  Cancel
                </Button>
              </Link>
              <Button type="submit" disabled={loading} className="flex items-center gap-2">
                {loading ? (
                  <>
                    <Loader size="sm" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </form>
        </Card>

        {/* User Stats */}
        <Card className="mt-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Account Status
          </h2>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600 dark:text-gray-400">Account Status:</span>
              <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                user?.is_verified
                  ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                  : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
              }`}>
                {user?.is_verified ? 'Verified' : 'Pending Verification'}
              </span>
            </div>
            <div>
              <span className="text-gray-600 dark:text-gray-400">Account Type:</span>
              <span className="ml-2 font-medium text-gray-900 dark:text-white">Free</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
