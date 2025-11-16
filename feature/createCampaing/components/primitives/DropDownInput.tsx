"use client";

import { useState } from "react";
import Image from "next/image";
import { DropDownInputProps } from "../../types";

interface ExtendedDropDownInputProps extends DropDownInputProps {
  onValueChange?: (value: string) => void;
}

const DropDownInput = ({
  placeholder,
  options,
  onValueChange,
}: ExtendedDropDownInputProps) => {
  const [value, setValue] = useState("");

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    setValue(newValue);
    if (onValueChange) {
      onValueChange(newValue);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-[1440px]">
      <div className="mb-6">
        <div className="relative">
          <select
            name="dropdown"
            onChange={handleSelect}
            value={value}
            className="px-3 py-2 border  rounded-[8px] outline-none w-full font-[700] text-[var(--black-color)] appearance-none bg-[#FFFFFF1A] border-[#FFFFFF] shadow-[4px_5px_6px_0px_#FFFFFF66_inset] backdrop-blur-[7.5px]"
          >
            <option disabled value="">
              {placeholder}
            </option>
            {options.map((option, id) => (
              <option key={id} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <Image
              src="images/svg/dropdown.svg"
              width={12}
              height={6}
              alt="dropDown"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DropDownInput;
