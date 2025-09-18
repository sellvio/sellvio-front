'use client';
import { useState } from 'react';
import { TagInputProps } from '../../type';
import Image from 'next/image';

const TagInput = ({ name, register, errors }: TagInputProps) => {
  const [items, setItems] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');

  const handleAdd = () => {
    const newItems = [...items, inputValue.trim()];
    setItems(newItems);
    setInputValue('');
  };

  const handleRemove = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div>
      <div className="m-auto my-[30px] w-full max-w-[360px] font-bold text-[18px] text-center">
        აირჩიეთ თეგების რომელი სფეროს წარმომადგენელიც ხართ:
      </div>
      <input
        type="text"
        placeholder="შეიყვანე თეგი"
        className="px-[18px] py-[17px] border border-[#E3E8EF] rounded-[8px] focus:outline-[#3012B3CC] w-full min-h-[56px] font-bold text-[18px]"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <input type="hidden" value={items.join(',')} {...register(name)} />

      {errors[name] && (
        <p className="text-red-500 text-sm">
          {errors[name]?.message as string}
        </p>
      )}

      {items.length > 0 && (
        <div className="flex flex-wrap gap-[8px] mt-[12px]">
          {items.map((item, index) => (
            <span
              key={index}
              className="flex justify-center items-center gap-[5px] bg-[#3012B31F] px-[12px] py-[6px] border border-[#3012B3] rounded-[8px] font-semibold text-[#111827]"
            >
              {item}
              <button
                className="cursor-pointer"
                type="button"
                onClick={() => handleRemove(index)}
              >
                <Image
                  src="/close.svg"
                  alt="closeButton"
                  width={8}
                  height={8}
                />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default TagInput;
