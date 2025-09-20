'use client';
import { useState } from 'react';
import { TagInputProps } from '../../type';
import Image from 'next/image';

const TagInput = <T extends Record<string, unknown>>({
  name,
  register,
  errors,
}: TagInputProps<T>) => {
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
      <input
        type="text"
        placeholder="შეიყვანე თეგი"
        className="px-[18px] py-[17px] border border-[var(--auth-input-border)] rounded-[8px] focus:outline-[var(--auth-gradient-start)] w-full min-h-[56px] font-bold text-[18px]"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <input
        type="hidden"
        value={JSON.stringify(items)}
        {...register(name, {
          setValueAs: (val) => {
            try {
              return val ? JSON.parse(val) : [];
            } catch {
              return [];
            }
          },
        })}
      />

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
              className="flex justify-center items-center gap-[5px] bg-[var(--auth-tag-bg)] px-[12px] py-[6px] border text-[var(--auth-social-input-border)] border-[var(--auth-border)] rounded-[8px] font-semibold"
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
