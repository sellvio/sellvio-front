"use client";
import { useState } from "react";
import { DropDownInputProps } from "../../types";
import Image from "next/image";

const DropDownInput = ({ size, placeholder, options }: DropDownInputProps) => {
  const [value, setValue] = useState("");

  function handleSelect(event: React.ChangeEvent<HTMLSelectElement>) {
    setValue(event.target.value);
  }

  return (
    <div className="flex flex-col" style={{ width: size }}>
      <div className="mb-6">
        <h3 className="text-[#000000] font-[700] text-[18px] mb-4"></h3>

        <div className="relative">
          <div className="relative">
            <select
              name="cost-type"
              onChange={handleSelect}
              value={value}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none appearance-none cursor-pointer"
            >
              <option value="" disabled>
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
                width="12"
                height="6"
                alt="dropDown"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DropDownInput;
