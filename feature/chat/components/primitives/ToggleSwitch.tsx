'use client';

import { motion } from 'motion/react';

export type ToggleSwitchProps = {
  value: boolean;
  onToggle: (val: boolean) => void;
};

const ToggleSwitch = ({ value, onToggle }: ToggleSwitchProps) => {
  return (
    <div
      onClick={() => onToggle(!value)}
      className={`w-[40px] h-[22px] flex items-center p-[2px] cursor-pointer rounded-full transition-colors duration-300 ${
        value ? 'bg-blue-500' : 'bg-gray-300'
      }`}
    >
      <motion.div
        layout
        transition={{ type: 'spring' }}
        className="bg-white shadow-md rounded-full w-[18px] h-[18px]"
        style={{ x: value ? 17.5 : 1 }}
      />
    </div>
  );
};

export default ToggleSwitch;
