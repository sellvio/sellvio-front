import VideoCards from "../../../creatodVideos/components/primitives/VideoCards";
import CreatorAnalityc from "../primitives/CreatorAnalityc";

const CreatorDashboard = () => {
  return (
    <div className="max-w-[1440px] w-full flex flex-col gap-8 mx-auto">
      <CreatorAnalityc />
      <VideoCards defaultTab="analytic" />
    </div>
  );
};

export default CreatorDashboard;
