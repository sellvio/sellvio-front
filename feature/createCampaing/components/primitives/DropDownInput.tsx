"use client";

import { useState } from "react";
import Image from "next/image";

export interface DropDownOption {
  label: string;
  value: string;
}

export interface DropDownInputProps {
  placeholder: string;
  options: DropDownOption[];
  onChange?: (value: string) => void; // optional callback parent-ისთვის
}

const DropDownInput = ({
  placeholder,
  options,
  onChange,
}: DropDownInputProps) => {
  const [value, setValue] = useState("");

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(event.target.value);
    onChange?.(event.target.value);
  };

  return (
    <div className="flex flex-col w-full max-w-[1440px]">
      <div className="mb-6">
        <div className="relative">
          <select
            name="dropdown"
            onChange={handleSelect}
            value={value}
            className="px-3 py-2 border border-[var(--auth-input-border)] rounded-[8px] outline-none w-full font-[700] text-[var(--black-color)] appearance-none"
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
