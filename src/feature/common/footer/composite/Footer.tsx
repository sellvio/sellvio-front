import Image from 'next/image';
import { footerData, footerSocialIcons } from '../../data/footer';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="flex justify-center px-[35px] py-[102px] w-full">
      <div className="flex justify-between w-full max-w-[1335px]">
        <div className="flex flex-col gap-[46px]">
          <Image
            src={'/images/authIcons/svg/selvioAuthLogo.svg'}
            width={207}
            height={57}
            alt="logo"
          />
          <div className="flex gap-[21px]">
            {footerSocialIcons.map((eachElement) => (
              <Link key={eachElement.id} href={eachElement.href}>
                <Image
                  src={eachElement.socialLinksIcon}
                  width={22}
                  height={22}
                  alt="socialIcons"
                />
              </Link>
            ))}
          </div>
        </div>
        <div className="flex gap-[89px] w-full max-w-[1068px]">
          {footerData.map((eachElement) => (
            <div key={eachElement.id} className="flex flex-col gap-[34px]">
              <p className="font-bold text-[26px]">{eachElement.title}</p>
              <ul className="flex flex-col gap-[14px] pl-5 w-full max-w-[217px] list-disc">
                {eachElement.options.map((option) => (
                  <li
                    key={option.id}
                    className="font-medium text-[20px] hover:text-[#583CCF] transition-all duration-300 ease-in-out"
                  >
                    <a href={option.href}>{option.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
