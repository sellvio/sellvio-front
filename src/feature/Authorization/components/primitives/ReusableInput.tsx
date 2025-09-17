import React from 'react';
import { ReUsableInputProps } from '../../type';

const ReUsableInput: React.FC<ReUsableInputProps> = ({
  label,
  id,
  placeholder,
  register,
  errors,
  type = 'text',
}) => (
  <div className="flex flex-col gap-[10px] bg-white px-[24px] md:py-[16px] pt-[16px] pb-[24px] rounded-[12px] w-full max-w-[720px] lg:max-w-[1114px] min-h-[130px]">
    <label htmlFor={id} className="font-medium text-black cursor-pointer">
      {label}
    </label>
    <input
      className="px-[24px] py-[16px] border-[#707070] border-b-1 focus:outline-none w-full max-w-[672px] lg:max-w-[400px] min-h-[56px] text-[#9E9E9E]"
      type={type}
      placeholder={placeholder}
      id={id}
      {...register(id)}
    />
    {errors[id]?.message && (
      <p className="text-[10px] text-red-600">{errors[id]?.message}</p>
    )}
  </div>
);

export default ReUsableInput;
