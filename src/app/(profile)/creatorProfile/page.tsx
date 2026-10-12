import MyProfile from "../../../../feature/myProfile/components/composites/MyProfile";
import RequireUserType from "../../../../feature/components/RequireUserType";

const CreatorProfile = () => {
  return (
    <RequireUserType userType="creator">
      <div>
        <MyProfile />
      </div>
    </RequireUserType>
  );
};

export default CreatorProfile;
