import Image from 'next/image';
import Header from '../primitives/Header';
import HeroSectionBottomSide from '../primitives/HeroSectionBottomSide';
import CompanyStats from './CompanyStats';

const HeroSection = () => {
  return (
    <div className="relative bg-[url('/images/svg/heroSectionBackground.svg')] bg-no-repeat m-auto mt-[12px] p-[17px] rounded-[60px] w-full max-w-[1420px] min-h-[651px]">
      <Image
        src="/images/png/background-image.png"
        alt="backgroundImage"
        width={572}
        height={434}
        className="right-[58px] bottom-[115px] absolute"
      />
      <div className="z-[2] relative flex flex-col items-center">
        <Header />
        <div className="space-y-[20px] mt-[45px] w-full max-w-[1288px]">
          <p className="max-w-[571px] font-medium text-[35px] text-[var(--white-color)] leading-10">
            პლათფორმა, რომელიც აკავშირებს ბრენდებს და UGC კონტენტის შემქმნელებს
          </p>
          <p className="max-w-[571px] font-medium text-[var(--lending-text)] leading-5">
            პლათფორმა, სადაც ბიზნესები ქმნიან კამპანიებს, ხოლო კონტენტ
            კრეატორებს შეუძლიათ გამოიმუშაონ ფული კამპანიებზე შექმნილი კონტენტის
            პერფორმანსის შესაბამისად
          </p>
        </div>
        <CompanyStats />
        <HeroSectionBottomSide />
      </div>
    </div>
  );
};

export default HeroSection;
