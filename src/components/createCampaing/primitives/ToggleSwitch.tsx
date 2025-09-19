"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ToggleSwitchProps } from "../../types";

const ToggleSwitch = ({ value, onToggle }: ToggleSwitchProps) => {
  const [isOn, setIsOn] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <div
        onClick={() => setIsOn(!isOn)}
        className={`w-[40px] h-[22px] flex items-center p-[2px] cursor-pointer rounded-full transition-colors duration-300 ${
          isOn ? "bg-blue-500" : "bg-gray-300"
        }`}
      >
        <motion.div
          layout
          transition={{ type: "spring" }}
          className="bg-white shadow-md rounded-full w-[18px] h-[18px]"
          style={{ x: isOn ? 17.5 : 1 }}
        />
      </div>
    </div>
  );
};

export default ToggleSwitch;
