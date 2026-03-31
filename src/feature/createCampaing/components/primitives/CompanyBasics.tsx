'use client';

import Image from 'next/image';

const CompanyBasics = () => {
  return (
    <div className="flex flex-col justify-center gap-[26px] bg-[#0866FF33] mx-auto px-[30px] py-[30px] border border-[#00000038] rounded-[8px] w-full">
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <Image
            src="/images/svg/companyBasics.svg"
            width={22}
            height={22}
            alt="logo"
          />
          <h2 className="font-[600] text-[27px] text-[var(--)]">
            კამპანიის საფუძვლები
          </h2>
        </div>
        <p className="text-[14px] text-[var(--campaing-form-paragraphs)]">
          დააყენეთ თქვენი კამპანიის ფუნდამენტური დეტალები
        </p>
      </div>

      <div className="flex flex-col gap-[37px] w-full">
        <div className="flex justify-between gap-[75px] w-full">
          <div className="flex flex-col gap-[16px] w-full">
            <h3 className="w-full font-[700] text-[18px]">კამპანიის სახელი</h3>
            <input
              type="text"
              placeholder="მაგ: საზაფხულო პროდუქტი"
              className="bg-[#FFFFFF1A] shadow-[4px_5px_6px_0px_#FFFFFF66_inset] backdrop-blur-[7.5px] px-3 py-2 border border-[#FFFFFF] rounded-[8px] outline-none w-full min-h-[56px] font-[700] text-[var(--black-color)]"
            />
          </div>
          <div className="flex flex-col gap-[8px] w-full">
            <div className="flex flex-col gap-[16px] w-full">
              <h3 className="w-full font-[700] text-[18px]">ბიუჯეტი (ლარში)</h3>
              <input
                placeholder="₾ 5000"
                className="bg-[#FFFFFF1A] shadow-[4px_5px_6px_0px_#FFFFFF66_inset] backdrop-blur-[7.5px] px-3 py-2 border border-[#FFFFFF] rounded-[8px] outline-none w-full min-h-[56px] font-[700] text-[var(--black-color)]"
                style={{ MozAppearance: 'textfield' }}
              />
            </div>
            <div className="flex justify-end items-center gap-3 w-full cursor-pointer">
              <p className="font-[700] text-[var(--black-color)]">
                დამალე ბიუჯეტი შემქნელებისთვის
              </p>
            </div>
          </div>
        </div>

        <div className="w-full">
          <h3 className="mb-4 font-[700] text-[18px] text-[var(--black-color)]">
            კამპანიის აღწერა
          </h3>
          <textarea
            placeholder="აღწერეთ თქვენი კამპანიის მიზნები, სამიზნე აუდიტორია და რას ეძებთ შემქმნელებში..."
            className="bg-[#FFFFFF1A] shadow-[4px_5px_6px_0px_#FFFFFF66_inset] backdrop-blur-[7.5px] px-3 py-2 border border-[#FFFFFF] rounded-[8px] outline-none w-full min-h-[218px] font-[700] text-[var(--black-color)] resize-none"
          />
        </div>
      </div>
    </div>
  );
};

export default CompanyBasics;
