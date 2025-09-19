import { CreatoreGoalProps, Item, UploadFileProps } from "./types";

export const Socmedia: Item[] = [
  {
    id: "1",
    img: "/images/svg/tt.svg",
    title: "Tik Tok",
  },
  {
    id: "2",
    img: "/images/svg/instagram.svg",
    title: "instagram",
  },
  {
    id: "3",
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
