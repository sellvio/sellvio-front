"use client";

import Image from "next/image";
import { GoalCards } from "../../data/data";
import { useFormContext } from "react-hook-form";
import { CampaignSchema } from "../../schema/schema";

// მაპინგი: შენი GoalCards id ("1", "2", "3", "4") → Zod enum მნიშვნელობები
const idToCreatorType: Record<
  string,
  "beginner" | "influencer" | "expert" | "creator"
> = {
  "1": "influencer", // ინფლუენსერი
  "2": "expert", // გამოცდილი შემქმნელი
  "3": "beginner", // დამწყები შემქმნელი
  "4": "creator", // კლიპერი → ჩავთვალეთ creator-ად (შეგიძლია "expert"-ად შეცვალო თუ გინდა)
};

const GoalCreatores = () => {
  const { setValue, watch } = useFormContext<CampaignSchema>();
  const selectedCreatorTypes = watch("target_creator_types") ?? [];

  // განსაზღვრავს არის თუ არა კონკრეტული კარტი არჩეული (UI-სთვის)
  const isCardSelected = (cardId: string) => {
    const creatorType = idToCreatorType[cardId];
    return creatorType ? selectedCreatorTypes.includes(creatorType) : false;
  };

  // კარტის არჩევა/გაუქმება
  const toggleCard = (cardId: string) => {
    const creatorType = idToCreatorType[cardId];

    if (!creatorType) return; // უსაფრთხოება, თუ id არ არის მაპინგში

    const newSelected = selectedCreatorTypes.includes(creatorType)
      ? selectedCreatorTypes.filter((item) => item !== creatorType)
      : [...selectedCreatorTypes, creatorType];

    setValue("target_creator_types", newSelected, { shouldValidate: true });
  };

  return (
    <div className="max-w-[1222px] w-full bg-[var(--company-basics-bg)] mx-auto rounded-[8px] px-[30px] py-[30px] flex flex-col border border-[var(--createCampaing-border)]">
      {/* სათაური */}
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <Image
            src="/images/svg/creators.svg"
            width={22}
            height={22}
            alt="შემქმნელები"
          />
          <h2 className="text-[27px] font-[600] text-[var(--black-color)]">
            სამიზნე შემქმნელების ტიპი
          </h2>
        </div>
        <p className="text-[var(--campaing-form-paragraphs)] text-[14px] mb-[26px]">
          აირჩიეთ რომელ ტიპის შემქმნელებთან გსურთ მუშაობა ამ კამპანიისთვის
          (არასავალდებულო)
        </p>
      </div>

      {/* კარტები */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {GoalCards?.map((card) => {
          const isSelected = isCardSelected(card.id);

          return (
            <button
              type="button" // მნიშვნელოვანია — რომ ფორმა არ გაისუბმიტოს
              key={card.id}
              onClick={() => toggleCard(card.id)}
              className={`
                w-full h-[111px] cursor-pointer border rounded-[8px] 
                flex items-center gap-4 px-6 py-4 
                bg-[#FFFFFF1A] border-[#FFFFFF] 
                shadow-[4px_5px_6px_0px_#FFFFFF66_inset] 
                backdrop-blur-[7.5px] 
                transition-all duration-200
                ${
                  isSelected
                    ? "bg-[var(--goal-auditory-bg)] ring-4 ring-[var(--button-bg)] ring-opacity-50"
                    : "hover:bg-[#FFFFFF33] hover:scale-[1.02]"
                }
              `}
            >
              <div className="w-[48px] h-[48px] flex justify-center items-center bg-[var(--goal-auditory-icons-bg)] rounded-md flex-shrink-0">
                <Image src={card.img} width={23} height={23} alt={card.title} />
              </div>

              <div className="flex flex-col text-left">
                <span className="font-[600] text-[16px] text-[var(--black-color)]">
                  {card.title}
                </span>
                <span className="text-[14px] text-[var(--campaing-form-paragraphs)]">
                  {card.descr}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default GoalCreatores;
