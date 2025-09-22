import React from 'react';
import { ProgressBarProps } from '../../type';

const ProgressBar: React.FC<ProgressBarProps> = ({
  currentAmount,
  goalAmount,
}) => {
  const percentage = Math.min((currentAmount / goalAmount) * 100, 100);

  return (
    <div className="mx-auto w-full">
      <div className="flex justify-between mb-[3px] w-full">
        <p className="font-medium text-[12px]">ბიუჯეტი</p>
        <p className="font-medium text-[14px]">
          ${goalAmount - currentAmount} დარჩა
        </p>
      </div>
      <div className="bg-[var(--gray-color)] rounded-full w-full h-2 overflow-hidden">
        <div
          className="bg-[var(--lending-button)] rounded-full h-full"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};
export default ProgressBar;
