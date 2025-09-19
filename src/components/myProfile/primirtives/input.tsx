"use client";

import React from "react";
import { InputFieldProps } from "../types";

const InputField: React.FC<InputFieldProps> = ({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
  error,
  textarea = false,
  className,
}) => {
  return (
    <div className="w-full">
      {label && (
        <h3 className="font-[700] text-[18px] text-[#000000] mb-4">{label}</h3>
      )}
      <label className="block mb-1 text-sm font-medium"></label>
      {textarea ? (
        <textarea
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`w-full border border-[#E3E8EF] rounded-[8px] px-3 py-2 h-[78px] text-[#00000083] font-[700] outline-none text-[18px] ${className}`}
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`w-full border border-[#E3E8EF] rounded-[8px] px-3 py-2 text-[#00000083] font-[700] outline-none text-[18px] ${className}`}
        />
      )}
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
};

export default InputField;
