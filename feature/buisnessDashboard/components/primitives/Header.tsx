import Image from "next/image";
import Link from "next/link";
import { headerBtns } from "../../data/landingData";

const Header = () => {
  return (
    <div className="mx-auto max-w-[1410px] flex w-full items-center justify-between px-4 py-4 ">
      <Link href="/">
        <Image
          src="/images/svg/logo.svg"
          width={235}
          height={65}
          alt="siteLogo"
        />
      </Link>
      <div className="flex gap-4 py-">
        {headerBtns.map((eachElement) => (
          <Link
            href={eachElement.href}
            className="w-[50px] h-[50px]  border border-[var(--header-cards)] flex justify-center items-center rounded-[8px] cursor-pointer"
            key={eachElement.id}
          >
            <Image
              src={eachElement.src}
              alt={eachElement.alt}
              width={20}
              height={20}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Header;
