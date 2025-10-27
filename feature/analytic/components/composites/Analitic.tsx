import AnaliticTotalCards from "../primitives/AnaliticTotalCards";
import PlatformPerformance from "../primitives/PlatformPerformance";

const Analitic = () => {
  return (
    <div className="max-w-[1440px] w-full h-[600] mx-auto flex flex-col gap-[32px]">
      <AnaliticTotalCards />
      <PlatformPerformance />
    </div>
  );
};

export default Analitic;
