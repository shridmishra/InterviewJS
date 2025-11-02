import React from 'react';

interface ProgressBarProps {
  value: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value }) => {
  const clampedValue = Math.max(0, Math.min(100, value));

  return (
    <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-1">
      <div
        className="bg-yellow-500 h-1 rounded-b-md rounded-t-md transition-all duration-500 ease-out"
        style={{ width: `${clampedValue}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;