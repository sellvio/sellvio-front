import { useState } from "react";
import { TagsProps } from "../types";
import Button from "@/components/myProfile/primirtives/button";

const Tags = ({
  label,
  placeholder = "ელემენტის დამატება",
  error,
  onChange,
}: TagsProps) => {
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
    <div className="flex flex-col gap-[5px] mt-[37px] w-full">
      <label className="text-[18px] text-[#000000] font-bold mb-4">
        {label}
      </label>
      <div className="flex gap-[16px]">
        <input
          type="text"
          placeholder={placeholder}
          className="px-[18px] text-[#00000083] font-[700] py-[17px] rounded-[8px] outline outline-[#E3E8EF] w-full"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <Button
          onClick={handleAdd}
          img="./images/svg/plusBlack.svg"
          size="px-[17px] py-[17px]"
          color="border border-[#E3E8EF] rounded-[8px] cursor-pointer"
        />
      </div>

      {items.length > 0 && (
        <div className="flex flex-wrap gap-[8px] mt-[10px]">
          {items.map((item, index) => (
            <span
              key={index}
              className="bg-[#3012B312] px-[12px] py-[6px] rounded-[6px]   border-[#111827] border text-[#111827] font-[600]"
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

export default Tags;
