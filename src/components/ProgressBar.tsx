import React from 'react';

interface Props {
  current: number;
  total: number;
}

export function ProgressBar({ current, total }: Props) {
  const percentage = (current / total) * 100;

  return (
    <div className="w-full mb-8">
      <div className="flex justify-between text-sm text-gray-600 mb-2">
        <span>Question {current} of {total}</span>
        <span>{Math.round(percentage)}% complete</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}