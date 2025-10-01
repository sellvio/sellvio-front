"use client";

import { creatorAnalytic } from "../../data/data";

const CreatorAnalityc = () => {
  return (
    <div className="flex flex-col max-w-[1440px] w-full mx-auto items-start">
      <h3 className="font-[600] text-[22px] mb-[26px]">ანალიტიკა</h3>
      <div className="max-w-[1440px] w-full flex flex-wrap gap-[17px]">
        {creatorAnalytic.map((eachElement) => (
          <div
            key={eachElement.id}
            className="w-[334px] h-[107px] bg-[var(--analytic-cards-border)] rounded-[8px] border border-[var(--lending-border)] flex flex-col justify-center px-6 gap-[6px]"
          >
            <p className="text-[14px] font-[500]">{eachElement.title}</p>
            <p className="font-[600]">{eachElement.quantity}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreatorAnalityc;
