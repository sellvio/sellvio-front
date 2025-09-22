import React from "react";
import MyProfileHeader from "../primirtives/MyProfileHeader";
import PrimaryInformation from "../primirtives/PrimaryInformation";
import CreatorType from "../primirtives/CreatorType";
import ContentCategory from "../primirtives/ContentCategory";
import CreatorProfile from "../primirtives/CreatorProfile";
import SocmediaPlatform from "../primirtives/SocmediaPlatform";

const MyProfile = () => {
  return (
    <div className="flex flex-col mx-auto">
      <MyProfileHeader />
      <div className="flex flex-col mt-[58px] gap-10">
        <CreatorProfile />
        <PrimaryInformation />
        <CreatorType />
        <ContentCategory
          label="კონტენტის კატეგორიები"
          placeholder="კატეგორიის დამატება"
        />
        <SocmediaPlatform />
      </div>
    </div>
  );
};

export default MyProfile;
