'use client';

import Image from 'next/image';
import FormError from './FormError';
import { CompanyBasicsProps } from '../../type';
import ToggleSwitch from './ToggleSwitch';

const CompanyBasics = ({
  register,
  errors,
  watch,
  setValue,
}: CompanyBasicsProps) => {
  const budgetHidden = watch('budget_hidden') ?? false;

  return (
    <section className="relative bg-white shadow-[0px_12px_32px_-4px_rgba(0,19,86,0.06)] p-10 rounded-[1.5rem] overflow-hidden">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-1">
        <div className="flex justify-center items-center bg-[#0040e0]/10 rounded-xl w-9 h-9 shrink-0">
          <Image
            src="/images/svg/companyBasics.svg"
            width={20}
            height={20}
            alt="logo"
          />
        </div>
        <h2 className="font-bold text-[#171c20] text-2xl">
          კამპანიის საფუძვლები
        </h2>
      </div>
      <p className="mb-8 ml-12 text-[#434656] text-sm">
        დააყენეთ თქვენი კამპანიის ფუნდამენტური დეტალები
      </p>

      <div className="space-y-6">
        {/* Campaign Name */}
        <div>
          <label className="block mb-2 px-1 font-semibold text-[#0040e0] text-xs uppercase tracking-wide">
            კამპანიის სახელი
          </label>
          <input
            type="text"
            placeholder="მაგ: საზაფხულო პროდუქტი"
            {...register('name')}
            className="bg-[#eff4f9] px-5 py-4 border-none rounded-xl focus:outline-none focus:ring-[#0040e0] focus:ring-2 w-full text-[#171c20] placeholder:text-[#747688]/50 transition-all"
          />
          <FormError message={errors.name?.message} />
        </div>

        {/* Budget Row */}
        <div className="flex flex-wrap justify-between items-center gap-4 bg-[#eff4f9] p-6 rounded-xl">
          <div>
            <p className="font-bold text-[#171c20]">ბიუჯეტი (ლარში)</p>
            <p className="text-[#434656] text-sm">
              მიუთითეთ კამპანიის სასურველი ბიუჯეტი
            </p>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <input
              type="number"
              placeholder="₾ 5000"
              {...register('budget')}
              className="bg-white px-5 py-2.5 border-none rounded-xl focus:outline-none focus:ring-[#0040e0] focus:ring-2 w-36 font-bold text-[#171c20] placeholder:text-[#747688]/50 text-right transition-all"
              style={{ MozAppearance: 'textfield' }}
            />
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <span className="font-medium text-[#434656] text-sm whitespace-nowrap">
                დამალე ბიუჯეტი
              </span>
              <ToggleSwitch
                value={budgetHidden}
                onToggle={(newValue) =>
                  setValue('budget_hidden', newValue, {
                    shouldValidate: true,
                    shouldDirty: true,
                  })
                }
              />
            </label>
          </div>
        </div>
        <FormError message={errors.budget?.message} />
        <FormError message={errors.budget_hidden?.message} />

        {/* Description */}
        <div>
          <label className="block mb-2 px-1 font-semibold text-[#0040e0] text-xs uppercase tracking-wide">
            კამპანიის აღწერა
          </label>
          <textarea
            placeholder="აღწერეთ თქვენი კამპანიის მიზნები, სამიზნე აუდიტორია და რას ეძებთ შემქმნელებში..."
            {...register('description')}
            className="bg-[#eff4f9] px-5 py-4 border-none rounded-xl focus:outline-none focus:ring-[#0040e0] focus:ring-2 w-full text-[#171c20] placeholder:text-[#747688]/50 transition-all resize-none"
            rows={4}
          />
          <FormError message={errors.description?.message} />
        </div>
      </div>
    </section>
  );
};

export default CompanyBasics;
