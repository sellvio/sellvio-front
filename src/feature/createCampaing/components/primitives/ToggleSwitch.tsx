'use client';

import { motion } from 'motion/react';
import { ToggleSwitchProps } from '../../type';

const ToggleSwitch = ({ value, onToggle }: ToggleSwitchProps) => {
  return (
    <div className="flex flex-col">
      <button
        type="button"
        onClick={() => onToggle(!value)}
        className={`w-11 h-6 flex items-center px-[2px] cursor-pointer rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#0040e0]/40 ${
          value ? 'bg-[#0040e0]' : 'bg-[#dee3e8]'
        }`}
      >
        <motion.div
          layout
          transition={{ type: 'spring', stiffness: 700, damping: 30 }}
          className="bg-white shadow-md rounded-full w-5 h-5"
          animate={{ x: value ? 20 : 0 }}
        />
      </button>
    </div>
  );
};

export default ToggleSwitch;
