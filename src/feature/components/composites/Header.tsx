'use client';
import Image from 'next/image';
import { HeaderProps } from '../type';
import HeaderSearch from '../primitives/HeaderSearch';

const Header = ({ pageName }: HeaderProps) => {
  return (
    <div className="relative bg-[url('/images/svg/headerBackground.svg')] bg-no-repeat m-auto mt-[13px] w-full max-w-[1420px] min-h-[169px]">
      <div className="flex justify-between items-center px-[33px] py-[17px] w-full">
        <Image src="/images/svg/logo.svg" alt="Logo" width={235} height={62} />
        <HeaderSearch />
      </div>
      <p className="bottom-[17px] left-[29px] absolute font-semibold text-[34px] text-[var(--white-color)]">
        {pageName}
      </p>
    </div>
  );
};

export default Header;
