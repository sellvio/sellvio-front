'use client';

import Image from 'next/image';
import FormError from './FormError';
import { PlatformsProps, SocialPlatform } from '../../type';
import { Socmedia } from '../../data/data';

const Platforms = ({ selected, setValue, errors }: PlatformsProps) => {
  const handleTogglePlatform = (value: SocialPlatform) => {
    const currentValues = selected || [];

    const updatedValues = currentValues.includes(value)
      ? currentValues.filter((item) => item !== value)
      : [...currentValues, value];

    setValue('platforms', updatedValues, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center gap-3">
        <div className="flex justify-center items-center bg-[#0040e0]/10 rounded-xl w-9 h-9 shrink-0">
          <Image
            src="/images/svg/platforms.svg"
            width={20}
            height={20}
            alt="logo"
          />
        </div>
        <div>
          <h2 className="font-bold text-[#171c20] text-2xl">
            აირჩიე პლატფორმები
          </h2>
          <p className="text-[#434656] text-sm">
            აირჩიე რომელ პლატფორმებზე გსურთ ამ კამპანიის მიზნობრივი გამოყენება
          </p>
        </div>
      </div>

      {/* Platform Cards Grid */}
      <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {Socmedia.map((eachelement) => {
          const value = eachelement.value as SocialPlatform;
          const isSelected = selected?.includes(value);

          return (
            <button
              key={eachelement.id}
              type="button"
              onClick={() => handleTogglePlatform(value)}
              className={`group bg-white p-6 rounded-xl border-2 transition-all cursor-pointer flex flex-col items-center text-center relative hover:shadow-lg ${
                isSelected
                  ? 'border-[#0040e0] shadow-[0px_8px_24px_-4px_rgba(0,64,224,0.15)]'
                  : 'border-transparent hover:border-[#0040e0]/20'
              }`}
            >
              {isSelected && (
                <div className="top-3 right-3 absolute text-[#0040e0]">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
              <div className="flex justify-center items-center bg-[#eff4f9] mb-4 rounded-full w-16 h-16 group-hover:scale-110 transition-transform">
                <Image
                  src={eachelement.img}
                  width={36}
                  height={36}
                  alt={eachelement.title}
                />
              </div>
              <p className="font-bold text-[#171c20] text-lg">
                {eachelement.title}
              </p>
            </button>
          );
        })}
      </div>

      {errors.platforms?.message && (
        <FormError message={errors.platforms.message} />
      )}
    </div>
  );
};

export default Platforms;
