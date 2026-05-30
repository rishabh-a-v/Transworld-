import React from 'react';
import { Award } from 'lucide-react';

interface PerformanceBadgeProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
}

const getRatingColor = (score: number) => {
  if (score >= 90) return { bg: 'bg-green-100', text: 'text-green-800', label: 'Outstanding' };
  if (score >= 80) return { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Exceeds Expectations' };
  if (score >= 70) return { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Meets Expectations' };
  if (score >= 60) return { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Needs Improvement' };
  return { bg: 'bg-red-100', text: 'text-red-800', label: 'Critical' };
};

export const PerformanceBadge: React.FC<PerformanceBadgeProps> = ({ score, size = 'md' }) => {
  const rating = getRatingColor(score);
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-2 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  return (
    <div className={`${rating.bg} ${rating.text} rounded-lg ${sizeClasses[size]} flex items-center gap-2 font-medium`}>
      <Award size={16} />
      {rating.label} ({score})
    </div>
  );
};
