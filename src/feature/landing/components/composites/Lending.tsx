'use client';
import Footer from '@/feature/common/footer/composite/Footer';
import BusinessCreatorCards from '../primitives/BusinessCreatorCards';
import CompanyCards from '../primitives/CompanyCards';
import HeroSection from '../primitives/HeroSection';
import CampaingDetailInfoPopup from '../primitives/CampaingDetailInfoPopup';
import JoinCompanyPopup from '../primitives/JoinCompanyPopup';
import { useState } from 'react';
import { useJoinCampaign } from '../../hooks/useJoinCampaign';

const Lending = () => {
  const [selectedCampaignId, setSelectedCampaignId] = useState<number | null>(
    null
  );
  const { pendingCampaign, requestJoin, confirmJoin, cancelJoin, isJoining } =
    useJoinCampaign();

  return (
    <div className="flex flex-col gap-[83px] min-h-screen">
      <div className="flex flex-col flex-1">
        <HeroSection />
        <BusinessCreatorCards />
        <CompanyCards
          onOpenDetails={setSelectedCampaignId}
          onJoin={requestJoin}
        />
        {selectedCampaignId !== null && (
          <CampaingDetailInfoPopup
            campaignId={selectedCampaignId}
            onClose={() => setSelectedCampaignId(null)}
            onJoin={requestJoin}
          />
        )}
        <JoinCompanyPopup
          popupVisible={pendingCampaign !== null}
          onCancel={cancelJoin}
          onConfirm={confirmJoin}
          isPending={isJoining}
        />
      </div>
      <Footer />
    </div>
  );
};

export default Lending;
