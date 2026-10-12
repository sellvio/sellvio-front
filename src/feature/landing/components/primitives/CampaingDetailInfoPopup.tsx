'use client';
import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import CampaignDetailHeader from './CampaignDetailHeader';
import CampaignDetailStats from './CampaignDetailStats';
import CampaingPopupSocialMediaSlider from './CampaingPopupSocialMediaSlider';
import {
  CampaignAssets,
  CampaignOverview,
  CampaignRequirements,
  CampaignVideos,
} from './CampaignDetailTabs';
import { CampaingDetailInfoPopupProps } from '../../type';
import { fetchCampaignById } from '@/lib/api/BusinessCards';

const CampaingDetailInfoPopup = ({
  campaignId,
  onClose,
  onJoin,
}: CampaingDetailInfoPopupProps) => {
  const [isActive, setIsActive] = useState<number>(1);

  const {
    data: campaign,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['campaign', campaignId],
    queryFn: () => fetchCampaignById(campaignId),
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="z-50 fixed inset-0 flex justify-center items-center bg-black/50 cursor-pointer"
      onClick={onClose}
    >
      <div
        className="bg-[#ffffff] px-[26px] py-[34px] rounded-[8px] w-full max-w-[954px] min-h-[300px] max-h-[90vh] overflow-y-auto cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        {isLoading && (
          <div className="flex flex-col gap-[16px] animate-pulse">
            <div className="bg-gray-200 rounded-md w-[300px] h-[24px]" />
            <div className="flex gap-[18px]">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="bg-gray-200 rounded-[8px] w-full max-w-[212px] h-[100px]"
                />
              ))}
            </div>
            <div className="bg-gray-200 rounded-[8px] w-full h-[200px]" />
          </div>
        )}

        {isError && (
          <div className="flex flex-col items-center gap-[12px] mt-[80px]">
            <p className="font-medium text-[16px]">
              კამპანიის ჩატვირთვა ვერ მოხერხდა
            </p>
            <div className="flex gap-[12px]">
              <button
                type="button"
                onClick={() => refetch()}
                className="bg-[#0866FFDB] px-[22px] rounded-[8px] min-h-[30px] font-semibold text-[#FFFFFF] text-[13px] cursor-pointer"
              >
                ხელახლა ცდა
              </button>
              <button
                type="button"
                onClick={onClose}
                className="bg-[#0866FF14] px-[22px] border border-[#0866FF1A] rounded-[8px] min-h-[30px] font-semibold text-[#0866FF] text-[13px] cursor-pointer"
              >
                დახურვა
              </button>
            </div>
          </div>
        )}

        {campaign && (
          <>
            <CampaignDetailHeader
              campaign={campaign}
              onClose={onClose}
              onJoin={onJoin}
            />
            <CampaignDetailStats campaign={campaign} />
            <CampaingPopupSocialMediaSlider
              setIsActive={setIsActive}
              isActive={isActive}
            />
            <div className="mt-[17px]">
              {isActive === 1 && <CampaignOverview campaign={campaign} />}
              {isActive === 2 && <CampaignRequirements campaign={campaign} />}
              {isActive === 3 && <CampaignAssets campaign={campaign} />}
              {isActive === 4 && <CampaignVideos campaign={campaign} />}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CampaingDetailInfoPopup;
