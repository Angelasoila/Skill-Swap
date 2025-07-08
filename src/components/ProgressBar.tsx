
import React from 'react';

interface ProgressBarProps {
  progress: number;
  total: number;
  color?: string;
  height?: string;
  showText?: boolean;
}

const ProgressBar = ({ 
  progress, 
  total, 
  color = 'from-green-400 to-green-600',
  height = 'h-3',
  showText = true 
}: ProgressBarProps) => {
  const percentage = Math.min((progress / total) * 100, 100);

  return (
    <div className="w-full">
      <div className={`w-full bg-gray-200 rounded-full ${height} overflow-hidden`}>
        <div
          className={`${height} bg-gradient-to-r ${color} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showText && (
        <div className="flex justify-between text-sm text-gray-600 mt-1">
          <span>{progress} / {total}</span>
          <span>{Math.round(percentage)}%</span>
        </div>
      )}
    </div>
  );
};

export default ProgressBar;
