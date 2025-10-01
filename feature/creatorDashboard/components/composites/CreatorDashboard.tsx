import CreatorAnalityc from "../primitives/CreatorAnalityc";
import RevenueOverview from "../primitives/RevenueOverview";

const CreatorDashboard = () => {
  return (
    <div className="max-w-[1440px] w-full flex flex-col gap-8 mx-auto">
      <CreatorAnalityc />
      <RevenueOverview />
    </div>
  );
};

export default CreatorDashboard;
