import CreatorDashboard from "../../../feature/creatorDashboard/components/composites/CreatorDashboard";
import RequireUserType from "../../../feature/components/RequireUserType";

const CreatorDashboardPage = () => {
  return (
    <RequireUserType userType="creator">
      <div>
        <CreatorDashboard />
      </div>
    </RequireUserType>
  );
};

export default CreatorDashboardPage;
