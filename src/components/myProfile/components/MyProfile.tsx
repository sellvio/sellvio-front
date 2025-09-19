import React from "react";
import MyProfileHeader from "./MyProfileHeader";
import PrimaryInformation from "./PrimaryInformation";
import CreatorType from "./CreatorType";
import ContentCategory from "./ContentCategory";
import CreatorProfile from "./CreatorProfile";

const MyProfile = () => {
  return (
    <div className="flex flex-col">
      <MyProfileHeader />
      <div className="flex flex-col mt-[58px] gap-10">
        <CreatorProfile />
        <PrimaryInformation />
        <CreatorType />
        <ContentCategory
          label="კონტენტის კატეგორიები"
          placeholder="კატეგორიის დამატება"
          error=""
        />
      </div>
    </div>
  );
};

export default MyProfile;
