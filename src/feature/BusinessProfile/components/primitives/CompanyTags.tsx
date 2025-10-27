import React from 'react';
import Image from 'next/image';

type Props = {
  profile: any;
};

const CompanyTags: React.FC<Props> = ({ profile, changeProfile }) => {
  return (
    <div className="flex flex-col gap-[30px] bg-[rgba(88,60,207,0.02)] shadow-[0_8px_13px_0_rgba(0,0,0,0.04),4px_5px_6px_0_rgba(255,255,255,0.4)_inset,-1px_-3px_4px_0_rgba(255,255,255,0.4)_inset] backdrop-blur-[7.5px] p-[30px] border border-[rgba(0,0,0,0.22)] rounded-[8px] w-full max-w-[1225px]">
      <div>
        <p className="font-semibold text-[20px] text-[600]">
          კონტენტის კატეგორია
        </p>
        <p className="text-[#000000AD] text-[14px]">
          აირჩიეთ კატეგორიები რომლებიც შეესაბამება თქვენი კონტენტის სტილს
        </p>
      </div>
      <div className="flex gap-[8px]">
        {changeProfile && (
          <div className="flex justify-between items-center bg-[#FFFFFF24] pr-[18px] border border-[#E3E8EF] rounded-[8px] w-full max-w-[463px] min-h-[42px]">
            <input
              placeholder="შეიყვანეთ კონტენტის კატეგორია..."
              type="text"
              className="px-[18px] outline-none w-full h-full min-h-[42px] font-bold text-[#111827] text-[18px]"
            />
            <button className="cursor-pointer" type="button" disabled>
              <Image
                src={'/images/businessProfileIcon/svg/categoryPlus.svg'}
                alt="pluse"
                width={22}
                height={22}
              />
            </button>
          </div>
        )}
        <div className="flex gap-[8px]">
          {profile?.business_tags?.map((tag: any) => (
            <div
              key={tag.tag_id}
              className="bg-[#3012B31F] px-[22px] py-[10px] border border-[#3012B3] rounded-[8px] font-semibold text-[#111827]"
            >
              {tag.tags?.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompanyTags;
