import { CreatoreGoalProps, Item, UploadFileProps } from "../types";

export const Socmedia: Item[] = [
  {
    id: 1,
    img: "/images/svg/tt.svg",
    title: "Tik Tok",
  },
  {
    id: 2,
    img: "/images/svg/instagram.svg",
    title: "instagram",
  },
  {
    id: 3,
    img: "/images/svg/facebook.svg",
    title: "Facebook",
  },
];

export const GoalCards: CreatoreGoalProps[] = [
  {
    id: "1",
    img: "/images/svg/star.svg",
    title: "ინფლუენსერი",
    descr: "ცნობილი შემქმნელები დამკვიდრებული აუდიტორიით",
  },
  {
    id: "2",
    img: "/images/svg/cup.svg",
    title: "გამოცდილი შემქმნელი",
    descr: "შემქმნელები დადასტურებული კონტენტის გამოცდილებით",
  },
  {
    id: "3",
    img: "/images/svg/profileGoal.svg",
    title: "დამწყები შემქმნელი",
    descr: "ახალი შემქმნელები რომლებიც ცდილობენ გამოცდილების დაგროვებას",
  },
  {
    id: "4",
    img: "/images/svg/scissors.svg",
    title: "კლიპერი",
    descr: "ვიდეო მონტაჟის სპეციალისტები",
  },
];
export const UploadFile: UploadFileProps[] = [
  { id: 1, img: "./images/svg/gallery.svg", title: "ატვირთე ფაილი" },
  { id: 2, img: "./images/svg/upload.svg", title: "ატვირთე ლინკი" },
];
export const costOptions = [
  {
    label: "Cost Per View",
    value: "cost_per_view",
    description: "შემოქმედები მიიღებს კომპენსაციას თითოეული ნახვისთვის",
  },
  {
    label: "Cost Per Reach",
    value: "cost_per_reach",
    description: "შემოქმედები მიიღებს კომპენსაციას მიღწევის (reach) მიხედვით",
  },
  {
    label: "Cost Per Engagement",
    value: "cost_per_engagement",
    description: "შემოქმედები მიიღებს კომპენსაციას თითოეული ჩართულობისთვის",
  },
  {
    label: "Cost Per Click",
    value: "cost_per_click",
    description: "შემოქმედები მიიღებს კომპენსაციას თითოეული კლიკისთვის",
  },
];
export const dayOptions = [
  {
    label: "1 დღე",
    value: "1 დღე",
  },
  {
    label: "2 დღე",
    value: "2 დღე",
  },
  {
    label: "3 დღე",
    value: "3 დღე",
  },
  {
    label: "4 დღე",
    value: "4 დღე",
  },
  {
    label: "5 დღე",
    value: "5 დღე",
  },
  {
    label: "6 დღე",
    value: "6 დღე",
  },
  {
    label: "7 დღე",
    value: "7 დღე",
  },
];
