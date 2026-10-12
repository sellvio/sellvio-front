import Landing from "../../../feature/buisnessDashboard/components/composite/Landing";
import RequireUserType from "../../../feature/components/RequireUserType";

const BuisnessDashboard = () => {
  return (
    <RequireUserType userType="business">
      <div>
        <Landing />
      </div>
    </RequireUserType>
  );
};

export default BuisnessDashboard;
