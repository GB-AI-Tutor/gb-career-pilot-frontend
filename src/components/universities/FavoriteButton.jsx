import { useState } from 'react';
import { Heart } from 'lucide-react';
import { universitiesAPI } from '../../api/universities';
import toast from 'react-hot-toast';

const FavoriteButton = ({ universityId, isFavorite: initialFavorite, onToggle }) => {
  const [isFavorite, setIsFavorite] = useState(initialFavorite);
  const [loading, setLoading] = useState(false);

  const handleToggle = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    setLoading(true);
    try {
      if (isFavorite) {
        await universitiesAPI.removeFavorite(universityId);
        toast.success('Removed from favorites');
      } else {
        await universitiesAPI.addFavorite(universityId);
        toast.success('Added to favorites!');
      }
      setIsFavorite(!isFavorite);
      if (onToggle) onToggle();
    } catch (error) {
      const message = error.response?.data?.message || error.response?.data?.detail;
      if (message && message.includes('already in favorites')) {
        setIsFavorite(true);
      } else {
        toast.error('Failed to update favorites');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className={`p-2 rounded-full transition-colors ${
        isFavorite
          ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
          : 'bg-gray-100 dark:bg-gray-700 text-gray-400 hover:text-red-600 dark:hover:text-red-400'
      } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
      title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      <Heart 
        className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`}
      />
    </button>
  );
};

export default FavoriteButton;
