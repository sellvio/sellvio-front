import { FooterItem } from '../type';

export const footerData: FooterItem[] = [
  {
    id: 1,
    title: 'ჩვენს შესახებ',
    options: [
      { id: 1, label: 'გაიგე მეტი ჩვენზე', href: '/' },
      { id: 2, label: 'პარტნიორები', href: '/' },
      { id: 3, label: 'კონფიდენციალობა', href: '/' },
      { id: 4, label: 'დახმარება გჭირდება?', href: '/' },
    ],
  },
  {
    id: 2,
    title: 'კომუნიკაცია',
    options: [
      { id: 1, label: 'Discord კრეატორებისათვის', href: '/' },
      { id: 2, label: 'გახდი პარტნიორი', href: '/' },
      { id: 3, label: 'შენი უკუკავშირი', href: '/' },
    ],
  },
  {
    id: 3,
    title: 'ინფორმაციები',
    options: [
      { id: 1, label: 'ბლოგები ჩვენი შესახებ', href: '/blogs' },
      { id: 2, label: 'როგორ მუშაობს რეატორებისთვის', href: '/' },
      { id: 3, label: 'როგორ მუშაობს ბიზნესებისთვის', href: '/' },
    ],
  },
  {
    id: 4,
    title: 'საკონტაქტო',
    options: [
      { id: 1, label: 'ტელეფონი: (+995) 577313799', href: 'tel:+995577313799' },
      {
        id: 2,
        label: 'ელ-ფოსტა: selvioverse@gmail.com',
        href: 'mailto:selvioverse@gmail.com',
      },
    ],
  },
];
export const footerSocialIcons = [
  {
    id: 1,
    socialLinksIcon: '/images/landingPageIcons/svg/tiktok.svg',
    href: '/',
  },
  {
    id: 2,
    socialLinksIcon: '/images/landingPageIcons/svg/instagram.svg',
    href: '/',
  },
  {
    id: 3,
    socialLinksIcon: '/images/landingPageIcons/svg/discrod.svg',
    href: '/',
  },
  {
    id: 4,
    socialLinksIcon: '/images/landingPageIcons/svg/facebook.svg',
    href: '/',
  },
];
