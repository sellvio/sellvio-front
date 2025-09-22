'use client';
import Image from 'next/image';
import { heroScrollDownButton } from '../../data/heroButtonsData';
import Link from 'next/link';
import { Company, Creator } from '../../../../../public/images/svg/intex';

const HeroSectionBottomSide = () => {
  return (
    <div className="flex gap-[42px] mt-[49px] w-full">
      <div className="flex gap-[11px]">
        {heroScrollDownButton.map((eachElement) => (
          <Link href={eachElement.href} key={eachElement.id}>
            <button className="flex justify-center items-center gap-[10px] bg-[var(--leding-dark-button)] px-[30px] py-[18px] rounded-[33px] font-medium text-[18px] text-[var(--white-color)] cursor-pointer">
              {eachElement.label}
              <div className="mt-[2px]">
                <Image
                  src="/images/svg/arrow-down.svg"
                  alt="arrow down"
                  width={20}
                  height={20}
                />
              </div>
            </button>
          </Link>
        ))}
      </div>
      <div className="flex items-center gap-[34px] mt-[14px]">
        <p className="flex font-bold text-[20px] text-[var(--lending-title)]">
          დარეგისტრირდი როგორც:
        </p>
        <div className="flex items-center gap-[26px]">
          <Link href="/registration?type=creator">
            <button className="group flex justify-center items-center gap-[10px] bg-[var(--lending-light-button)] hover:bg-[var(--auth-registrationas-text)] border border-[var(--lending-border)] rounded-[8px] w-[192px] min-h-[52px] font-bold text-[18px] transition-all duration-300 ease-in-out cursor-pointer">
              <Creator className="text-[var(--hero-icon)] group-hover:text-[var(--white-color)]" />
              <span className="text-[var(--black-color)] group-hover:text-[var(--white-color)]">
                შემქმნელი
              </span>
            </button>
          </Link>

          <p className="font-bold text-[20px] text-[var(--lending-title)]">
            ან
          </p>
          <Link href="/registration?type=business">
            <button className="group flex justify-center items-center gap-[10px] bg-[var(--lending-light-button)] hover:bg-[var(--auth-registrationas-text)] border border-[var(--lending-border)] rounded-[8px] w-[192px] min-h-[52px] font-bold text-[18px] transition-all duration-300 ease-in-out cursor-pointer">
              <Company className="text-[var(--hero-icon)] group-hover:text-[var(--white-color)]" />
              <span className="text-[var(--black-color)] group-hover:text-[var(--white-color)]">
                ბიზნესი
              </span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSectionBottomSide;
