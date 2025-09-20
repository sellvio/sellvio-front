import Image from "next/image";
import React from "react";
import { socmediaPlatforms } from "../../data/data";

const SocmediaPlatform = () => {
  return (
    <div className="max-w-[1222px] w-full bg-transparent mx-auto rounded-[8px] px-[30px] py-[30px] flex flex-col border">
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <h2 className="text-[22px] font-[600] text-[#000000]">
            სოციალური მედიის პროფილები
          </h2>
        </div>
        <p className="text-[#00000068] text-[19px]">
          განაახლეთ თქვენი სოციალური მედიის სახელები და არხები
        </p>
      </div>

      <form className="flex flex-col gap-10 mt-[26px]">
        <div className="flex gap-[75px] flex-wrap">
          {socmediaPlatforms.slice(0, 2).map((platform) => (
            <div key={platform.id} className="flex-1 min-w-[300px]">
              <h3 className="text-[#000000] font-[700] text-[18px] mb-4">
                {platform.title}
              </h3>
              <div className="max-w-[543px] flex gap-4 items-center">
                <Image
                  src={platform.src}
                  width={30}
                  height={30}
                  alt={platform.title}
                />
                <input
                  type="text"
                  placeholder={platform.placeholder}
                  className="w-[543px] border border-[#E3E8EF] rounded-[8px] px-3 py-2  text-[18px] text-[#00000083] font-[700] outline-none"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-[75px] flex-wrap">
          {socmediaPlatforms.slice(2, 4).map((platform) => (
            <div key={platform.id} className="flex-1 min-w-[300px]">
              <h3 className="text-[#000000] font-[700] text-[18px] mb-4">
                {platform.title}
              </h3>
              <div className="max-w-[543px] flex gap-4 items-center">
                <Image
                  src={platform.src}
                  width={30}
                  height={30}
                  alt={platform.title}
                />
                <input
                  type="text"
                  placeholder={platform.placeholder}
                  className="w-[543px] border border-[#E3E8EF] rounded-[8px] px-3 py-2 text-[18px] text-[#00000083] font-[700] outline-none"
                />
              </div>
            </div>
          ))}
        </div>
        <div className="flex-1 min-w-[300px]">
          <h3 className="font-[700] text-[18px] text-[#000000] mb-4">
            Facebook
          </h3>
          <div className="w-full flex gap-4 items-center">
            <input
              type="text"
              placeholder="ეს თუ სამი კენტი რიცხვია ანუ ან სამი სოც ქსელი ან 1 "
              className="w-full border border-[#E3E8EF] rounded-[8px] px-3 py-2 text-[18px] text-[#00000083] font-[700] outline-none"
            />
          </div>
        </div>
        <div className="flex-1 min-w-[300px]">
          <h3 className="font-[700] text-[18px] text-[#000000] mb-4">
            საშუალო ნახვები თითო პოსტზე{" "}
          </h3>
          <div className="w-full flex gap-4 items-center">
            <input
              type="text"
              placeholder="25,000"
              className="w-full border border-[#E3E8EF] rounded-[8px] px-3 py-2 text-[18px] text-[#00000083] font-[700] outline-none"
            />
          </div>
        </div>
      </form>
    </div>
  );
};
export default SocmediaPlatform;
