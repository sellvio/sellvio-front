'use client';
import Image from 'next/image';
import { useState, useRef } from 'react';
import { BusinessProfilePictureProps } from '../../type';
import { useQuery } from '@tanstack/react-query';
import { businessProfileData } from '@/lib/api/businessProfileData';
import BusinessProfilePictureSkeleton from './BusinessProfilePictureSkeleton';

const BusinessProfilePicture = ({
  setChangeProfile,
  changeProfile,
  onLogoChange,
  onCoverChange,
  isUploading,
}: BusinessProfilePictureProps) => {
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

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

  const handleLogoClick = () => {
    if (changeProfile && logoInputRef.current) {
      logoInputRef.current.click();
    }
  };

  const handleCoverClick = () => {
    if (changeProfile && coverInputRef.current) {
      coverInputRef.current.click();
    }
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // შევამოწმოთ ფაილის ტიპი
      if (!file.type.startsWith('image/')) {
        alert('გთხოვთ აირჩიოთ სურათის ფაილი');
        return;
      }

      // Preview-ისთვის
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      // გავაგზავნოთ ფაილი parent component-ში
      if (onLogoChange) {
        onLogoChange(file);
      }
    }
  };

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // შევამოწმოთ ფაილის ტიპი
      if (!file.type.startsWith('image/')) {
        alert('გთხოვთ აირჩიოთ სურათის ფაილი');
        return;
      }

      // Preview-ისთვის
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverPreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      // გავაგზავნოთ ფაილი parent component-ში
      if (onCoverChange) {
        onCoverChange(file);
      }
    }
  };

  if (isError) return <p>Failed to fetch profile</p>;

  return isLoading ? (
    <BusinessProfilePictureSkeleton />
  ) : (
    <div className="flex flex-col items-end gap-[24px] m-auto w-full max-w-[1360px] min-h-[548px]">
      <div className="flex flex-col items-center gap-4 mt-[48px] w-full">
        <div
          className="group relative flex justify-end items-start bg-black p-[20px] rounded-[12px] w-full max-w-[1360px] min-h-[397px] cursor-pointer"
          style={{
            backgroundImage: `url('${
              coverPreview ||
              profile?.business_cover_image_url ||
              '/images/businessIcons/png/defaultBanner.png'
            }')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          onClick={handleCoverClick}
        >
          {/* Hidden file input for cover */}
          <input
            ref={coverInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleCoverChange}
            disabled={!changeProfile}
          />

          {changeProfile && (
            <div className="absolute inset-0 flex justify-center items-center bg-black/30 opacity-0 group-hover:opacity-100 rounded-[12px] transition-opacity">
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                <p className="text-white">დააწკაპუნეთ გარეკანის შესაცვლელად</p>
              </div>
            </div>
          )}

          <button
            onClick={(e) => {
              e.stopPropagation();
              setChangeProfile(true);
            }}
            className="z-10 flex items-center gap-[14px] bg-[#FFFFFF1F] shadow-[4px_5px_6px_0px_#FFFFFF33_inset] backdrop-blur-[7.5px] px-[15px] py-[12px] rounded-[12px] cursor-pointer"
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

          {/* Logo section */}
          <div
            className="group/logo bottom-[-151px] left-[75px] absolute border-[#000000] border-[4px] rounded-full w-[226px] h-[226px] cursor-pointer"
            style={{
              backgroundImage: `url('${
                logoPreview ||
                profile?.logo_url ||
                '/images/businessIcons/png/defaultUserProfile.png'
              }')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
            onClick={(e) => {
              e.stopPropagation();
              handleLogoClick();
            }}
          >
            {/* Hidden file input for logo */}
            <input
              ref={logoInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleLogoChange}
              disabled={!changeProfile}
            />

            {changeProfile && (
              <div className="absolute inset-0 flex justify-center items-center bg-black/30 opacity-0 group-hover/logo:opacity-100 rounded-full transition-opacity">
                <div className="bg-white/20 backdrop-blur-sm px-3 py-2 rounded-lg">
                  <p className="text-white text-sm">შეცვალე ლოგო</p>
                </div>
              </div>
            )}
          </div>
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
