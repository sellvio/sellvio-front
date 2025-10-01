"use client";
import { useState } from "react";
import ToggleButtons from "../../../createCampaing/components/primitives/ToggleButtons";
import { creatorAnalytic } from "../../data/data";

const CreatorAnalityc = () => {
  const [active, setActive] = useState<"analytic" | "campaing">("analytic");

  return (
    <div className="px-[15px] flex flex-col max-w-[1440px] w-full mx-auto">
      <ToggleButtons active={active} setActive={setActive} />
      <h3 className="font-[600] text-[22px] mb-[26px] pl-[11px]">ანალიტიკა</h3>
      <div className="max-w-[1440px] w-full flex flex-wrap justify-center gap-[17px]">
        {creatorAnalytic.map((eachElement) => (
          <div
            key={eachElement.id}
            className="w-[334px] h-[107px] bg-[var(--analytic-cards-border)] rounded-[8px] border border-[var(--lending-border))] flex flex-col justify-center px-6 gap-[6px]"
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
