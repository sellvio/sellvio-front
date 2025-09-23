"use client";
import { useState } from "react";

import Image from "next/image";
import { DropDownInputProps } from "../../types";

const DropDownInput = ({ placeholder, options, size }: DropDownInputProps) => {
  const [value, setValue] = useState("");

  function handleSelect(event: React.ChangeEvent<HTMLSelectElement>) {
    setValue(event.target.value);
  }

  return (
    <div className="flex flex-col w-full max-w-[1440px] ">
      <div className="mb-6">
        <div className="relative">
          <div className="relative">
            <select
              name="cost-type"
              onChange={handleSelect}
              value={value}
              className="bg-[var(--white-color)] px-4 py-3 border border-[var(--auth-input-border)] rounded-lg focus:outline-none w-full text-[var(--auth-text-dark)] appearance-none cursor-pointer"
            >
              <option disabled>{placeholder}</option>
              {options.map((option, id) => (
                <option key={id} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <div className="right-0 absolute inset-y-0 flex items-center pr-3 pointer-events-none">
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
    </div>
  );
};

export default DropDownInput;
