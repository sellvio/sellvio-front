'use client';

import { motion } from 'motion/react';
import { ToggleSwitchProps } from '../../type';

const ToggleSwitch = ({ value, onToggle }: ToggleSwitchProps) => {
  return (
    <div className="flex flex-col gap-4">
      <button
        type="button"
        onClick={() => onToggle(!value)}
        className={`w-[40px] h-[22px] flex items-center p-[2px] cursor-pointer rounded-full transition-colors duration-300 ${
          value ? 'bg-blue-500' : 'bg-gray-300'
        }`}
      >
        <motion.div
          layout
          transition={{ type: 'spring', stiffness: 700, damping: 30 }}
          className="bg-white shadow-md rounded-full w-[18px] h-[18px]"
          animate={{ x: value ? 17 : 0 }}
        />
      </button>
    </div>
  );
};

export default ToggleSwitch;
