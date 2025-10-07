"use client";
import { creatorAnalytic } from "../../data/data";

const CreatorAnalityc = () => {
  return (
    <div className="flex flex-col max-w-[1387px] w-full mx-auto border rounded-[8px] py-[22px] px-[15px]">
      <h3 className="font-[600] text-[22px] mb-[26px]">ანალიტიკა</h3>
      <div className="max-w-[1440px] w-full flex flex-wrap gap-[17px]">
        {creatorAnalytic.map((eachElement) => (
          <div
            key={eachElement.id}
            className={`
              w-[325px] h-[107px] 
              rounded-[8px] 
              border border-[var(--lending-border)] 
              flex flex-col justify-center items-center px-6 gap-[6px] 
              ${eachElement.bg} ${eachElement.text}
            `}
          >
            <p className="font-[600] text-[28px]">{eachElement.quantity}</p>
            <p className="text-[14px] font-[500]">{eachElement.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreatorAnalityc;
