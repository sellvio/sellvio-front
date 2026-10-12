import Image from "next/image";
import React from "react";
import { CreatorProfileData } from "@/lib/api/creator";
import { profileIcons } from "../../data/data";

const creatorTypeBadges: Record<string, string> = {
  influencer: "ინფლუენსერი",
  experienced: "გამოცდილი შემქმნელი",
  beginner: "დამწყები შემქმნელი",
  clipper: "კლიპერი",
};

const formatJoined = (value: string | null) => {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return `შემოუერთდა ${date.toLocaleDateString("ka-GE", {
    month: "long",
    year: "numeric",
  })}`;
};

const CreatorProfile = ({ profile }: { profile: CreatorProfileData }) => {
  const creator = profile.creator_profiles;
  const name =
    [creator?.first_name, creator?.last_name].filter(Boolean).join(" ") ||
    creator?.nickname ||
    profile.email;
  const followers = (creator?.social_media_accounts ?? []).reduce(
    (sum, acc) => sum + (acc.followers_count ?? 0),
    0
  );

  const infoItems = [
    creator?.location
      ? { icon: profileIcons.location, text: creator.location }
      : null,
    formatJoined(profile.created_at)
      ? { icon: profileIcons.joined, text: formatJoined(profile.created_at) }
      : null,
    followers > 0
      ? {
          icon: profileIcons.views,
          text: `${followers.toLocaleString()} გამომწერი`,
        }
      : null,
  ].filter(Boolean) as { icon: string; text: string }[];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex mt-[37px] max-w-[1222px] lg:flex-row border-[var(--component-border-color)]  flex-col w-full mx-auto gap-[32px] border  px-[30px] py-[30px] rounded-[8px]">
        <Image
          src={creator?.profile_image_url || profileIcons.defaultAvatar}
          width={130}
          height={130}
          alt="profile"
          unoptimized
          className="w-[130px] h-[130px] rounded-full object-cover shrink-0"
        />

        <div className="flex flex-col ">
          <div className="flex gap-[17px] items-center mb-[15px] flex-wrap">
            <p className="text-[29px] font-[600]">{name}</p>
            {creator?.creator_type && (
              <div className="flex gap-2 items-center justify-center rounded-[20px] bg-[var(--top-creator-status)] px-3 py-1">
                <Image
                  src={profileIcons.badge}
                  width={20}
                  height={20}
                  alt="badge"
                />
                <p>{creatorTypeBadges[creator.creator_type]}</p>
              </div>
            )}
          </div>

          <div className="flex gap-[34px] flex-wrap">
            {infoItems.map((item, id) => (
              <div key={id} className="flex gap-1">
                <Image src={item.icon} width={20} height={20} alt="icon" />
                <p className="text-[20px] font-[500] text-[var(--adding-tags-color)]">
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          <p className="text-[20px] font-[500] text-[var(--adding-tags-color)] mt-[22px]">
            {creator?.bio || "ბიო ჯერ არ არის დამატებული"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreatorProfile;
