import CreatorVideo from "../../../feature/creatodVideos/components/composites/CreatorVideo";
import RequireUserType from "../../../feature/components/RequireUserType";

const CreatorVideoPage = () => {
  return (
    <RequireUserType userType="creator">
      <div>
        <CreatorVideo />
      </div>
    </RequireUserType>
  );
};

export default CreatorVideoPage;
