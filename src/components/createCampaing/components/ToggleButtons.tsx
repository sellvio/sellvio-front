import { motion } from "motion/react";
import { ButtonSliderProps } from "../types";

const ToggleButtons = ({ active, setActive }: ButtonSliderProps) => {
  return (
    <div className="relative mx-auto mb-[28px] mt-[65px] flex justify-between bg-[#F2F5F9] px-[14px] py-[12px] rounded-[12px] w-full max-w-[1387px] min-h-[72px] overflow-hidden">
      <motion.div
        className="top-1/2 left-[14px] absolute bg-[#FFFFFF] rounded-[12px] w-1/2 h-[48px] -translate-y-1/2"
        animate={{ x: active === "analytic" ? 0 : "calc(100% - 28px)" }}
        transition={{ type: "spring", stiffness: 300, damping: 40 }}
      />
      <button
        className={`flex justify-center relative z-[10] items-center rounded-[12px] text-[#00000083] w-1/2 font-bold  cursor-pointer`}
        onClick={() => setActive("analytic")}
      >
        ბიზნესი
      </button>
      <button
        className={`flex justify-center relative z-[10] items-center rounded-[12px] text-[#00000083] w-1/2 font-bold  cursor-pointer`}
        onClick={() => setActive("campaing")}
      >
        შემქმნელი
      </button>
    </div>
  );
};

export default ToggleButtons;
