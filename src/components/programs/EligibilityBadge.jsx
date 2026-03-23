import { TIER_COLORS } from '../../utils/constants';

const EligibilityBadge = ({ tier }) => {
  const colors = {
    Safety: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border-green-200 dark:border-green-800',
    Target: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800',
    Reach: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300 border-orange-200 dark:border-orange-800',
    'Not Eligible': 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border-red-200 dark:border-red-800',
    Unknown: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600',
  };

  const icons = {
    Safety: '🟢',
    Target: '🟡',
    Reach: '🟠',
    'Not Eligible': '🔴',
    Unknown: '⚪',
  };

  return (
    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium border ${colors[tier] || colors.Unknown}`}>
      <span>{icons[tier] || icons.Unknown}</span>
      {tier}
    </span>
  );
};

export default EligibilityBadge;
