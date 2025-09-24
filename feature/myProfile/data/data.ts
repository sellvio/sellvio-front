import { Creator, socmediaPlatform } from "../types";

export const socmediaPlatforms: socmediaPlatform[] = [
  {
    id: "1",
    src: "/images/svg/instagram.svg",
    title: "Instagram",
    placeholder: "სალომე შავიანიძე",
  },
  {
    id: "2",
    src: "/images/svg/youtube.svg",
    title: "Youtube",
    placeholder: "noza@example.com",
  },
  {
    id: "3",
    src: "/images/svg/tiktok.svg",
    title: "Tik Tok",
    placeholder: "noza@example.com",
  },
  {
    id: "4",
    src: "/images/svg/facebook.svg",
    title: "Facebook",
    placeholder: "noza@example.com",
  },
];
export const creators: Creator[] = [
  {
    id: 1,
    name: "სალომე შავიანიძე",
    badge: "ტოპ შემქმნელი",
    badgeIcon: "/images/svg/diamond.svg",
    profileImg: "/images/svg/creatorProfile.svg",
    location: {
      icon: "/images/svg/mapPin.svg",
      text: "Georgia, Tbilisi",
    },
    joined: {
      icon: "/images/svg/calendar.svg",
      text: "შეურთდა მარტი 2025",
    },
    views: {
      icon: "/images/svg/eye.svg",
      text: "საშუალო 25,000 ნახვა",
    },
    bio: "კონტეტის შემქმნელი, სპეციალიზირებული ტექნოლოგიურ მიმოხილვებსა და ცხოვრების წესის კონტენტში. გატაცებული მიმზიდველი ვიდეოების შექმნით, რომლებიც ეხმარება ადამიანებს ინფორმირებული გადაწყვეტილებების მიღებაში",
  },
];
export const initialTags = [
  "Technology",
  "Lifestyle",
  "Fitness",
  "Health",
  "Food",
  "Gaming",
  "Fashion",
  "Cooking",
];
