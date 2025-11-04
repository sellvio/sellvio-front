'use client';
import { useState } from 'react';
import CompanyInformation from '../primitives/CompanyInformation';
import CanseEditlPopup from '../primitives/CanseEditlPopup';
import ProfileUpdatePopup from '../primitives/ProfileUpdatePopup';

const BusinessProfile = () => {
  const [changeProfile, setChangeProfile] = useState<boolean>(false);
  const [successUpdate, setSuccsessUpdate] = useState<boolean>(false);
  const [popupVisible, setPopupVisible] = useState<boolean>(false);

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
      {/* <BusinessProfilePicture
        setChangeProfile={setChangeProfile}
        changeProfile={changeProfile}
      /> */}
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
