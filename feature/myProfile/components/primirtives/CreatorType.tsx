import Image from "next/image";
import React from "react";
import { CreatorTypeValue } from "../../types";
import { creatorTypeOptions } from "../../data/data";

type CreatorTypeProps = {
  value: CreatorTypeValue | null;
  isEditing: boolean;
  onChange: (value: CreatorTypeValue) => void;
};

const CreatorType = ({ value, isEditing, onChange }: CreatorTypeProps) => {
  const options = isEditing
    ? creatorTypeOptions
    : creatorTypeOptions.filter((option) => option.value === value);

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

      {options.length === 0 && (
        <p className="text-[var(--campaing-form-paragraphs)]">
          შემქმნელის ტიპი არ არის მითითებული
        </p>
      )}

      <div className="flex flex-col gap-3">
        {options.map((option) => {
          const isSelected = option.value === value;
          return (
            <button
              type="button"
              key={option.value}
              disabled={!isEditing}
              onClick={() => onChange(option.value)}
              className={`w-full text-left rounded-[8px] flex items-center gap-4 px-6 py-4 border ${
                isSelected
                  ? "border-[var(--button-bg)] bg-[var(--creator-type-bg)]"
                  : "border-[var(--component-border-color)]"
              } ${isEditing ? "cursor-pointer" : "cursor-default"}`}
            >
              <div className="flex flex-col gap-[17px]">
                <div className="flex gap-2">
                  <Image src={option.img} width={23} height={23} alt="" />
                  <span className="font-[600] text-[16px]  text-[var(--black-color)]">
                    {option.title}
                  </span>
                </div>

                <span className="text-[14px] text-[var(--campaing-form-paragraphs)] px-[28px]">
                  {option.descr}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CreatorType;
