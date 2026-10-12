import { CreatorTypeValue, socmediaPlatform } from "../types";

// Platforms supported by the backend `social_platform` enum
export const socmediaPlatforms: socmediaPlatform[] = [
  {
    id: "instagram",
    src: "/images/svg/instagram.svg",
    title: "Instagram",
  },
  {
    id: "tiktok",
    src: "/images/svg/tiktok.svg",
    title: "Tik Tok",
  },
  {
    id: "facebook",
    src: "/images/svg/facebook.svg",
    title: "Facebook",
  },
];

export const profileIcons = {
  badge: "/images/svg/diamond.svg",
  defaultAvatar: "/images/svg/creatorProfile.svg",
  location: "/images/svg/mapPin.svg",
  joined: "/images/svg/calendar.svg",
  views: "/images/svg/eye.svg",
};

export const creatorTypeOptions: {
  value: CreatorTypeValue;
  img: string;
  title: string;
  descr: string;
}[] = [
  {
    value: "influencer",
    img: "/images/svg/star.svg",
    title: "ინფლუენსერი",
    descr: "ცნობილი შემქმნელები დამკვიდრებული აუდიტორიით",
  },
  {
    value: "experienced",
    img: "/images/svg/cup.svg",
    title: "გამოცდილი შემქმნელი",
    descr: "შემქმნელები დადასტურებული კონტენტის გამოცდილებით",
  },
  {
    value: "beginner",
    img: "/images/svg/profileGoal.svg",
    title: "დამწყები შემქმნელი",
    descr: "ახალი შემქმნელები რომლებიც ცდილობენ გამოცდილების დაგროვებას",
  },
  {
    value: "clipper",
    img: "/images/svg/scissors.svg",
    title: "კლიპერი",
    descr: "ვიდეო მონტაჟის სპეციალისტები",
  },
];
