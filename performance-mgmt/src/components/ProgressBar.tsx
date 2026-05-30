import React from 'react';

interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  color?: 'blue' | 'green' | 'red' | 'yellow' | 'purple';
  showPercentage?: boolean;
}

const colorClasses = {
  blue: 'bg-blue-600',
  green: 'bg-green-600',
  red: 'bg-red-600',
  yellow: 'bg-yellow-600',
  purple: 'bg-purple-600',
};

const bgColorClasses = {
  blue: 'bg-blue-100',
  green: 'bg-green-100',
  red: 'bg-red-100',
  yellow: 'bg-yellow-100',
  purple: 'bg-purple-100',
};

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  label,
  color = 'blue',
  showPercentage = true,
}) => {
  const percentage = (value / max) * 100;

  return (
    <div className="w-full">
      {(label || showPercentage) && (
        <div className="flex justify-between items-center mb-2">
          {label && <span className="text-sm font-medium text-gray-700">{label}</span>}
          {showPercentage && <span className="text-sm font-medium text-gray-600">{Math.round(percentage)}%</span>}
        </div>
      )}
      <div className={`h-2 rounded-full overflow-hidden ${bgColorClasses[color]}`}>
        <div
          className={`h-full rounded-full transition-all ${colorClasses[color]}`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
    </div>
  );
};
