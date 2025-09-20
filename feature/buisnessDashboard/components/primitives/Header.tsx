import Image from "next/image";
import { headerBtns } from "../../data/landingData";

const Header = () => {
  return (
    <div className="mx-auto max-w-[1410px] flex w-full items-center justify-between px-4 py-4 ">
      <div>
        <Image
          src="./images/svg/logo.svg"
          width={235}
          height={65}
          alt="siteLogo"
        />
      </div>
      <div className="flex gap-4 py-">
        {headerBtns.map((eachElement) => (
          <div
            className="w-[50px] h-[50px]  border border-[#00000010] flex justify-center items-center rounded-[8px] cursor-pointer"
            key={eachElement.id}
          >
            <Image
              src={eachElement.src}
              alt={eachElement.alt}
              width={20}
              height={20}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Header;
