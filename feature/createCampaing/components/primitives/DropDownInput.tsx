"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { DropDownInputProps } from "../../types";

interface ExtendedDropDownInputProps extends DropDownInputProps {
  onValueChange?: (value: string) => void;
  value?: string;
}

const DropDownInput = ({
  placeholder,
  options,
  onValueChange,
  value: controlledValue,
}: ExtendedDropDownInputProps) => {
  const [value, setValue] = useState(controlledValue || "");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (controlledValue !== undefined) {
      setValue(controlledValue ?? "");
    }
  }, [controlledValue]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (newValue: string) => {
    if (!controlledValue) {
      setValue(newValue);
    }
    if (onValueChange) {
      onValueChange(newValue);
    }
    setIsOpen(false);
  };

  const selectedOption =
    options.find(
      (option) =>
        option.value ===
        (controlledValue !== undefined ? controlledValue : value)
    )?.label ?? "";

  return (
    <div className="flex flex-col w-full max-w-[1440px]">
      <div className="mb-6" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="px-3 py-2 border rounded-[8px] outline-none w-full font-[700] text-left text-[var(--black-color)] bg-[#FFFFFF1A] border-[#FFFFFF] shadow-[4px_5px_6px_0px_#FFFFFF66_inset] backdrop-blur-[7.5px] flex items-center justify-between cursor-pointer"
        >
          <span
            className={`${
              selectedOption
                ? "text-[var(--black-color)]"
                : "text-[var(--campaing-form-paragraphs)]"
            } font-[700] cursor-pointer`}
          >
            {selectedOption || placeholder}
          </span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-none flex items-center"
          >
            <Image
              src="images/svg/dropdown.svg"
              width={12}
              height={6}
              alt="dropDown"
            />
          </motion.div>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="mt-2 border rounded-[8px] border-[#FFFFFF] bg-[#FFFFFF1A] shadow-[4px_5px_6px_0px_#FFFFFF33] backdrop-blur-[7.5px]">
                {options.map((option) => (
                  <motion.button
                    key={option.value}
                    type="button"
                    onClick={() => handleSelect(option.value)}
                    className="w-full text-left px-3 py-2 font-[700] text-[var(--black-color)] hover:bg-[#FFFFFF33] cursor-pointer"
                    whileTap={{ scale: 0.98 }}
                  >
                    {option.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DropDownInput;
