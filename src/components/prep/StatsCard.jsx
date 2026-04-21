import { createElement } from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

/**
 * StatsCard Component
 * Reusable card for displaying statistics with icon and optional trend
 *
 * @param {string} title - Card title
 * @param {string|number} value - Main value to display
 * @param {string} subtitle - Optional subtitle/description
 * @param {ReactComponent} icon - Lucide icon component
 * @param {string} trend - Optional trend: 'up', 'down', 'neutral'
 * @param {string} trendValue - Optional trend percentage/value
 * @param {string} color - Color theme: 'primary', 'green', 'blue', 'orange', 'purple'
 */
const StatsCard = ({
  title,
  value,
  subtitle,
  icon,
  trend,
  trendValue,
  color = "primary",
}) => {
  const colorClasses = {
    primary: "bg-primary-100 text-primary-600 dark:bg-primary-900/20",
    green: "bg-green-100 text-green-600 dark:bg-green-900/20",
    blue: "bg-blue-100 text-blue-600 dark:bg-blue-900/20",
    orange: "bg-orange-100 text-orange-600 dark:bg-orange-900/20",
    purple: "bg-purple-100 text-purple-600 dark:bg-purple-900/20",
    red: "bg-red-100 text-red-600 dark:bg-red-900/20",
  };

  const getTrendIcon = () => {
    switch (trend) {
      case "up":
        return TrendingUp;
      case "down":
        return TrendingDown;
      default:
        return Minus;
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case "up":
        return "text-green-600";
      case "down":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
            {title}
          </p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {value}
          </p>
          {subtitle && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {subtitle}
            </p>
          )}
          {trend && trendValue && (
            <div
              className={`flex items-center gap-1 mt-2 text-sm ${getTrendColor()}`}
            >
              {createElement(getTrendIcon(), { className: "w-4 h-4" })}
              <span className="font-medium">{trendValue}</span>
            </div>
          )}
        </div>

        {icon && (
          <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
            {createElement(icon, { className: "w-6 h-6" })}
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsCard;
