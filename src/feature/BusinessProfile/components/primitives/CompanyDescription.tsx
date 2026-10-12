import React from 'react';
import { CompanyFieldsProps } from '../../type';

const CompanyDescription: React.FC<CompanyFieldsProps> = ({
  changeProfile,
  register,
  errors,
}) => {
  return (
    <div className="flex flex-col gap-[16px] bg-[rgba(88,60,207,0.02)] shadow-[0_8px_13px_0_rgba(0,0,0,0.04),4px_5px_6px_0_rgba(255,255,255,0.4)_inset,-1px_-3px_4px_0_rgba(255,255,255,0.4)_inset] backdrop-blur-[7.5px] p-[30px] border border-[rgba(0,0,0,0.22)] rounded-[8px] w-full max-w-[1225px]">
      <label htmlFor="description" className="font-bold text-[18px]">
        კომპანიის დახასიათება
      </label>
      <textarea
        id="description"
        readOnly={!changeProfile}
        rows={3}
        {...register('description')}
        className="bg-[rgba(255,255,255,0.14)] shadow-[4px_5px_6px_0_rgba(255,255,255,0.4)_inset,-1px_-3px_4px_0_rgba(255,255,255,0.4)_inset,0_8px_13px_0_rgba(0,0,0,0.04)] backdrop-blur-[7.5px] px-[18px] py-[16px] border border-[#E3E8EF] rounded-[8px] w-full font-bold text-[#000000D4] text-[18px] resize-none"
      />
      {errors.description && (
        <p className="text-red-500 text-sm">{errors.description.message}</p>
      )}
    </div>
  );
};

export default CompanyDescription;
