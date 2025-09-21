import Image from "next/image";
import React from "react";
import { GoalCards } from "../../data/data";

const GoalCreatores = () => {
  return (
    <div className="lg:max-w-[1222px] lg:w-full bg-transparent mx-auto  rounded-[8px] px-[30px] py-[30px] flex flex-wrap border ">
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <Image
            src="/images/svg/creators.svg"
            width={22}
            height={22}
            alt="logo"
          />
          <h2 className="text-[27px] font-[600] text-[#000000]">
            სამიზნე შემქმნელების ტიპი
          </h2>
        </div>
        <p className="text-[#000000AD] text-[14px] mb-[26px]">
          აირჩიეთ რომელ ტიპის შემქმნელებთან გსურთ მუშაობა ამ კამპანიისთვის
          (არასავალდებულო)
        </p>
      </div>
      <div className="flex gap-6 w-full flex-wrap">
        {GoalCards?.map((eachelement) => (
          <div
            key={eachelement.id}
            className="w-[566px] h-[111px] cursor-pointer border rounded-[8px] flex items-center gap-4 px-6 py-4 bg-[#0866FF05]"
          >
            <div className="w-[48px] h-[48px] flex justify-center items-center bg-[#E6F1FF] rounded-md">
              <Image
                src={eachelement.img}
                width={23}
                height={23}
                alt={eachelement.title}
              />
            </div>

            <div className="flex flex-col">
              <span className="font-[600] text-[16px] text-[#000000]">
                {eachelement.title}
              </span>
              <span className="text-[14px] text-[#000000AD]">
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
