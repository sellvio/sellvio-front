import { CreatoreGoalProps, Item, UploadFileProps } from '../types';

export const Socmedia = [
  {
    id: 1,
    title: 'Instagram',
    value: 'instagram',
    img: '/images/svg/instagram.svg',
  },
  {
    id: 2,
    title: 'TikTok',
    value: 'tiktok',
    img: '/images/svg/tiktok.svg',
  },
  {
    id: 3,
    title: 'Facebook',
    value: 'facebook',
    img: '/images/svg/facebook.svg',
  },
] as const;

export const GoalCards = [
  {
    id: 'influencer',
    img: '/images/svg/star.svg',
    title: 'ინფლუენსერი',
    descr: 'ცნობილი შემქმნელები დამკვიდრებული აუდიტორიით',
  },
  {
    id: 'experienced',
    img: '/images/svg/cup.svg',
    title: 'გამოცდილი შემქმნელი',
    descr: 'შემქმნელები დადასტურებული კონტენტის გამოცდილებით',
  },
  {
    id: 'beginner',
    img: '/images/svg/profileGoal.svg',
    title: 'დამწყები შემქმნელი',
    descr: 'ახალი შემქმნელები რომლებიც ცდილობენ გამოცდილების დაგროვებას',
  },
  {
    id: 'clipper',
    img: '/images/svg/scissors.svg',
    title: 'კლიპერი',
    descr: 'ვიდეო მონტაჟის სპეციალისტები',
  },
] as const;

export const UploadFile: UploadFileProps[] = [
  { id: 1, img: './images/svg/gallery.svg', title: 'ატვირთე ფაილი' },
  { id: 2, img: './images/svg/upload.svg', title: 'ატვირთე ლინკი' },
];
export const costOptions = [
  {
    label: 'ნახვის ღირებულება',
    value: 'cost_per_view',
    description: 'შემოქმედები მიიღებს კომპენსაციას თითოეული ნახვისთვის',
  },
  {
    label: 'ღირებულება თითო მიღწევაზე',
    value: 'cost_per_reach',
    description: 'შემოქმედები მიიღებს კომპენსაციას მიღწევის (reach) მიხედვით',
  },
  {
    label: 'ღირებულება თითო ჩართულობაზე',
    value: 'cost_per_engagement',
    description: 'შემოქმედები მიიღებს კომპენსაციას თითოეული ჩართულობისთვის',
  },
  {
    label: 'დაწკაპუნების ღირებულება',
    value: 'cost_per_click',
    description: 'შემოქმედები მიიღებს კომპენსაციას თითოეული კლიკისთვის',
  },
];
export const dayOptions = [
  {
    label: '1 დღე',
    value: '1 დღე',
  },
  {
    label: '2 დღე',
    value: '2 დღე',
  },
  {
    label: '3 დღე',
    value: '3 დღე',
  },
  {
    label: '4 დღე',
    value: '4 დღე',
  },
  {
    label: '5 დღე',
    value: '5 დღე',
  },
  {
    label: '6 დღე',
    value: '6 დღე',
  },
  {
    label: '7 დღე',
    value: '7 დღე',
  },
];

export const paymentTypeOptions = [
  {
    value: 'cost_per_view',
    label: 'Cost per View',
    description: 'გადახდა თითოეული ნახვის რაოდენობის მიხედვით',
    quantityLabel: 'ნახვების რაოდენობა',
    quantityPlaceholder: 'მაგ: 1000',
    amountPlaceholder: 'მაგ: 50',
    helperText: 'მიუთითე რამდენ ნახვაზეა გათვლილი გადახდა',
  },
  {
    value: 'cost_per_click',
    label: 'Cost per Click',
    description: 'გადახდა თითოეული დაკლიკების რაოდენობის მიხედვით',
    quantityLabel: 'კლიკების რაოდენობა',
    quantityPlaceholder: 'მაგ: 500',
    amountPlaceholder: 'მაგ: 40',
    helperText: 'მიუთითე რამდენ კლიკზეა გათვლილი გადახდა',
  },
  {
    value: 'cost_per_engagement',
    label: 'Cost per Engagement',
    description: 'გადახდა ჩართულობის მიხედვით',
    quantityLabel: 'ჩართულობის რაოდენობა',
    quantityPlaceholder: 'მაგ: 300',
    amountPlaceholder: 'მაგ: 35',
    helperText: 'მიუთითე engagement-ების რაოდენობა',
  },
  {
    value: 'cost_per_reach',
    label: 'Cost per Reach',
    description: 'გადახდა reach-ის მიხედვით',
    quantityLabel: 'reach-ის რაოდენობა',
    quantityPlaceholder: 'მაგ: 5000',
    amountPlaceholder: 'მაგ: 60',
    helperText: 'მიუთითე reach-ის მიზნობრივი რაოდენობა',
  },
] as const;

export type PaymentTypeOption = (typeof paymentTypeOptions)[number];
