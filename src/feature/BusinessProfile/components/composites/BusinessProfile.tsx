'use client';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import CompanyInformation from '../primitives/CompanyInformation';
import CanseEditlPopup from '../primitives/CanseEditlPopup';
import ProfileUpdatePopup from '../primitives/ProfileUpdatePopup';
import BusinessProfilePicture from '../primitives/BusinessProfilePicture';
import { uploadProfileImages } from '@/lib/api/businessProfileData';

const BusinessProfile = () => {
  const [changeProfile, setChangeProfile] = useState<boolean>(false);
  const [successUpdate, setSuccsessUpdate] = useState<boolean>(false);
  const [popupVisible, setPopupVisible] = useState<boolean>(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);

  const queryClient = useQueryClient();

  const uploadMutation = useMutation({
    mutationFn: uploadProfileImages,
    onSuccess: (data) => {
      console.log('Upload successful:', data);
      queryClient.invalidateQueries({ queryKey: ['businessProfile'] });
      setSuccsessUpdate(true);
      setLogoFile(null);
      setCoverFile(null);
    },
    onError: (error: any) => {
      console.error('Upload failed:', error);
      alert(`ფოტოს ატვირთვა ვერ მოხერხდა: ${error.message}`);
    },
  });

  const handleLogoChange = (file: File) => {
    console.log('Logo selected:', file.name);
    setLogoFile(file);
    // დაუყოვნებლივ ავტვირთოთ
    uploadMutation.mutate({ logo: file });
  };

  const handleCoverChange = (file: File) => {
    console.log('Cover selected:', file.name);
    setCoverFile(file);
    // დაუყოვნებლივ ავტვირთოთ
    uploadMutation.mutate({ coverImage: file });
  };

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
        onLogoChange={handleLogoChange}
        onCoverChange={handleCoverChange}
        isUploading={uploadMutation.isPending}
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
