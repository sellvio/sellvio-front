'use client';
import Image from 'next/image';
import { useFormContext } from 'react-hook-form';
import { CampaignSchema } from '../../../../../feature/createCampaing/schema/schema';
import { Socmedia } from '../../../../../feature/createCampaing/data/data';

const platformTitleToEnum = (
  title: string
): CampaignSchema['platforms'][number] => {
  const mapping: Record<string, CampaignSchema['platforms'][number]> = {
    instagram: 'instagram',
    Instagram: 'instagram',
    'Tik Tok': 'tiktok',
    tiktok: 'tiktok',
    TikTok: 'tiktok',
    Facebook: 'facebook',
    facebook: 'facebook',
    Youtube: 'youtube',
    youtube: 'youtube',
    YouTube: 'youtube',
  };
  return (
    mapping[title] ||
    (title.toLowerCase() as CampaignSchema['platforms'][number])
  );
};

const Platforms = () => {
  const methods = useFormContext<CampaignSchema>();

  if (!methods) {
    console.warn('Platforms must be used within a FormProvider');
    return null;
  }

  const {
    setValue,
    watch,
    formState: { errors },
  } = methods;

  const selectedPlatforms = watch('platforms') || [];

  const togglePlatform = (platformTitle: string) => {
    const enumValue = platformTitleToEnum(platformTitle);
    const currentPlatforms = selectedPlatforms as string[];

    const newPlatforms = currentPlatforms.includes(enumValue)
      ? currentPlatforms.filter((item) => item !== enumValue)
      : [...currentPlatforms, enumValue];

    setValue('platforms', newPlatforms as CampaignSchema['platforms'], {
      shouldValidate: true,
    });
  };

  return (
    <div className="flex flex-col bg-[var(--company-basics-bg)] mx-auto px-[30px] py-[30px] border border-[var(--createCampaing-border)] rounded-[8px] w-full max-w-[1222px]">
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <Image
            src="/images/svg/platforms.svg"
            width={22}
            height={22}
            alt="logo"
          />
          <h2 className="font-[600] text-[27px] text-[var(--black-color)]">
            აირჩიე პლატფორმები
          </h2>
        </div>
        <p className="text-[14px] text-[var(--campaing-form-paragraphs)]">
          აირჩიე რომელ პლატფორმებზე გსურთ ამ კამპანიის მიზნობრივი გამოყენება
        </p>
      </div>

      <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-[26px] w-full">
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
                    ? 'bg-[var(--selected-cards)] border-[var(--selected-cards)]'
                    : 'bg-transparent'
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
        <p className="mt-4 text-red-500 text-sm">{errors.platforms.message}</p>
      )}
    </div>
  );
};

export default Platforms;
