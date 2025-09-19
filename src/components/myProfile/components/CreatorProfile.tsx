import Image from "next/image";
import React from "react";

const CreatorProfile = () => {
  return (
    <div className="flex mt-[37px] max-w-[1222px] w-full mx-auto gap-[32px] border border-[#00000038] px-[30px] py-[30px] rounded-[8px]">
      <Image
        src="/images/svg/creatorProfile.svg"
        width={130}
        height={130}
        alt="profile"
      />

      <div className="flex flex-col ">
        <div className="flex gap-[17px] items-center mb-[15px] ">
          <p className="text-[29px] font-[600]">სალომე შავიანიძე</p>
          <div className="flex gap-2 items-center justify-center rounded-[20px] bg-[#00000008] w-[171px]">
            <Image
              src="/images/svg/diamond.svg"
              width={20}
              height={20}
              alt="diamond"
            ></Image>
            <p>ტოპ შემქმნელი</p>
          </div>
        </div>
        <div className="flex gap-[34px] ">
          <div className="flex gap-1">
            <Image
              src="/images/svg/mapPin.svg"
              width={20}
              height={20}
              alt="diamond"
            ></Image>
            <p className="text-[20px] font-[500] text-[#00000083]">
              Georgia, Tbilisi
            </p>
          </div>
          <div className="flex gap-1">
            <Image
              src="/images/svg/calendar.svg"
              width={20}
              height={20}
              alt="diamond"
            ></Image>
            <p className="text-[20px] font-[500] text-[#00000083]">
              შეუერთდა მარტი 2025
            </p>
          </div>
          <div className="flex gap-1">
            <Image
              src="/images/svg/eye.svg"
              width={20}
              height={20}
              alt="diamond"
            ></Image>
            <p className="text-[20px] font-[500] text-[#00000083]">
              საშუალო 25,000 ნახვა
            </p>
          </div>
        </div>
        <p className="text-[20px] font-[500] text-[#00000083] mt-[22px]">
          კონტეტის შემქმნელი, სპეციალიზირებული ტექნოლოგიურ მიმოხილვებსა და
          ცხოვრების წესის კონტენტში. გატაცებული მიმზიდველი ვიდეოების შექმნით,
          რომლებიც ეხმარება ადამიანებს ინფორმირებული გადაწყვეტილებების მიღებაში
        </p>
      </div>
    </div>
  );
};

export default CreatorProfile;
