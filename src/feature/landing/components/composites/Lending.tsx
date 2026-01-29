import Footer from '@/feature/common/footer/composite/Footer';
import BusinessCreatorCards from '../primitives/BusinessCreatorCards';
import CompanyCards from '../primitives/CompanyCards';
import HeroSection from '../primitives/HeroSection';
import CampaingDetailInfoPopup from '../primitives/CampaingDetailInfoPopup';

const Lending = () => {
  return (
    <div className="flex flex-col gap-[83px] min-h-screen">
      <div className="flex flex-col flex-1">
        <HeroSection />
        <BusinessCreatorCards />
        <CompanyCards />
        <CampaingDetailInfoPopup />
      </div>
      <Footer />
    </div>
  );
};

export default Lending;
