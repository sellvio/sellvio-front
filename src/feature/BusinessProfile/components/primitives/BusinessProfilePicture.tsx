'use client';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { BusinessProfilePictureProps, BusinessProfileResponse } from '../../type';
import {
  businessProfileData,
  uploadProfileImages,
} from '@/lib/api/businessProfileData';
import BusinessProfilePictureSkeleton from './BusinessProfilePictureSkeleton';

const ALLOWED_IMAGE_TYPES = [
  'image/png',
  'image/jpeg',
  'image/jpg',
  'image/webp',
  'image/gif',
];
const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // backend limit: 10MB

const DEFAULT_COVER = 'linear-gradient(0deg, #3012B3 0%, #7B62E8 100%)';
const DEFAULT_LOGO = '/images/businessIcons/png/defaultUserProfile.png';

const validateImage = (file: File) => {
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    toast.error('დასაშვებია მხოლოდ PNG, JPG, WEBP ან GIF ფორმატის სურათი');
    return false;
  }
  if (file.size > MAX_IMAGE_SIZE) {
    toast.error('სურათის ზომა არ უნდა აღემატებოდეს 10MB-ს');
    return false;
  }
  return true;
};

const BusinessProfilePicture = ({
  setChangeProfile,
  changeProfile,
}: BusinessProfilePictureProps) => {
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery<BusinessProfileResponse>({
    queryKey: ['businessProfile'],
    queryFn: businessProfileData,
  });
  const profile = data?.data?.business_profiles;

  // Release object URLs created for previews
  useEffect(() => {
    return () => {
      if (logoPreview) URL.revokeObjectURL(logoPreview);
    };
  }, [logoPreview]);

  useEffect(() => {
    return () => {
      if (coverPreview) URL.revokeObjectURL(coverPreview);
    };
  }, [coverPreview]);

  const uploadMutation = useMutation({
    mutationFn: uploadProfileImages,
    onSuccess: async (_data, variables) => {
      await queryClient.invalidateQueries({ queryKey: ['businessProfile'] });
      if (variables.logo) setLogoPreview(null);
      if (variables.coverImage) setCoverPreview(null);
      toast.success('ფოტო წარმატებით განახლდა');
    },
    onError: (error: Error, variables) => {
      if (variables.logo) setLogoPreview(null);
      if (variables.coverImage) setCoverPreview(null);
      toast.error(`ფოტოს ატვირთვა ვერ მოხერხდა: ${error.message}`);
    },
  });

  const isUploading = uploadMutation.isPending;

  const joinedDate = data?.data?.created_at
    ? new Date(data.data.created_at).toLocaleDateString('ka-GE', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : '';

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
      tags: joinedDate,
      tagsName: 'შეუერთდა: ',
    },
    {
      id: 3,
      tagsIcon: '/images/businessProfileIcon/svg/users.svg',
      tags: profile?.business_employee_range,
      tagsName: 'დასაქმებულია ',
    },
  ].filter((tag) => Boolean(tag.tags));

  const openFilePicker = (input: HTMLInputElement | null) => {
    if (changeProfile && !isUploading && input) {
      input.value = '';
      input.click();
    }
  };

  const handleFileChange =
    (kind: 'logo' | 'cover') => (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file || !validateImage(file)) return;

      const previewUrl = URL.createObjectURL(file);
      if (kind === 'logo') {
        setLogoPreview(previewUrl);
        uploadMutation.mutate({ logo: file });
      } else {
        setCoverPreview(previewUrl);
        uploadMutation.mutate({ coverImage: file });
      }
    };

  if (isError) {
    return (
      <p className="mt-[48px] text-center">პროფილის ჩატვირთვა ვერ მოხერხდა</p>
    );
  }

  const coverUrl = coverPreview || profile?.business_cover_image_url;
  const logoUrl = logoPreview || profile?.logo_url || DEFAULT_LOGO;

  return isLoading ? (
    <BusinessProfilePictureSkeleton />
  ) : (
    <div className="flex flex-col items-end gap-[24px] m-auto w-full max-w-[1360px] min-h-[548px]">
      <div className="flex flex-col items-center gap-4 mt-[48px] w-full">
        <div
          className={`group relative flex justify-end items-start bg-black p-[20px] rounded-[12px] w-full max-w-[1360px] min-h-[397px] ${
            changeProfile ? 'cursor-pointer' : ''
          }`}
          style={{
            backgroundImage: coverUrl ? `url('${coverUrl}')` : DEFAULT_COVER,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          onClick={() => openFilePicker(coverInputRef.current)}
        >
          <input
            ref={coverInputRef}
            type="file"
            accept={ALLOWED_IMAGE_TYPES.join(',')}
            className="hidden"
            onChange={handleFileChange('cover')}
            disabled={!changeProfile || isUploading}
          />

          {changeProfile && (
            <div className="absolute inset-0 flex justify-center items-center bg-black/30 opacity-0 group-hover:opacity-100 rounded-[12px] transition-opacity">
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                <p className="text-white">დააწკაპუნეთ გარეკანის შესაცვლელად</p>
              </div>
            </div>
          )}

          {isUploading && (
            <div className="z-20 absolute inset-0 flex justify-center items-center bg-black/40 rounded-[12px]">
              <p className="font-medium text-white">იტვირთება...</p>
            </div>
          )}

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (changeProfile) {
                openFilePicker(coverInputRef.current);
              } else {
                setChangeProfile(true);
              }
            }}
            disabled={isUploading}
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

          <div
            className={`group/logo bottom-[-151px] left-[75px] absolute border-[#000000] border-[4px] rounded-full w-[226px] h-[226px] ${
              changeProfile ? 'cursor-pointer' : ''
            }`}
            style={{
              backgroundImage: `url('${logoUrl}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
            onClick={(e) => {
              e.stopPropagation();
              openFilePicker(logoInputRef.current);
            }}
          >
            <input
              ref={logoInputRef}
              type="file"
              accept={ALLOWED_IMAGE_TYPES.join(',')}
              className="hidden"
              onChange={handleFileChange('logo')}
              disabled={!changeProfile || isUploading}
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
              className="flex items-center gap-[6px] bg-[#0866FF26] shadow-[inset_4px_5px_6px_#FFFFFF66] backdrop-blur-[7.5px] px-[22px] py-[13px] border border-[#1118271F] rounded-[12px]"
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
