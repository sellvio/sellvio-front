"use client";
import { useState } from "react";
import { DropDownInputProps } from "../../types";
import Image from "next/image";

const DropDownInput = ({ placeholder, options }: DropDownInputProps) => {
  const [value, setValue] = useState("");

  function handleSelect(event: React.ChangeEvent<HTMLSelectElement>) {
    setValue(event.target.value);
  }

  return (
    <div className="flex flex-col w-full max-w-[1440px]">
      <div className="mb-6">
        <h3 className="mb-4 font-[700] text-[#000000] text-[18px]"></h3>

        <div className="relative">
          <div className="relative">
            <select
              name="cost-type"
              onChange={handleSelect}
              value={value}
              className="bg-white px-4 py-3 border border-gray-300 rounded-lg focus:outline-none w-full text-gray-900 appearance-none cursor-pointer"
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

            <div className="right-0 absolute inset-y-0 flex items-center pr-3 pointer-events-none">
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
