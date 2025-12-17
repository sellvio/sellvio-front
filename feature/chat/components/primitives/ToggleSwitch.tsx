'use client';

import { motion } from 'motion/react';

export type ToggleSwitchProps = {
  value: 'public' | 'private';
  onToggle: (val: 'public' | 'private') => void;
};

const ToggleSwitch = ({ value, onToggle }: ToggleSwitchProps) => {
  const isPublic = value === 'public';

  return (
    <div
      onClick={() => onToggle(isPublic ? 'private' : 'public')}
      className={`w-[40px] h-[22px] flex items-center p-[2px] cursor-pointer rounded-full transition-colors duration-300 ${
        isPublic ? 'bg-blue-500' : 'bg-gray-300'
      }`}
    >
      <motion.div
        layout
        transition={{ type: 'spring' }}
        className="bg-white shadow-md rounded-full w-[18px] h-[18px]"
        style={{ x: isPublic ? 17.5 : 1 }}
      />
    </div>
  );
};

export default ToggleSwitch;
