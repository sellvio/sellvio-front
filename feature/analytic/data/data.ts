import { PlatformName } from "@/lib/api/analytics";

// Static card configuration; numbers come from the analytics API
export const platformPerformance: {
  id: number;
  platform: PlatformName;
  title: string;
}[] = [
  { id: 1, platform: "tiktok", title: "TikTok" },
  { id: 2, platform: "instagram", title: "Instagram" },
  { id: 3, platform: "facebook", title: "Facebook" },
];

export const performanceIcons = {
  viewerIcon: "/images/performanceCardIcons/svg/performanceEye.svg",
  likeIcon: "/images/performanceCardIcons/svg/likeIcon.svg",
  shareIcon: "/images/performanceCardIcons/svg/share.svg",
  percent: "/images/performanceCardIcons/svg/percent.svg",
};
