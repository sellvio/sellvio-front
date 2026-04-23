'use client';

import Image from 'next/image';
import React from 'react';
import FormError from './FormError';
import { CreatorType, GoalCreatoresProps } from '../../type';
import { GoalCards } from '../../data/data';

const GoalCreatores = ({ selected, setValue, errors }: GoalCreatoresProps) => {
  const toggleCard = (id: CreatorType) => {
    const currentValues = selected || [];

    const updatedValues = currentValues.includes(id)
      ? currentValues.filter((item) => item !== id)
      : [...currentValues, id];

    setValue('target_creator_types', updatedValues, {
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
            src="/images/svg/creators.svg"
            width={20}
            height={20}
            alt="logo"
          />
        </div>
        <div>
          <h2 className="font-bold text-[#171c20] text-2xl">
            სამიზნე შემქმნელების ტიპი
          </h2>
          <p className="text-[#434656] text-sm">
            აირჩიეთ რომელ ტიპის შემქმნელებთან გსურთ მუშაობა ამ კამპანიისთვის
          </p>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
        {GoalCards.map((eachelement) => {
          const isSelected = selected?.includes(eachelement.id);

          return (
            <button
              type="button"
              key={eachelement.id}
              onClick={() => toggleCard(eachelement.id)}
              className={`group p-8 bg-white rounded-xl border-2 transition-all cursor-pointer flex items-center gap-5 text-left relative hover:shadow-lg ${
                isSelected
                  ? 'border-[#0040e0] shadow-[0px_8px_24px_-4px_rgba(0,64,224,0.15)]'
                  : 'border-transparent hover:border-[#0040e0]/20'
              }`}
            >
              {isSelected && (
                <div className="top-0 right-0 absolute bg-[#0040e0] px-3 py-1 rounded-tr-xl rounded-bl-xl font-black text-[10px] text-white uppercase tracking-widest">
                  Selected
                </div>
              )}
              <div
                className={`p-3 rounded-xl transition-all shrink-0 ${
                  isSelected
                    ? 'bg-[#0040e0] text-white'
                    : 'bg-[#0040e0]/5 text-[#0040e0] group-hover:bg-[#0040e0] group-hover:text-white'
                }`}
              >
                <Image
                  src={eachelement.img}
                  width={28}
                  height={28}
                  alt={eachelement.title}
                  className={
                    isSelected
                      ? 'brightness-0 invert'
                      : 'group-hover:brightness-0 group-hover:invert'
                  }
                />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-[#171c20] text-lg">
                  {eachelement.title}
                </span>
                <span className="text-[#434656] text-sm">
                  {eachelement.descr}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {errors.target_creator_types?.message && (
        <FormError message={errors.target_creator_types.message} />
      )}
    </div>
  );
};

export default GoalCreatores;
