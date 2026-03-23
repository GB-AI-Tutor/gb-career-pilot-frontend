import { MapPin, DollarSign, Award } from 'lucide-react';
import Card from '../common/Card';
import FavoriteButton from './FavoriteButton';
import { formatCurrency } from '../../utils/formatters';

const UniversityCard = ({ university, isFavorite = false, onFavoriteToggle }) => {
  return (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer relative">
      <div className="absolute top-4 right-4">
        <FavoriteButton
          universityId={university.id}
          isFavorite={isFavorite}
          onToggle={onFavoriteToggle}
        />
      </div>

      <div className="pr-12">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          {university.name}
        </h3>

        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>{university.city}</span>
          </div>

          {university.fee_per_semester && (
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              <span>{formatCurrency(university.fee_per_semester)}/semester</span>
            </div>
          )}

          {university.ranking_national && (
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4" />
              <span>Ranked #{university.ranking_national} nationally</span>
            </div>
          )}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            university.sector === 'Public'
              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
              : university.sector === 'Private'
              ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
              : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
          }`}>
            {university.sector}
          </span>

          {university.has_hostel && (
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
              Hostel Available
            </span>
          )}
        </div>
      </div>
    </Card>
  );
};

export default UniversityCard;
