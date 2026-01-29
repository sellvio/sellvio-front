import React from 'react';
import CampaignDetailHeader from './CampaignDetailHeader';
import CampaignDetailStats from './CampaignDetailStats';
import CampaingPopupSocialMediaSlider from './CampaingPopupSocialMediaSlider';

const CampaingDetailInfoPopup = () => {
  return (
    <div className="z-50 fixed inset-0 flex justify-center items-center bg-black/50">
      <div className="bg-[#ffffff] px-[26px] py-[34px] rounded-[8px] w-full max-w-[954px] min-h-[715px]">
        <CampaignDetailHeader />
        <CampaignDetailStats />
        <CampaingPopupSocialMediaSlider />
      </div>
    </div>
  );
};

export default CampaingDetailInfoPopup;
