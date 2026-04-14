'use client';

import Image from 'next/image';
import { CompanyBasicsProps } from '../../type'; // ვიყენებთ იგივე ტიპებს რაც basics-შია
import FormError from './FormError';

const CompanyDetails = ({
  register,
  errors,
  setValue,
  watch,
}: CompanyBasicsProps) => {
  return (
    <div className="flex flex-col justify-center gap-[26px] bg-[#0866FF33] px-[30px] py-[30px] border border-[#00000038] rounded-[8px] w-full">
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <Image
            src="/images/svg/companyDetails.svg"
            width={22}
            height={22}
            alt="logo"
          />
          <h2 className="font-[600] text-[27px]">კამპანიის დეტალები</h2>
        </div>
        <p className="text-[14px] text-[var(--campaing-form-paragraphs)]">
          კამპანიის მოთხოვნები და დამატებითი კონფიგურაცია
        </p>
      </div>

      <div className="flex gap-[75px] w-full">
        <div className="flex flex-col gap-[16px] w-1/2">
          <p className="font-bold text-[18px]">კამპანიის დაწყების თარიღი</p>
          <div className="flex flex-col gap-2">
            <div className="flex gap-[16px]">
              <input
                type="date"
                {...register('duration_days')}
                className="bg-[#FFFFFF1A] shadow-[4px_5px_6px_0px_#FFFFFF66_inset] backdrop-blur-[7.5px] px-3 py-2 border border-[#FFFFFF] rounded-[8px] outline-none w-full min-h-[56px] font-[700] text-[var(--black-color)] appearance-none"
              />
              <div className="flex justify-center items-center bg-[#DBDBDB59] border border-[#E3E8EF] rounded-[8px] w-[58px] h-[58px] shrink-0">
                <Image
                  src="/images/svg/calendar.svg"
                  width={22}
                  height={22}
                  alt="calendar"
                />
              </div>
            </div>
            <FormError message={errors.duration_days?.message} />
          </div>
        </div>

        <div className="flex flex-col gap-[16px] w-1/2">
          <p className="font-bold text-[18px]">სამიზნე აუდიტორია</p>
          <div className="flex flex-col gap-2">
            <input
              placeholder="მაგ: ტექნოლოგიების მოყვარული, 18-35 წლის"
              type="text"
              {...register('target_audience')}
              className="bg-[#FFFFFF1A] shadow-[4px_5px_6px_0px_#FFFFFF66_inset] backdrop-blur-[7.5px] px-3 py-2 border border-[#FFFFFF] rounded-[8px] outline-none w-full min-h-[56px] font-[700] text-[var(--black-color)]"
            />
            <FormError message={errors.target_audience?.message} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetails;
