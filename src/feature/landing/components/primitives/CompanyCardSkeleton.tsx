const CompanyCardSkeleton = () => {
  const SkeletonItem = () => (
    <div className="flex flex-col justify-between px-[25px] py-[23px] border-[2px] border-[var(--auth-border)] rounded-[8px] w-full max-w-[445px] min-h-[417px] animate-pulse">
      <div>
        <div className="flex justify-between w-full">
          <div className="flex items-center gap-[7px]">
            <div className="bg-gray-200 rounded-[8px] w-[28px] h-[28px]" />
            <div className="bg-gray-200 rounded-md w-[120px] h-[22px]" />
          </div>
          <div className="bg-gray-200 rounded-full w-[21px] h-[21px]" />
        </div>

        <div className="mt-[19px]">
          <div className="flex flex-wrap gap-[9px] mt-[8px] mb-[6px]">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-gray-100 rounded-[60px] w-[60px] h-[24px]"
              />
            ))}
          </div>
          <div className="space-y-2 mt-2">
            <div className="bg-gray-200 rounded w-full h-[14px]" />
            <div className="bg-gray-200 rounded w-[80%] h-[14px]" />
          </div>
        </div>

        <div className="flex flex-col justify-between bg-gray-50 mt-[13px] p-[15px] rounded-[10px] w-full min-h-[113px]">
          <div className="flex justify-between w-full max-w-[289px]">
            <div className="space-y-2">
              <div className="bg-gray-200 rounded w-[50px] h-[18px]" />
              <div className="bg-gray-200 rounded w-[80px] h-[12px]" />
            </div>
            <div className="space-y-2">
              <div className="bg-gray-200 rounded w-[50px] h-[18px]" />
              <div className="bg-gray-200 rounded w-[80px] h-[12px]" />
            </div>
          </div>
          <div className="bg-gray-200 mt-4 rounded-full w-full h-[8px]" />
        </div>

        <div className="space-y-[11px] mt-[12px]">
          <div className="flex gap-[8px]">
            <div className="bg-gray-200 rounded w-[18px] h-[18px]" />
            <div className="bg-gray-200 rounded w-[150px] h-[12px]" />
          </div>
          <div className="flex gap-[8px]">
            <div className="bg-gray-200 rounded w-[18px] h-[18px]" />
            <div className="bg-gray-200 rounded w-[100px] h-[12px]" />
          </div>
        </div>
      </div>

      <div className="bg-gray-200 mt-[17px] rounded-[8px] w-full h-[39px]" />
    </div>
  );

  return (
    <div className="flex flex-wrap justify-center gap-[20px] w-full">
      <SkeletonItem />
      <SkeletonItem />
      <SkeletonItem />
    </div>
  );
};

export default CompanyCardSkeleton;
