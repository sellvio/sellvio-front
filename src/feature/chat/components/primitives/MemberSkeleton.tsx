const MemberSkeleton = () => {
  return (
    <div className="[border-bottom-left-radius:10px] [border-top-left-radius:10px] gap-[14px] bg-[linear-gradient(0deg,rgba(17,24,39,0.42),rgba(17,24,39,0.42)),linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.1))] w-full max-w-[304px] h-full overflow-y-auto animate-pulse">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="flex items-center px-[22px] py-[11px] min-h-[56px]"
        >
          <div className="flex flex-col gap-[6px] w-full">
            <div className="bg-white/20 rounded w-[70%] h-[16px]" />
            <div className="bg-white/10 rounded w-[40%] h-[12px]" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default MemberSkeleton;
