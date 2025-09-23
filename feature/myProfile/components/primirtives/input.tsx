"use client";

import React from "react";
import { InputFieldProps } from "../../types";

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
        <h3 className="font-[700] text-[18px] text-[var(--black-color)] mb-4">
          {label}
        </h3>
      )}
      {textarea ? (
        <textarea
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`w-full border border-[var(--auth-input-border)]  rounded-[8px] px-3 py-2 h-[78px] text-[var(--campaing-form-paragraphs)] font-[700] outline-none text-[18px] ${className}`}
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`w-full border border-[var(--auth-input-border)]  rounded-[8px] px-3 py-2 text-[var(--campaing-form-paragraphs)] font-[700] outline-none text-[18px] ${className}`}
        />
      )}
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
};

export default InputField;
