import Image from "next/image";
import React from "react";
import { CreatorProfileData } from "@/lib/api/creator";
import { socmediaPlatforms } from "../../data/data";

type Account = NonNullable<
  CreatorProfileData["creator_profiles"]
>["social_media_accounts"][number];

const SocmediaPlatform = ({ accounts }: { accounts: Account[] }) => {
  return (
    <div className="max-w-[1222px] w-full border-[var(--component-border-color)] mx-auto rounded-[8px] px-[30px] py-[30px] flex flex-col border">
      <div className="flex flex-col">
        <h2 className="text-[22px] font-[600] text-[var(--black-color)]">
          სოციალური მედიის პროფილები
        </h2>

        <p className="text-[var(--campaing-form-paragraphs)] text-[19px]">
          თქვენი დაკავშირებული სოციალური მედიის არხები
        </p>
      </div>

      <div className="flex flex-wrap gap-[24px] lg:gap-[75px] mt-[26px]">
        {socmediaPlatforms.map((platform) => {
          const account = accounts.find((a) => a.platform === platform.id);
          const label = account?.username || account?.profile_url;

          return (
            <div key={platform.id} className="flex-1 min-w-[300px]">
              <h3 className="text-[var(--black-color)] font-[700] text-[18px] mb-4">
                {platform.title}
              </h3>
              <div className="max-w-[543px] flex gap-4 items-center">
                <Image
                  src={platform.src}
                  width={30}
                  height={30}
                  alt={platform.title}
                />
                <div className="w-full border border-[var(--auth-input-border)] rounded-[8px] px-3 py-2 text-[18px] text-[var(--adding-tags-color)] font-[700] truncate">
                  {account?.profile_url ? (
                    <a
                      href={account.profile_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#0866FF]"
                    >
                      {label}
                    </a>
                  ) : (
                    <span className="text-[var(--campaing-form-paragraphs)] font-[500]">
                      არ არის დაკავშირებული
                    </span>
                  )}
                </div>
              </div>
              {account?.followers_count ? (
                <p className="mt-2 text-[14px] text-[var(--campaing-form-paragraphs)]">
                  {account.followers_count.toLocaleString()} გამომწერი
                </p>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SocmediaPlatform;
