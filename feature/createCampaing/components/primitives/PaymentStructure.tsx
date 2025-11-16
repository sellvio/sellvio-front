"use client";
import { useState } from "react";
import Image from "next/image";
import DropDownInput from "./DropDownInput";
import { costOptions } from "../../data/data";

const PaymentStructure = () => {
  const [description, setDescription] = useState(
    "კონფენსაცია, თუ როგორ მიიღებენ კომპენსაციას შემმნელები"
  );

  const handleCostTypeChange = (value: string) => {
    const selectedOption = costOptions.find((option) => option.value === value);
    if (selectedOption && selectedOption.description) {
      setDescription(selectedOption.description);
    }
  };

  return (
    <div className="flex flex-col bg-[var(--company-basics-bg)] mx-auto px-[30px] py-[30px] border rounded-[8px] w-full max-w-[1222px]  border-[var(--createCampaing-border)]">
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <Image
            src="/images/svg/payment.svg"
            width={22}
            height={22}
            alt="logo"
          />
          <h2 className="font-[600] text-[var(--black-color)] text-[27px]">
            გადახდის სტრუქტურა
          </h2>
        </div>
        <p className="text-[var(--campaing-form-paragraphs)] text-[14px]">
          {description}
        </p>

        <form className="flex-col">
          <div className="flex flex-col gap-4">
            <h3 className="mt-[26px] font-[700] text-[var(--black-color)] text-[18px]">
              შეთავაზების ტიპი
            </h3>
            <DropDownInput
              placeholder="აირჩიეთ ტიპი"
              options={costOptions}
              onValueChange={handleCostTypeChange}
            />
          </div>

          <div className="flex gap-4 mt-8 flex-wrap">
            <div className="flex flex-col flex-5 min-w-[250px] max-w-[900px]">
              <h3 className="mb-4 font-[700] text-[var(--black-color)] text-[18px]">
                გადახდის მოდელი
              </h3>
              <input
                type="text"
                placeholder="რაოდენობა"
                className="px-3 py-2 border  rounded-[8px] outline-none w-full font-[700] text-[var(--black-color)] bg-[#FFFFFF1A] border-[#FFFFFF] shadow-[4px_5px_6px_0px_#FFFFFF66_inset] backdrop-blur-[7.5px]"
              />
            </div>

            <div className="flex flex-col flex-1 min-w-[250px] max-w-[900px]">
              <h3 className="invisible mb-4 font-[700] text-[var(--black-color)] text-[18px]">
                გადახდის მოდელი
              </h3>
              <input
                type="text"
                placeholder="თანხა"
                className="px-3 py-2 border  rounded-[8px] outline-none w-full font-[700] text-[var(--black-color)] bg-[#FFFFFF1A] border-[#FFFFFF] shadow-[4px_5px_6px_0px_#FFFFFF66_inset] backdrop-blur-[7.5px]"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentStructure;
