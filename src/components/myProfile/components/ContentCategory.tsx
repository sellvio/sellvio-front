"use client";

import { useState } from "react";
import { TagFieldProps } from "../types";

const TagField = ({
  label,
  placeholder = "ელემენტის დამატება",
  error,
  onChange,
}: TagFieldProps) => {
  const [items, setItems] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  const handleAdd = () => {
    if (inputValue.trim()) {
      const newItems = [...items, inputValue.trim()];
      setItems(newItems);
      setInputValue("");
      onChange?.(newItems);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div className="flex flex-col gap-[5px]  max-w-[1222px] w-full mx-auto">
      <label className="text-[18px]">{label}</label>
      <div className="flex gap-[16px]">
        <input
          type="text"
          placeholder={placeholder}
          className="px-[18px] py-[17px] rounded-[8px] outline outline-[#E3E8EF] focus:outline-[#3012B3CC] w-full"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
        />
      </div>

      {items.length > 0 && (
        <div className="flex flex-wrap gap-[8px] mt-[10px]">
          {items.map((item, index) => (
            <span
              key={index}
              className="bg-[#F3F4F6] px-[12px] py-[6px] rounded-[6px] text-[14px]"
            >
              {item}
            </span>
          ))}
        </div>
      )}

      {error && <p className="ml-[10px] text-[12px] text-red-500">{error}</p>}
    </div>
  );
};

export default TagField;
