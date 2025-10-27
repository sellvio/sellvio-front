import React from 'react';

const CompanyHeader = ({ profile, changeProfile, register, errors }) => (
  <div className="flex flex-col gap-[30px] bg-[rgba(88,60,207,0.02)] shadow-[0_8px_13px_0_rgba(0,0,0,0.04),4px_5px_6px_0_rgba(255,255,255,0.4)_inset,-1px_-3px_4px_0_rgba(255,255,255,0.4)_inset] backdrop-blur-[7.5px] p-[30px] border border-[rgba(0,0,0,0.22)] rounded-[8px]">
    <div>
      <p className="font-semibold text-[20px]">კომპანიის ინფორმაცია</p>
      <p className="text-[#000000AD] text-[14px]">
        განაახლე თქვენი კომპანიის ინფორმაცია
      </p>
    </div>

    <div className="flex justify-between gap-[30px]">
      <div className="flex flex-col gap-[16px] w-full max-w-[545px]">
        <label className="font-bold text-[18px] cursor-pointer">
          კომპანიის სახელი
        </label>
        <input
          type="text"
          readOnly={!changeProfile}
          defaultValue={profile?.company_name || ''}
          {...register('company_name')}
          className="bg-[rgba(255,255,255,0.14)] shadow-[4px_5px_6px_0_rgba(255,255,255,0.4)_inset,-1px_-3px_4px_0_rgba(255,255,255,0.4)_inset,0_8px_13px_0_rgba(0,0,0,0.04)] px-[18px] border border-[#E3E8EF] rounded-[8px] min-h-[56px] font-bold text-[18px]"
        />
        {errors.company_name && (
          <p className="text-red-500 text-sm">{errors.company_name.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-[16px] w-full max-w-[545px]">
        <label className="font-bold text-[18px] cursor-pointer">
          ინდუსტრია
        </label>
        <input
          type="text"
          readOnly={!changeProfile}
          defaultValue={profile?.business_industry_name || ''}
          {...register('business_industry_name')}
          className="bg-[rgba(255,255,255,0.14)] shadow-[4px_5px_6px_0_rgba(255,255,255,0.4)_inset,-1px_-3px_4px_0_rgba(255,255,255,0.4)_inset,0_8px_13px_0_rgba(0,0,0,0.04)] px-[18px] border border-[#E3E8EF] rounded-[8px] min-h-[56px] font-bold text-[18px]"
        />
      </div>
    </div>
  </div>
);

export default CompanyHeader;
