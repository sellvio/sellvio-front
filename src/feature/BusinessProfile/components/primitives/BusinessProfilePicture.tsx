'use client';
import Image from 'next/image';
import { BusinessProfilePictureProps } from '../../type';
import { useQuery } from '@tanstack/react-query';
import { businessProfileData } from '@/lib/api/businessProfileData';
import BusinessProfilePictureSkeleton from './BusinessProfilePictureSkeleton';

const BusinessProfilePicture = ({
  setChangeProfile,
  changeProfile,
}: BusinessProfilePictureProps) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['businessProfile'],
    queryFn: businessProfileData,
  });
  const profile = data?.data?.business_profiles;

  const tags = [
    {
      id: 1,
      tagsIcon: '/images/businessProfileIcon/svg/map-pin.svg',
      tags: profile?.location,
      tagsName: '',
    },
    {
      id: 2,
      tagsIcon: '/images/businessProfileIcon/svg/calendar.svg',
      tags: data?.timestamp
        ? new Date(data.timestamp).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })
        : '',
      tagsName: 'შეუერთდა: ',
    },
    {
      id: 3,
      tagsIcon: '/images/businessProfileIcon/svg/users.svg',
      tags: profile?.business_industry_name,
      tagsName: 'დასაქმებულია ',
    },
  ];

  if (isError) return <p>Failed to fetch profile</p>;

  return isLoading ? (
    <BusinessProfilePictureSkeleton />
  ) : (
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
            onClick={() => setChangeProfile(true)}
            className="flex items-center gap-[14px] bg-[#FFFFFF1F] shadow-[4px_5px_6px_0px_#FFFFFF33_inset] backdrop-blur-[7.5px] px-[15px] py-[12px] rounded-[12px] cursor-pointer"
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
        <div className="pl-[330px] w-full">
          <p className="font-semibold text-[29px]">{profile?.company_name}</p>
        </div>
        <div className="flex gap-[34px] pl-[330px] w-full">
          {tags.map((tag) => (
            <div
              key={tag.id}
              className="flex items-center gap-[6px] bg-[#0866FF26] shadow-[inset_4px_5px_6px_#FFFFFF66] backdrop-blur-[7.5px] px-[22px] py-[13px] border border-[#1118271F] rounded-[12px] cursor-pointer"
            >
              <Image src={tag.tagsIcon} alt="tags" width={20} height={20} />
              <p className="font-medium text-[#111827] text-[20px]">
                {tag.tagsName}
                {tag.tags}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BusinessProfilePicture;
