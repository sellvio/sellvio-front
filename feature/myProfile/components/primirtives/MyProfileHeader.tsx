import Link from "next/link";
import Button from "../primirtives/button";

const MyProfileHeader = () => {
  return (
    <div className="flex w-full items-center px-4 py-4px-5 py-6 mx-auto bg-[#A8E6C8]">
      <div className="max-w-[1222px] w-full flex justify-between items-center mx-auto">
        <h1 className="text-[#000000] font-[600] text-[22px]">ჩემი პროფილი</h1>
        <Link href="/">
          <Button
            text="შეასწორე პროფილი"
            color=" bg-[#0866FF] text-[#FFFFFF] font-[700] text-[19px] shrink-0 border-none"
            size=" py-3 px-2  border cursor-pointer"
            img="/images/svg/correctProfile.svg"
          />
        </Link>
      </div>
    </div>
  );
};

export default MyProfileHeader;
