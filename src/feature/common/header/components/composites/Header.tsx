import { HeaderPropsType } from '@/feature/common/type';
import Image from 'next/image';
import { headerData } from '../../data/headerData';

const Header = ({ pageName }: HeaderPropsType) => {
  return (
    <header className="flex justify-center px-[43px] py-[30px]">
      <div className="flex flex-col gap-[26px] w-full max-w-[1440px]">
        <div className="flex justify-between w-full">
          <Image
            src={'/images/headerIcons/svg/logo.svg'}
            alt="logo"
            width={240}
            height={65}
          />
          <div>
            {headerData.map((hederDat) => (
              <Image />
            ))}
          </div>
        </div>
        <p className="font-semibold text-[#0866FF] text-[34px]">{pageName}</p>
      </div>
    </header>
  );
};

export default Header;
