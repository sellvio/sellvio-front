import React from "react";
import { motion } from "motion/react";
import { ProgressBarProps } from "../../types";

const ProgressBar: React.FC<ProgressBarProps> = ({
  currentAmount,
  goalAmount,
}) => {
  const percentage = Math.min((currentAmount / goalAmount) * 100, 100);

  return (
    <div className="mx-auto w-full">
      <div className="bg-[#E6E7EB] rounded-full w-full h-2 overflow-hidden mt-4 mb-4 ">
        <motion.div
          className="bg-[#0866FF] rounded-full h-full  "
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        ></motion.div>
      </div>
    </div>
  );
};
export default ProgressBar;
