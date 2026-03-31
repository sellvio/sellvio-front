'use client';

import Image from 'next/image';

const ExtraMedia = () => {
  return (
    <div className="flex flex-col gap-[26px] bg-[var(--company-basics-bg)] px-[30px] py-[30px] border border-[var(--createCampaing-border)] rounded-[8px] w-full">
      <div className="flex flex-col">
        <div className="flex justify-between items-center w-1/2 cursor-pointer">
          <div className="flex items-center gap-2">
            <Image
              src="/images/svg/upload.svg"
              width={22}
              height={22}
              alt="logo"
            />
            <h2 className="font-[600] text-[20px] text-[var(--black-color)]">
              გსურთ დამატებით მედიის ატვირთვა?
            </h2>
          </div>
        </div>

        <p className="w-full max-w-[900px] text-[14px] text-[var(--campaing-form-paragraphs)]">
          იმ შემთხვევაში, თუ თქვენთვის სასურველი კონტენტის შექმნისთვის საჭიროა
          თქვენი ფოტოებისა და ვიდეობის გამოყენება კრეატორების მხირდან, გთხოვთ
          ატვირთოთ, რათა შეძლონ გამოყენება
        </p>
      </div>

      <div className="flex gap-[20px] w-full">
        <div className="flex flex-col w-1/2">
          <div className="flex flex-col justify-center items-center gap-5 bg-[#0866FF05] backdrop-blur-[7.5px] pt-[21px] pb-[21px] border border-[#FFFFFF] border-dashed rounded-[8px]">
            <div className="flex justify-center items-center w-[160px] h-[80px]">
              <div className="flex flex-col justify-center items-center w-full">
                <Image
                  src="/images/svg/gallery.svg"
                  width={40}
                  height={40}
                  alt="ატვირთე ფაილი"
                />
                <p className="font-[700] text-[var(--campaing-form-paragraphs)]">
                  ატვირთე ფაილი
                </p>
              </div>
            </div>

            <button
              type="button"
              className="bg-[#0866FF]/[0.46] shadow-[inset_4px_5px_6px_0px_rgba(255,255,255,0.4),inset_-1px_-3px_4px_0px_rgba(255,255,255,0.4)] backdrop-blur-[7.5px] px-[60px] py-[12px] border-[#FFFFFF] border-[0.5px] rounded-[8px] text-[#FFFFFF] text-[18px] cursor-pointer"
            >
              აირჩიე ფაილი
            </button>
          </div>
        </div>

        <div className="flex flex-col w-1/2">
          <div className="flex flex-col justify-center items-center gap-5 bg-[#0866FF05] backdrop-blur-[7.5px] pt-[21px] pb-[21px] border border-[#FFFFFF] border-dashed rounded-[8px]">
            <div className="flex justify-center items-center w-[160px] h-[80px]">
              <div className="flex flex-col justify-center items-center">
                <div className="flex flex-col items-center mt-2 py-[5px]">
                  <Image
                    src="/images/svg/upload.svg"
                    alt="ლინკი"
                    width={39}
                    height={39}
                  />
                  <p className="font-[700] text-[var(--campaing-form-paragraphs)]">
                    ატვირთე ლინკი
                  </p>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="bg-[#0866FF]/[0.46] shadow-[inset_4px_5px_6px_0px_rgba(255,255,255,0.4),inset_-1px_-3px_4px_0px_rgba(255,255,255,0.4)] backdrop-blur-[7.5px] px-[60px] py-[12px] border-[#FFFFFF] border-[0.5px] rounded-[8px] text-[#FFFFFF] text-[18px] cursor-pointer"
            >
              აირჩიე ლინკი
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExtraMedia;
