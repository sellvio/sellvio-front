'use client';
import Image from 'next/image';

const PaymentStructure = () => {
  return (
    <div className="flex flex-col bg-[var(--company-basics-bg)] mx-auto px-[30px] py-[30px] border border-[var(--createCampaing-border)] rounded-[8px] w-full">
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <Image
            src="/images/svg/payment.svg"
            width={22}
            height={22}
            alt="logo"
          />
          <h2 className="font-[600] text-[27px] text-[var(--black-color)]">
            გადახდის სტრუქტურა
          </h2>
        </div>
        <p className="text-[14px] text-[var(--campaing-form-paragraphs)]">
          კონფენსაცია, თუ როგორ მიიღებენ კომპენსაციას შემმნელები
        </p>

        <div className="flex-col">
          <div className="flex flex-col">
            <h3 className="mt-[26px] mb-[16px] font-[700] text-[18px] text-[var(--black-color)]">
              შეთავაზების ტიპი
            </h3>
            <input
              type="number"
              placeholder="Cost per View"
              className="bg-[#FFFFFF1A] shadow-[4px_5px_6px_0px_#FFFFFF66_inset] backdrop-blur-[7.5px] p-[18px] border border-[#FFFFFF] rounded-[8px] outline-none w-full font-[700] text-[var(--black-color)] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              style={{ MozAppearance: 'textfield' }}
            />
          </div>

          <div className="flex flex-wrap gap-4 mt-8">
            <div className="flex flex-col flex-5 min-w-[250px] max-w-[900px]">
              <h3 className="mb-4 font-[700] text-[18px] text-[var(--black-color)]">
                გადახდის მოდელი
              </h3>
              <input
                type="number"
                placeholder="რაოდენობა"
                className="bg-[#FFFFFF1A] shadow-[4px_5px_6px_0px_#FFFFFF66_inset] backdrop-blur-[7.5px] p-[18px] border border-[#FFFFFF] rounded-[8px] outline-none w-full font-[700] text-[var(--black-color)] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                style={{ MozAppearance: 'textfield' }}
              />
            </div>

            <div className="flex flex-col flex-1 min-w-[250px] max-w-[900px]">
              <h3 className="invisible mb-4 font-[700] text-[18px] text-[var(--black-color)]">
                გადახდის მოდელი
              </h3>
              <input
                type="number"
                placeholder="თანხა"
                className="bg-[#FFFFFF1A] shadow-[4px_5px_6px_0px_#FFFFFF66_inset] backdrop-blur-[7.5px] p-[18px] border border-[#FFFFFF] rounded-[8px] outline-none w-full overflow-hidden font-[700] text-[var(--black-color)] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none text:sm"
                style={{ MozAppearance: 'textfield' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentStructure;
