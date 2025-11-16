'use client';
import { useState, useEffect } from 'react';
import { TagInputProps } from '../../../registrationSocials/type';
import Image from 'next/image';

const OPTIONS = [
  'Technology',
  'Finance',
  'Marketing',
  'Education',
  'Healthcare',
  'E-commerce',
  'Logistics',
];

const TagInput = <T extends Record<string, unknown>>({
  name,
  register,
  errors,
  setValue,
}: TagInputProps<T>) => {
  const [items, setItems] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    if (setValue) {
      setValue(name, items as any);
    }
  }, [items, name, setValue]);

  const filteredOptions = OPTIONS.filter(
    (opt) =>
      opt.toLowerCase().includes(inputValue.toLowerCase()) &&
      !items.includes(opt)
  );

  const handleSelect = (value: string) => {
    setItems((prev) => [...prev, value]);
    setInputValue('');
    setShowOptions(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredOptions.length > 0) {
        handleSelect(filteredOptions[0]);
      }
    }
  };

  const handleRemove = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="relative">
      {/* INPUT */}
      <input
        type="text"
        placeholder="აირჩიე ინდუსტრიის ტაგი"
        className="px-[18px] py-[17px] border border-[var(--auth-input-border)] rounded-[8px] w-full min-h-[56px] font-bold text-[18px]"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          setShowOptions(true);
        }}
        onKeyDown={handleKeyDown}
        onFocus={() => setShowOptions(true)}
        onBlur={() => setTimeout(() => setShowOptions(false), 200)}
      />

      <input type="hidden" {...register(name as any)} />

      {showOptions && filteredOptions.length > 0 && (
        <div className="z-10 absolute bg-white shadow-lg mt-2 border border-gray-300 rounded-lg w-full max-h-60 overflow-auto">
          {filteredOptions.map((opt) => (
            <button
              type="button"
              key={opt}
              onClick={() => handleSelect(opt)}
              className="hover:bg-gray-100 px-4 py-2 w-full font-medium text-left cursor-pointer"
            >
              {opt}
            </button>
          ))}
        </div>
      )}

      {items.length > 0 && (
        <div className="flex flex-wrap gap-[8px] mt-[12px]">
          {items.map((item, index) => (
            <span
              key={item}
              className="flex justify-center items-center gap-[5px] bg-[var(--auth-tag-bg)] px-[12px] py-[6px] border border-[var(--auth-border)] rounded-[8px] font-semibold text-[var(--auth-social-input-border)]"
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
