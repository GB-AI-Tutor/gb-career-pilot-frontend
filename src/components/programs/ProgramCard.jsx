import Card from '../common/Card';
import EligibilityBadge from './EligibilityBadge';
import { formatCurrency } from '../../utils/formatters';
import { GraduationCap, DollarSign, MapPin } from 'lucide-react';

const ProgramCard = ({ program }) => {
  const university = program.universities;
  const eligibility = program.eligibility || {};

  return (
    <Card className="hover:shadow-lg transition-shadow ">
      <div className="border-white flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex-1">
          {program.name}
        </h3>
        {eligibility.tier && (
          <EligibilityBadge tier={eligibility.tier} />
        )}
      </div>

      <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
        <div className="flex items-center gap-2">
          <GraduationCap className="w-4 h-4" />
          <span className="font-medium">{university?.name}</span>
        </div>

        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          <span>{university?.city}</span>
        </div>

        {program.estimated_total_fee && (
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            <span>{formatCurrency(program.estimated_total_fee)} total</span>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        <span className="px-2 py-1 bg-primary-100 dark:bg-gray-900/30 text-primary-800 text-white rounded text-xs font-medium">
          {program.field_of_study}
        </span>
        
        <span className={`px-2 py-1 rounded text-xs font-medium ${
          university?.sector === 'Public'
            ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300'
            : 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300'
        }`}>
          {university?.sector}
        </span>

        {program.duration_years && (
          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded text-xs font-medium">
            {program.duration_years} years
          </span>
        )}
      </div>
    </Card>
  );
};

export default ProgramCard;
