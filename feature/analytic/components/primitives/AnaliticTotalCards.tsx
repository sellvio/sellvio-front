"use client";
import { useState } from "react";
import ToggleButtons from "../../../createCampaing/components/primitives/ToggleButtons";
import { analyticCards } from "../../data/data";

const AnaliticTotalCards = () => {
  const [active, setActive] = useState<"analytic" | "campaing">("analytic");
  return (
    <div className="px-[27px] flex flex-col">
      <ToggleButtons active={active} setActive={setActive} />
      <h3 className="font-[600] text-[22px] mb-[26px] ">ანალიტიკა</h3>
      <div className="max-w-[1440px] w-full flex gap-[17px]">
        {analyticCards.map((eachElement) => (
          <div
            key={eachElement.id}
            className="w-[334px] h-[107px] bg-[var(--analytic-cards-border)] rounded-[8px] border border-[var(--lending-border))] flex flex-col justify-center px-6 gap-[6px] "
          >
            <p className="text-[14px] font-[500]">{eachElement.title}</p>
            <p className=" font-[600]">{eachElement.quantity}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnaliticTotalCards;
// var(--lending-border)
