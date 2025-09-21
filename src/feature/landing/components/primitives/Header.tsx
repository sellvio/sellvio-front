import Image from 'next/image';
import Link from 'next/link';
import { heroButtons } from '../../data/heroButtonsData';

const Header = () => {
  return (
    <header className="flex justify-between mt-[7px] w-full max-w-[1288px] min-h-[62px]">
      <Link href="/">
        <Image src="/images/svg/logo.svg" alt="logo" width={235} height={62} />
      </Link>
      <div className="flex gap-[17px]">
        {heroButtons.map((heroButton) => (
          <Link
            key={heroButton.id}
            href={heroButton.href}
            className="w-[148px] h-[40px]"
          >
            <button className="flex justify-center items-center bg-[#FFFFFF] hover:bg-[#583CCF] shadow-[0px_0px_8.8px_0px_#0000000A] border border-[#0000000A] rounded-[8px] w-full max-w-[148px] h-[40px] font-medium hover:font-bold hover:text-white transition-all duration-300 ease-in-out cursor-pointer">
              {heroButton.label}
            </button>
          </Link>
        ))}
      </div>
    </header>
  );
};

export default Header;
