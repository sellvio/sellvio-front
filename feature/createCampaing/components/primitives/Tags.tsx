import { useEffect, useState } from "react";
import { TagsProps } from "../../../myProfile/types";
import Image from "next/image";

const Tags = ({
  label,
  placeholder = "ელემენტის დამატება",
  error,
  onChange,
  value,
}: TagsProps) => {
  const [items, setItems] = useState<string[]>(value || []);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setItems(value || []);
  }, [value]);

  const handleAdd = () => {
    if (inputValue.trim()) {
      const newItems = [...items, inputValue.trim()];
      setItems(newItems);
      setInputValue("");
      onChange?.(newItems);
    }
  };
  const handleRemove = (indexToRemove: number) => {
    const newItems = items.filter((_, index) => index !== indexToRemove);
    setItems(newItems);
    onChange?.(newItems);
  };
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div className="flex flex-col gap-[5px]  w-full">
      <label className="text-[18px] text-[var(--black-color)] font-bold mb-4">
        {label}
      </label>
      <div className="flex gap-[16px]">
        <input
          type="text"
          placeholder={placeholder}
          className="px-[18px] text-[var(--adding-tags-color)] font-[700] py-[17px] rounded-[8px] outline outline-[var(--auth-input-border)] w-full  bg-[#FFFFFF1A] border-[#FFFFFF] shadow-[4px_5px_6px_0px_#FFFFFF66_inset]
=
         backdrop-blur-[7.5px]"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
        />

        <button
          type="button"
          onClick={handleAdd}
          className="border w-[56px] h-[56px] flex items-center justify-center rounded-[8px] cursor-pointer bg-[#FFFFFF1A] border-[#FFFFFF] shadow-[4px_5px_6px_0px_#FFFFFF66_inset]
=
         backdrop-blur-[7.5px] "
        >
          <Image
            src="./images/svg/plusBlack.svg"
            alt="pluseButton"
            width={22}
            height={22}
          />
        </button>
      </div>

      {items.length > 0 && (
        <div className="flex flex-wrap gap-[8px] mt-[10px]">
          {items.map((item, index) => (
            <div
              key={index}
              className="bg-[var(--tags-bg)] px-[12px] py-[6px] rounded-[6px]   border-[var(--auth-social-input-border)] border text-[var( --auth-social-input-border)] font-[600] flex items-center gap-2"
            >
              <span>{item}</span>
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="flex items-center justify-center text-[var( --auth-social-input-border)]hover:text-red-500 mb-[3px]  bg-[#FFFFFF1A] border-[#FFFFFF] shadow-[4px_5px_6px_0px_#FFFFFF66_inset]
=
         backdrop-blur-[7.5px]"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      {error && <p className="ml-[10px] text-[12px] text-red-500">{error}</p>}
    </div>
  );
};

export default Tags;
