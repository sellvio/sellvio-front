'use client';
import React, { useState, useRef, useEffect } from 'react';
import { FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form';

interface EnumSelectInputProps {
  label: string;
  name: string;
  enumOptions: string[];
  register: UseFormRegister<any>;
  errors: FieldErrors;
  setValue?: UseFormSetValue<any>;
  placeholder?: string;
}

const EnumSelectInput: React.FC<EnumSelectInputProps> = ({
  label,
  name,
  enumOptions,
  register,
  errors,
  setValue,
  placeholder = 'აირჩიე ან ჩაწერე',
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredOptions = enumOptions.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOptionClick = (option: string) => {
    setSelectedValue(option);
    setSearchTerm(option);
    setIsOpen(false);
    if (setValue) {
      setValue(name, option, { shouldValidate: true });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setIsOpen(true);
    if (setValue) {
      setValue(name, value, { shouldValidate: true });
    }
  };

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  const error = errors[name];

  return (
    <div
      className="flex flex-col gap-[16px] rounded-[12px] w-full min-h-[94px]"
      ref={dropdownRef}
    >
      <label htmlFor={name} className="font-bold text-[18px] cursor-pointer">
        {label}
      </label>

      <div className="w-full">
        <div className="relative">
          <input
            {...register(name)}
            type="text"
            id={name}
            value={searchTerm}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            placeholder={placeholder}
            autoComplete="off"
            className="px-[18px] py-[17px] border border-[var(--auth-input-border)] rounded-[8px] focus:outline-[var(--auth-border)] w-full min-h-[56px] font-bold text-[18px]"
          />

          {isOpen && filteredOptions.length > 0 && (
            <div className="z-10 absolute bg-white shadow-lg mt-1 border border-[var(--auth-input-border)] rounded-[8px] w-full max-h-60 overflow-y-auto">
              {filteredOptions.map((option, index) => (
                <div
                  key={index}
                  onClick={() => handleOptionClick(option)}
                  className={`px-[18px] py-[17px] cursor-pointer hover:bg-gray-50 transition-colors font-bold text-[18px] ${
                    selectedValue === option ? 'bg-gray-100' : ''
                  }`}
                >
                  {option}
                </div>
              ))}
            </div>
          )}

          {isOpen && searchTerm && filteredOptions.length === 0 && (
            <div className="z-10 absolute bg-white shadow-lg mt-1 border border-[var(--auth-input-border)] rounded-[8px] w-full">
              <div className="px-[18px] py-[17px] font-bold text-[18px] text-gray-500 text-center">
                არ მოიძებნა შედეგები
              </div>
            </div>
          )}
        </div>

        {error && (
          <p className="text-[10px] text-red-600">{String(error.message)}</p>
        )}
      </div>
    </div>
  );
};

export default EnumSelectInput;
