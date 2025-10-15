'use client';
import Image from 'next/image';

const BusinessProfilePicture = ({ setChangeProfile, changeProfile }) => {
  return (
    <div className="flex flex-col items-end gap-[24px] m-auto w-full max-w-[1360px] min-h-[548px]">
      <div className="flex flex-col items-center gap-4 mt-[48px] w-full">
        <div
          className="relative flex justify-end items-start bg-black p-[20px] rounded-[12px] w-full max-w-[1360px] min-h-[397px]"
          style={{
            backgroundImage: `url('/images/businessIcons/png/defaultBanner.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <button
            onClick={() => setChangeProfile((changeProfile) => !changeProfile)}
            className="flex items-center gap-[14px] bg-[#FFFFFF1F] px-[15px] py-[12px] border border-[#3012B3AD] rounded-[12px] cursor-pointer"
          >
            <Image
              src="/images/businessIcons/svg/editIcon.svg"
              alt="editIcon"
              width={22}
              height={22}
            />
            <p className="text-[#FFFFFFB8]">
              {changeProfile ? 'შეასწორე გარეკანის ფოტო' : 'შეასწორე პროფილი'}
            </p>
          </button>
          <div
            className="bottom-[-151px] left-[75px] absolute border-[#000000] border-[4px] rounded-full w-[226px] h-[226px] cursor-pointer"
            style={{
              backgroundImage: `url('/images/businessIcons/png/defaultUserProfile.png')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default BusinessProfilePicture;
