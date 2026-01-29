'use client';

import { SocialMediaSliderData } from '../../data/SocialMediaSliderData';
import { CampaingPopupSocialMediaSliderProps } from '../../type';

const CampaingPopupSocialMediaSlider = ({
  setIsActive,
  isActive,
}: CampaingPopupSocialMediaSliderProps) => {
  return (
    <div className="flex justify-between items-center bg-[#F2F5F9] mt-[27px] p-[8px] rounded-[8px] w-full min-h-[54px]">
      {SocialMediaSliderData.map((sociMediaAcc) => {
        const isSelected = isActive === sociMediaAcc.id;

        return (
          <button
            key={sociMediaAcc.id}
            type="button"
            onClick={() => setIsActive(sociMediaAcc.id)}
            className={`
              flex justify-center items-center w-full min-h-[40px] rounded-[4px] transition-all duration-200
              ${isSelected ? 'bg-white' : 'bg-transparent'} 
              cursor-pointer
            `}
          >
            <span className="font-bold text-[#000000D4]">
              {sociMediaAcc.socialMedia}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default CampaingPopupSocialMediaSlider;
