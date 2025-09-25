import Image from "next/image";
import React from "react";
import { creators } from "../../data/data";

const CreatorProfile = () => {
  return (
    <div className="flex flex-col gap-6">
      {creators.map((creator) => (
        <div
          key={creator.id}
          className="flex mt-[37px] max-w-[1222px] lg:flex-row border-[var(--component-border-color)]  flex-col w-full mx-auto gap-[32px] border  px-[30px] py-[30px] rounded-[8px]"
        >
          <Image
            src={creator.profileImg}
            width={130}
            height={130}
            alt="profile"
          />

          <div className="flex flex-col ">
            <div className="flex gap-[17px] items-center mb-[15px] ">
              <p className="text-[29px] font-[600]">{creator.name}</p>
              <div className="flex gap-2 items-center justify-center rounded-[20px] bg-[var(--top-creator-status)] w-[171px]">
                <Image
                  src={creator.badgeIcon}
                  width={20}
                  height={20}
                  alt="badge"
                />
                <p>{creator.badge}</p>
              </div>
            </div>

            <div className="flex gap-[34px] ">
              {[creator.location, creator.joined, creator.views].map(
                (item, id) => (
                  <div key={id} className="flex gap-1">
                    <Image src={item.icon} width={20} height={20} alt="icon" />
                    <p className="text-[20px] font-[500] text-[var(--adding-tags-color)]">
                      {item.text}
                    </p>
                  </div>
                )
              )}
            </div>

            <p className="text-[20px] font-[500] text-[var(--adding-tags-color)] mt-[22px]">
              {creator.bio}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CreatorProfile;
