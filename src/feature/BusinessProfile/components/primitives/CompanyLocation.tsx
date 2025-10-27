import React from 'react';
import Image from 'next/image';

type Props = {
  profile: any;
  changeProfile: boolean;
  register: any;
};

const CompanyLocation: React.FC<Props> = ({
  profile,
  changeProfile,
  register,
}) => {
  return (
    <div className="flex flex-col gap-[16px] bg-[rgba(88,60,207,0.02)] shadow-[0_8px_13px_0_rgba(0,0,0,0.04),4px_5px_6px_0_rgba(255,255,255,0.4)_inset,-1px_-3px_4px_0_rgba(255,255,255,0.4)_inset] backdrop-blur-[7.5px] p-[30px] border border-[rgba(0,0,0,0.22)] rounded-[8px] w-full max-w-[1225px]">
      <div className="flex gap-[75px] w-full">
        <div className="flex flex-col gap-[16px] w-full">
          <label htmlFor="location" className="font-bold text-[18px]">
            ლოკაცია
          </label>
          <div className="flex items-center gap-[10px] w-full">
            <Image
              src={'/images/businessProfileIcon/svg/map-pin.svg'}
              alt="email"
              width={24}
              height={24}
            />
            <input
              type="text"
              id="location"
              readOnly={!changeProfile}
              defaultValue={profile?.location || ''}
              {...register('location')}
              className="bg-[rgba(255,255,255,0.14)] shadow-[4px_5px_6px_0_rgba(255,255,255,0.4)_inset,-1px_-3px_4px_0_rgba(255,255,255,0.4)_inset,0_8px_13px_0_rgba(0,0,0,0.04)] backdrop-blur-[7.5px] px-[18px] border border-[#E3E8EF] rounded-[8px] w-full min-h-[56px] font-bold text-[#000000D4] text-[18px]"
            />
          </div>
        </div>

        <div className="flex flex-col gap-[16px] w-full">
          <label htmlFor="employeeRange" className="font-bold text-[18px]">
            კომპანიის ზომა
          </label>
          <div className="flex items-center gap-[10px] w-full">
            <Image
              src={'/images/businessProfileIcon/svg/users.svg'}
              alt="email"
              width={24}
              height={24}
            />
            <input
              type="text"
              id="employeeRange"
              readOnly={!changeProfile}
              defaultValue={profile?.business_employee_range || ''}
              className="bg-[rgba(255,255,255,0.14)] opacity-60 shadow-[4px_5px_6px_0_rgba(255,255,255,0.4)_inset,-1px_-3px_4px_0_rgba(255,255,255,0.4)_inset,0_8px_13px_0_rgba(0,0,0,0.04)] backdrop-blur-[7.5px] px-[18px] border border-[#E3E8EF] rounded-[8px] w-full min-h-[56px] font-bold text-[#000000D4] text-[18px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyLocation;
