import React from 'react';
import { ReUsableInputProps } from '../../type';
import Image from 'next/image';

const ReUsableInput: React.FC<ReUsableInputProps> = ({
  label,
  id,
  placeholder,
  register,
  errors,
  type = 'text',
  icon,
}) => (
  <div className="flex flex-col gap-[16px] rounded-[12px] w-full min-h-[94px]">
    <label
      htmlFor={id}
      className="flex items-center gap-[16px] font-bold text-[18px]"
    >
      {icon && <Image src={icon} alt="socialMedia" width={20} height={20} />}
      {label}
    </label>
    <div className="w-full">
      <input
        className="px-[18px] py-[17px] border border-[#E3E8EF] rounded-[8px] focus:outline-[#3012B3CC] w-full min-h-[56px] font-bold text-[18px]"
        type={type}
        placeholder={placeholder}
        id={id}
        {...register(id)}
      />
      {errors[id]?.message && (
        <p className="text-[10px] text-red-600">{errors[id]?.message}</p>
      )}
    </div>
  </div>
);

export default ReUsableInput;
