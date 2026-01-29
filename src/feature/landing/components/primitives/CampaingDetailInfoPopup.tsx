'use client';
import React, { useState } from 'react';
import CampaignDetailHeader from './CampaignDetailHeader';
import CampaignDetailStats from './CampaignDetailStats';
import CampaingPopupSocialMediaSlider from './CampaingPopupSocialMediaSlider';
import Review from './Review';

const CampaingDetailInfoPopup = () => {
  const [isActive, setIsActive] = useState<number>(1);

  return (
    <div className="z-50 fixed inset-0 flex justify-center items-center bg-black/50">
      <div className="bg-[#ffffff] px-[26px] py-[34px] rounded-[8px] w-full max-w-[954px] min-h-[715px]">
        <CampaignDetailHeader />
        <CampaignDetailStats />
        <CampaingPopupSocialMediaSlider
          setIsActive={setIsActive}
          isActive={isActive}
        />
        <div className="mt-[17px]">
          {isActive === 1 && <Review />}
          {isActive === 2 && <div>TikTok Content</div>}
          {isActive === 3 && <div>Instagram Content</div>}
          {isActive === 4 && <div>Facebook Content</div>}
        </div>
      </div>
    </div>
  );
};

export default CampaingDetailInfoPopup;
