import Image from "next/image";
import React from "react";
import { GoalCards } from "../../data/data";

const GoalCreatores = () => {
  return (
    <div className="max-w-[1222px] w-full bg-transparent mx-auto rounded-[8px] px-[30px] border-[var(--createCampaing-border)] py-[30px] flex flex-col border">
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <Image
            src="/images/svg/creators.svg"
            width={22}
            height={22}
            alt="logo"
          />
          <h2 className="text-[27px] font-[600] text-[var(--black-color)]">
            სამიზნე შემქმნელების ტიპი
          </h2>
        </div>
        <p className="text-[var(--campaing-form-paragraphs)] text-[14px] mb-[26px]">
          აირჩიეთ რომელ ტიპის შემქმნელებთან გსურთ მუშაობა ამ კამპანიისთვის
          (არასავალდებულო)
        </p>
      </div>
      <div className="flex gap-6 w-full flex-wrap">
        {GoalCards?.map((eachelement) => (
          <div
            tabIndex={0}
            key={eachelement.id}
            className="w-full
             lg:max-w-[566px] m-auto h-[111px] cursor-pointer border  border-[var(--createCampaing-border)] rounded-[8px] flex items-center gap-4 px-6 py-4  focus:bg-[var(--goal-auditory-bg)]"
          >
            <div className="w-[48px] h-[48px] flex justify-center items-center bg-[var(--goal-auditory-icons-bg)] rounded-md">
              <Image
                src={eachelement.img}
                width={23}
                height={23}
                alt={eachelement.title}
              />
            </div>

            <div className="flex flex-col">
              <span className="font-[600] text-[16px] text-[var( --black-color)]">
                {eachelement.title}
              </span>
              <span className="text-[14px] text-[var(  --campaing-form-paragraphs)]">
                {eachelement.descr}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GoalCreatores;
