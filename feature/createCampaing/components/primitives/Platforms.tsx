"use client";
import Image from "next/image";
import { useFormContext } from "react-hook-form";
import { CampaignSchema } from "../../schema/schema";
import { Socmedia } from "../../data/data";

const platformTitleToEnum = (
  title: string
): CampaignSchema["platforms"][number] => {
  const mapping: Record<string, CampaignSchema["platforms"][number]> = {
    instagram: "instagram",
    Instagram: "instagram",
    "Tik Tok": "tiktok",
    tiktok: "tiktok",
    TikTok: "tiktok",
    Facebook: "facebook",
    facebook: "facebook",
    Youtube: "youtube",
    youtube: "youtube",
    YouTube: "youtube",
  };
  return (
    mapping[title] ||
    (title.toLowerCase() as CampaignSchema["platforms"][number])
  );
};

const Platforms = () => {
  const methods = useFormContext<CampaignSchema>();

  if (!methods) {
    console.warn("Platforms must be used within a FormProvider");
    return null;
  }

  const {
    setValue,
    watch,
    formState: { errors },
  } = methods;

  const selectedPlatforms = watch("platforms") || [];

  const togglePlatform = (platformTitle: string) => {
    const enumValue = platformTitleToEnum(platformTitle);
    const currentPlatforms = selectedPlatforms as string[];

    const newPlatforms = currentPlatforms.includes(enumValue)
      ? currentPlatforms.filter((item) => item !== enumValue)
      : [...currentPlatforms, enumValue];

    setValue("platforms", newPlatforms as CampaignSchema["platforms"], {
      shouldValidate: true,
    });
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
          const enumValue = platformTitleToEnum(eachelement.title);
          const isSelected = selectedPlatforms.includes(enumValue);

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

      {errors.platforms && (
        <p className="text-red-500 text-sm mt-4">{errors.platforms.message}</p>
      )}
    </div>
  );
};

export default Platforms;
