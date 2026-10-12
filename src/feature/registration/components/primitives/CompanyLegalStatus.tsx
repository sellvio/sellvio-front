'use client';
import { EnumSelectInputProps } from '@/feature/registrationSocials/type';
import React, { useState, useRef, useEffect } from 'react';

interface LegalStatusOption {
  id: number;
  code: string;
  name_en: string;
  name_ka: string;
}

interface EnumSelectInputPropsExtended
  extends Omit<EnumSelectInputProps, 'enumOptions'> {
  enumOptions: LegalStatusOption[];
}

const EnumSelectInput: React.FC<EnumSelectInputPropsExtended> = ({
  label,
  name,
  enumOptions,
  register,
  errors,
  setValue,
  placeholder = 'აირჩიე ან ჩაწერე',
}) => {
  const storageKey = `enum_${name}`;
  const [searchTerm, setSearchTerm] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem(storageKey) || '';
    }
    return '';
  });
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredOptions = enumOptions.filter((option) =>
    option.name_ka.toLowerCase().includes(searchTerm.toLowerCase())
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

  // Restore the form value from the persisted search term once options load
  useEffect(() => {
    if (!setValue || !searchTerm) return;
    const match = enumOptions.find((opt) => opt.name_ka === searchTerm);
    if (match) {
      setSelectedValue(match.name_ka);
      setValue(name, match.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enumOptions]);

  const handleOptionClick = (option: LegalStatusOption) => {
    setSelectedValue(option.name_ka);
    setSearchTerm(option.name_ka);
    sessionStorage.setItem(storageKey, option.name_ka);
    setIsOpen(false);
    if (setValue) {
      setValue(name, option.id, { shouldValidate: true });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    sessionStorage.setItem(storageKey, value);
    setIsOpen(true);

    const exactMatch = enumOptions.find((opt) => opt.name_ka === value);
    if (setValue) {
      // Typed text that doesn't match an option must not keep a stale id
      setValue(name, exactMatch ? exactMatch.id : undefined, {
        shouldValidate: true,
      });
    }
    setSelectedValue(exactMatch ? exactMatch.name_ka : '');
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
          {/* The id is stored via setValue; the visible input only holds the search text */}
          <input type="hidden" {...register(name)} />
          <input
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
              {filteredOptions.map((option) => (
                <div
                  key={option.id}
                  onClick={() => handleOptionClick(option)}
                  className={`px-[18px] py-[17px] cursor-pointer hover:bg-gray-50 transition-colors font-bold text-[18px] ${
                    selectedValue === option.name_ka ? 'bg-gray-100' : ''
                  }`}
                >
                  {option.name_ka}
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
