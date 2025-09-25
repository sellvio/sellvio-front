import Image from 'next/image';
import { companyStatsData } from '../../data/companyStatsData';

const CompanyStats = () => {
  return (
    <div className="flex justify-start gap-[34px] mt-[75px] px-[7px] w-full max-w-[1259px]">
      {companyStatsData.map((companyStat) => {
        return (
          <div
            key={companyStat.id}
            className="flex gap-[20px] bg-[var(--transperent-white)] shadow-[0px_0px_9.9px_0px_#00000040] px-[15px] py-[20px] border-[2px] border-[var(--auth-registrationas-text)] rounded-[8px] w-full max-w-[396px] min-h-[103px]"
          >
            <div className="flex justify-center items-center bg-[var(--company-frame-bg)] border-[2px] border-[var(--company-frame-border)] rounded-full w-[60px] h-[60px] shrink-0">
              <Image
                src={companyStat.icon}
                alt={companyStat.alt}
                width={30}
                height={30}
              />
            </div>
            <div>
              <div className="flex items-center gap-[6px]">
                <div className="flex items-center">
                  <p className="font-bold text-[22px]">
                    {companyStat.quantity}
                  </p>
                  <Image
                    src="images/landingPageIcons/svg/plus.svg"
                    alt="plus icon"
                    width={18}
                    height={18}
                  />
                </div>
                <p className="font-bold text-[18px]">{companyStat.title}</p>
              </div>
              <p className="font-medium text-[12px] text-[var(--company-cards-text)]">
                {companyStat.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CompanyStats;
