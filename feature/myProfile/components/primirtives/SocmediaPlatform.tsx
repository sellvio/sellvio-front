import Image from "next/image";
import React from "react";
import { socmediaPlatforms } from "../../data/data";

const SocmediaPlatform = () => {
  return (
    <div className="max-w-[1222px] w-full border-[var(--component-border-color)] mx-auto rounded-[8px] px-[30px] py-[30px] flex flex-col border">
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <h2 className="text-[22px] font-[600] text-[var(--black-color)]">
            სოციალური მედიის პროფილები
          </h2>
        </div>
        <p className="text-[var(--campaing-form-paragraphs)] text-[19px]">
          განაახლეთ თქვენი სოციალური მედიის სახელები და არხები
        </p>
      </div>

      <form className="flex flex-col gap-6 mt-[26px]">
        <div className="flex flex-wrap gap-[24px] lg:gap-[75px]">
          {socmediaPlatforms.slice(0, 2).map((platform) => (
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
                <input
                  type="text"
                  placeholder={platform.placeholder}
                  className="w-[543px] border border-[var(--auth-input-border)] rounded-[8px] px-3 py-2 text-[18px] text-[var(--adding-tags-color)] font-[700] outline-none"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-[24px] lg:gap-[75px]">
          {socmediaPlatforms.slice(2, 4).map((platform) => (
            <div key={platform.id} className="flex-1 min-w-[300px]">
              <h3 className="text-[var(--black-color)] font-[700] text-[18px] mb-4">
                {platform.title}
              </h3>
              <div className="max-w-[543px] w-full flex gap-4 items-center">
                <Image
                  src={platform.src}
                  width={30}
                  height={30}
                  alt={platform.title}
                />
                <input
                  type="text"
                  placeholder={platform.placeholder}
                  className="w-[543px] border border-[var(--auth-input-border)] rounded-[8px] px-3 py-2 text-[18px] text-[var(--adding-tags-color)] font-[700] outline-none"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-[24px] lg:gap-[75px]">
          <div className="flex-1 min-w-[300px]">
            <h3 className="font-[700] text-[18px] text-[var(--black-color)] mb-4">
              Tik Tok
            </h3>
            <div className="max-w-[543px] w-full flex gap-4 items-center">
              <input
                type="text"
                placeholder="სალომე შავიანიძე"
                className="w-full border border-[var(--auth-input-border)] rounded-[8px] px-3 py-2 text-[18px] text-[var(--adding-tags-color)] font-[700] outline-none"
              />
            </div>
          </div>
          <div className="flex-1 min-w-[300px]">
            <h3 className="font-[700] text-[18px] text-[var(--black-color)] mb-4">
              Facebook
            </h3>
            <div className="max-w-[543px] w-full flex gap-4 items-center">
              <input
                type="text"
                placeholder="noza@example.com"
                className="w-full border border-[var(--auth-input-border)] rounded-[8px] px-3 py-2 text-[18px] text-[var(--adding-tags-color)] font-[700] outline-none"
              />
            </div>
          </div>
        </div>

        <div className="flex-1 min-w-[300px] mt-6">
          <h3 className="font-[700] text-[18px] text-[var(--black-color)] mb-4">
            საშუალო ნახვები თითო პოსტზე
          </h3>
          <div className="w-full flex gap-4 items-center">
            <input
              type="text"
              placeholder="25,000"
              className="w-full border border-[var(--auth-input-border)] rounded-[8px] px-3 py-2 text-[18px] text-[var(--adding-tags-color)] font-[700] outline-none"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default SocmediaPlatform;
