import Image from "next/image";
import React from "react";

const CreatorType = () => {
  return (
    <div className="flex max-w-[1222px] w-full mx-auto  border border-[var(--component-border-color)] px-[30px] py-[30px] rounded-[8px] flex-col">
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <h2 className="text-[22px] font-[600] text-[var(--black-color)]">
            შემქმნელის ტიპი
          </h2>
        </div>
        <p className="text-[var(--campaing-form-paragraphs)] text-[19px] mb-[26px]">
          კატეგორია რომელიც აღწერს პროფილს
        </p>
      </div>

      <div className="w-[full] cursor-pointer border border-[var(--button-bg)] rounded-[8px] flex items-center gap-4 px-6 py-4 bg-[var(--creator-type-bg)]">
        <div className="flex flex-col gap-[17px]">
          <div className="flex gap-2">
            <Image src="/images/svg/cup.svg" width={23} height={23} alt="cup" />
            <span className="font-[600] text-[16px]  text-[var(--black-color)]">
              გამოცდილი შემქმნელი
            </span>
          </div>

          <span className="text-[14px] text-[var(--campaing-form-paragraphs)] px-[28px]">
            შემქმნელები დადასტურებული კონტენტის გამოცდილებით
          </span>
        </div>
      </div>
    </div>
  );
};

export default CreatorType;
