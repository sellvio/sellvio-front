"use client";
import Image from "next/image";
import { useState } from "react";
import { z } from "zod";
import { campaignSchema } from "../../schema/schema";
import { Socmedia } from "../../data/data";

const platformsSchema = campaignSchema.pick({ platforms: true });

interface PlatformsProps {
  onChange?: (value: string[], errors?: string[]) => void;
  defaultValue?: string[];
}

const Platforms = ({ onChange, defaultValue = [] }: PlatformsProps) => {
  const [selected, setSelected] = useState<string[]>(defaultValue);
  const [errors, setErrors] = useState<string[]>([]);

  const togglePlatform = (platformTitle: string) => {
    const newSelected = selected.includes(platformTitle)
      ? selected.filter((item) => item !== platformTitle)
      : [...selected, platformTitle];

    setSelected(newSelected);
    validateAndNotify(newSelected);
  };

  const validateAndNotify = (platforms: string[]) => {
    try {
      const result = platformsSchema.parse({ platforms });
      setErrors([]);
      onChange?.(result.platforms, []);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessages = error.issues.map(
          (issue: z.ZodIssue) => issue.message
        );
        setErrors(errorMessages);
        onChange?.(platforms, errorMessages);
      }
    }
  };

  return (
    <div className="max-w-[1222px] w-full bg-[var(--company-basics-bg)] mx-auto rounded-[8px] px-[30px] py-[30px] flex flex-col border border-[var(--createCampaing-border)]">
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <Image
            src="/images/svg/platforms.svg"
            width={22}
            height={22}
            alt="logo"
          />
          <h2 className="text-[27px] font-[600] text-[var(--black-color)]">
            აირჩიე პლატფორმები
          </h2>
        </div>
        <p className="text-[var(--campaing-form-paragraphs)] text-[14px]">
          აირჩიე რომელ პლატფორმებზე გსურთ ამ კამპანიის მიზნობრივი გამოყენება
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full mt-[26px]">
        {Socmedia?.map((eachelement) => {
          const isSelected = selected.includes(eachelement.title);

          return (
            <button
              key={eachelement.id}
              type="button"
              onClick={() => togglePlatform(eachelement.title)}
              className={`lg:w-[264px] h-[111px] border lg:mx-auto rounded-[8px] 
                flex flex-col items-center justify-center gap-4 cursor-pointer 
                transition-colors outline-none bg-[#FFFFFF1A] border-[#FFFFFF] shadow-[4px_5px_6px_0px_#FFFFFF66_inset]
                backdrop-blur-[7.5px]
                ${
                  isSelected
                    ? "bg-[var(--selected-cards)] border-[var(--selected-cards)]"
                    : "bg-transparent"
                }`}
            >
              <Image
                src={eachelement.img}
                width={36}
                height={36}
                alt={eachelement.title}
              />
              <span className="font-[600] text-[var(--black-color)]">
                {eachelement.title}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Platforms;
