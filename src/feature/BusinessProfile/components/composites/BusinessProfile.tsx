'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import CompanyInformation from '../primitives/CompanyInformation';
import CanseEditlPopup from '../primitives/CanseEditlPopup';
import ProfileUpdatePopup from '../primitives/ProfileUpdatePopup';
import BusinessProfilePicture from '../primitives/BusinessProfilePicture';
import BusinessProfilePictureSkeleton from '../primitives/BusinessProfilePictureSkeleton';
import CompanyInformationSkeleton from '../primitives/CompanyInformationSkeleton';
import { businessProfileData } from '@/lib/api/businessProfileData';
import { BusinessProfileResponse } from '../../type';

const Notice = ({ children }: { children: React.ReactNode }) => (
  <div className="flex justify-center items-center px-[20px] min-h-[60vh] font-medium text-[18px] text-center">
    {children}
  </div>
);

const BusinessProfile = () => {
  const [changeProfile, setChangeProfile] = useState<boolean>(false);
  const [successUpdate, setSuccsessUpdate] = useState<boolean>(false);
  const [popupVisible, setPopupVisible] = useState<boolean>(false);
  // null = not checked yet (SSR / first render)
  const [hasToken, setHasToken] = useState<boolean | null>(null);

  useEffect(() => {
    setHasToken(Boolean(localStorage.getItem('access_token')));
  }, []);

  const { data, isLoading } = useQuery<BusinessProfileResponse>({
    queryKey: ['businessProfile'],
    queryFn: businessProfileData,
    enabled: hasToken === true,
  });

  if (hasToken === false) {
    return (
      <Notice>
        <p>
          პროფილის სანახავად{' '}
          <Link href="/login" className="font-bold text-[#3012B3] underline">
            გაიარეთ ავტორიზაცია
          </Link>
        </p>
      </Notice>
    );
  }

  if (hasToken === null || isLoading) {
    return (
      <div>
        <BusinessProfilePictureSkeleton />
        <CompanyInformationSkeleton />
      </div>
    );
  }

  if (data && !data.data?.business_profiles) {
    return (
      <Notice>
        <p>ეს გვერდი ხელმისაწვდომია მხოლოდ ბიზნეს ანგარიშებისთვის</p>
      </Notice>
    );
  }

  return (
    <div className="relative">
      <CanseEditlPopup
        popupVisible={popupVisible}
        setPopupVisible={setPopupVisible}
        setChangeProfile={setChangeProfile}
      />
      <ProfileUpdatePopup
        successUpdate={successUpdate}
        setSuccsessUpdate={setSuccsessUpdate}
      />
      <BusinessProfilePicture
        setChangeProfile={setChangeProfile}
        changeProfile={changeProfile}
      />
      <CompanyInformation
        changeProfile={changeProfile}
        setChangeProfile={setChangeProfile}
        setPopupVisible={setPopupVisible}
        setSuccsessUpdate={setSuccsessUpdate}
      />
    </div>
  );
};

export default BusinessProfile;
