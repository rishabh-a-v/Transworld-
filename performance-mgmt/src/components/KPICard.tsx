import React from 'react';
import { TrendingUp } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  trend?: number;
  color?: 'blue' | 'green' | 'purple' | 'orange';
}

const iconColorClasses = {
  blue: 'bg-blue-100 text-blue-600',
  green: 'bg-green-100 text-green-600',
  purple: 'bg-purple-100 text-purple-600',
  orange: 'bg-orange-100 text-orange-600',
};

export const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  subtitle,
  icon,
  trend,
  color = 'blue',
}) => {
  return (
    <div className={`card border-l-4 border-l-${color}-600`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
        </div>
        {icon && (
          <div className={`${iconColorClasses[color]} p-3 rounded-lg`}>
            {icon}
          </div>
        )}
      </div>
      {trend !== undefined && (
        <div className="flex items-center mt-4 text-sm">
          <TrendingUp className={`w-4 h-4 ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`} />
          <span className={trend >= 0 ? 'text-green-600' : 'text-red-600'}>
            {trend >= 0 ? '+' : ''}{trend}% this month
          </span>
        </div>
      )}
    </div>
  );
};
