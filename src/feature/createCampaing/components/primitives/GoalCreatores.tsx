'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import { GoalCards } from '../../../../../feature/createCampaing/data/data';

const GoalCreatores = () => {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleCard = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex flex-col bg-[var(--company-basics-bg)] mx-auto px-[30px] py-[30px] border border-[var(--createCampaing-border)] rounded-[8px] w-full">
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <Image
            src="/images/svg/creators.svg"
            width={22}
            height={22}
            alt="logo"
          />
          <h2 className="font-[600] text-[27px] text-[var(--black-color)]">
            სამიზნე შემქმნელების ტიპი
          </h2>
        </div>
        <p className="mb-[26px] text-[14px] text-[var(--campaing-form-paragraphs)]">
          აირჩიეთ რომელ ტიპის შემქმნელებთან გსურთ მუშაობა ამ კამპანიისთვის
          (არასავალდებულო)
        </p>
      </div>
      <div className="flex flex-wrap gap-6 w-full">
        {GoalCards?.map((eachelement) => {
          const isSelected = selected.includes(eachelement.id);

          return (
            <div
              tabIndex={0}
              key={eachelement.id}
              onClick={() => toggleCard(eachelement.id)}
              className={`w-full lg:max-w-[677px] m-auto h-[111px] cursor-pointer border  rounded-[8px] flex items-center gap-4 px-6 py-4 bg-[#FFFFFF1A] border-[#FFFFFF] shadow-[4px_5px_6px_0px_#FFFFFF66_inset]
=
         backdrop-blur-[7.5px] 
                ${
                  isSelected ? 'bg-[var(--goal-auditory-bg)]' : 'bg-transparent'
                }`}
            >
              <div className="flex justify-center items-center bg-[var(--goal-auditory-icons-bg)] rounded-md w-[48px] h-[48px]">
                <Image
                  src={eachelement.img}
                  width={23}
                  height={23}
                  alt={eachelement.title}
                />
              </div>

              <div className="flex flex-col">
                <span className="font-[600] text-[16px] text-[var(--black-color)]">
                  {eachelement.title}
                </span>
                <span className="text-[14px] text-[var(--campaing-form-paragraphs)]">
                  {eachelement.descr}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GoalCreatores;
