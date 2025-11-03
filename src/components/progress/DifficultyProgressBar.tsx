import React from 'react';

interface DifficultyProgressBarProps {
  easy: number;
  medium: number;
  hard: number;
}

const DifficultyProgressBar: React.FC<DifficultyProgressBarProps> = ({ easy, medium, hard }) => {
  const total = easy + medium + hard;
  const easyPercentage = total === 0 ? 0 : (easy / total) * 100;
  const mediumPercentage = total === 0 ? 0 : (medium / total) * 100;
  const hardPercentage = total === 0 ? 0 : (hard / total) * 100;

  const circumference = 2 * Math.PI * 40; // Radius of 40

  return (
    <div className="relative w-24 h-24">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        {/* Background circle */}
        <circle
          className="text-gray-200 dark:text-gray-700"
          strokeWidth="10"
          stroke="currentColor"
          fill="transparent"
          r="40"
          cx="50"
          cy="50"
        />

        {/* Hard progress */}
        <circle
          className="text-red-500"
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - (circumference * hardPercentage) / 100}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r="40"
          cx="50"
          cy="50"
          transform="rotate(-90 50 50)"
        />

        {/* Medium progress */}
        <circle
          className="text-yellow-500"
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - (circumference * mediumPercentage) / 100}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r="40"
          cx="50"
          cy="50"
          transform={`rotate(${-90 + hardPercentage * 3.6} 50 50)`} // Start after hard
        />

        {/* Easy progress */}
        <circle
          className="text-green-500"
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - (circumference * easyPercentage) / 100}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r="40"
          cx="50"
          cy="50"
          transform={`rotate(${-90 + (hardPercentage + mediumPercentage) * 3.6} 50 50)`} // Start after hard and medium
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-lg font-bold text-gray-800 dark:text-gray-200">
          {total}
        </span>
      </div>
    </div>
  );
};

export default DifficultyProgressBar;