'use client';
import Image from 'next/image';
import { useRef, useState } from 'react';

const BusinessProfilePicture = () => {
  const [banner, setBanner] = useState<string | null>(null);
  const [profile, setProfile] = useState<string | null>(null);

  const bannerInputRef = useRef<HTMLInputElement | null>(null);
  const profileInputRef = useRef<HTMLInputElement | null>(null);

  const handleUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setter(URL.createObjectURL(file));
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 mt-[48px] w-full">
      <div
        className="relative flex justify-end items-start bg-black p-[20px] rounded-[12px] w-full max-w-[1360px] min-h-[397px]"
        style={{
          backgroundImage: banner ? `url(${banner})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div
          onClick={() => bannerInputRef.current?.click()}
          className="flex items-center gap-[14px] bg-[#FFFFFF1F] px-[15px] py-[12px] border border-[#3012B3AD] rounded-[12px] cursor-pointer"
        >
          <Image
            src="/images/businessIcons/svg/editIcon.svg"
            alt="editIcon"
            width={22}
            height={22}
          />
          <p className="text-[#FFFFFFB8]">შეასწორე პროფილი</p>
        </div>
        <div
          onClick={() => profileInputRef.current?.click()}
          className="bottom-[-151px] left-[75px] absolute border-[#000000] border-[4px] rounded-full w-[226px] h-[226px] cursor-pointer"
          style={{
            backgroundImage: profile
              ? `url(${profile})`
              : `url('/images/businessIcons/png/defaultUserProfile.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>
      </div>
      <input
        ref={bannerInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(event) => handleUpload(event, setBanner)}
      />
      <input
        ref={profileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(event) => handleUpload(event, setProfile)}
      />
    </div>
  );
};

export default BusinessProfilePicture;
