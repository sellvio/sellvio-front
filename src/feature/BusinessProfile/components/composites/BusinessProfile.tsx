'use client';
import { useState } from 'react';
import BusinessProfilePicture from '../primitives/BusinessProfilePicture';
import CompanyInformation from '../primitives/CompanyInformation';

const BusinessProfile = () => {
  const [changeProfile, setChangeProfile] = useState<boolean>(false);

  return (
    <div>
      <BusinessProfilePicture
        setChangeProfile={setChangeProfile}
        changeProfile={changeProfile}
      />
      <CompanyInformation
        changeProfile={changeProfile}
        setChangeProfile={setChangeProfile}
      />
    </div>
  );
};

export default BusinessProfile;
