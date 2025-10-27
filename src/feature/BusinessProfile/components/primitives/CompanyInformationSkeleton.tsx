'use client';
const CompanyInformationSkeleton = () => {
  const inputSkeletons = Array(8).fill({ height: '56px', width: '100%' });
  const textareaSkeleton = { height: '96px', width: '100%' };

  return (
    <div className="flex flex-col items-center mt-[72px] w-full animate-pulse">
      <div className="flex flex-col gap-[31px] w-full max-w-[1225px]">
        <div className="flex flex-col gap-[30px] bg-gray-200 p-[30px] rounded-[8px] min-h-[231px]">
          <div className="bg-gray-300 rounded-md w-[200px] h-6" />
          <div className="bg-gray-300 rounded-md w-[250px] h-4" />
          <div className="flex justify-between gap-[30px] mt-4">
            {inputSkeletons.slice(0, 2).map((_, idx) => (
              <div
                key={idx}
                className="bg-gray-300 rounded-md w-full max-w-[545px] h-[56px]"
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-[16px] bg-gray-200 p-[30px] rounded-[8px]">
          <div className="bg-gray-300 rounded-md w-[180px] h-6" />
          <div
            className="bg-gray-300 rounded-md"
            style={{ height: textareaSkeleton.height }}
          />
        </div>

        <div className="flex flex-col gap-[16px] bg-gray-200 p-[30px] rounded-[8px]">
          <div className="flex gap-[75px] w-full">
            {inputSkeletons.slice(2, 4).map((_, idx) => (
              <div
                key={idx}
                className="bg-gray-300 rounded-md w-full h-[56px]"
              />
            ))}
          </div>
          <div className="flex flex-col gap-[16px] w-full">
            <div className="bg-gray-300 rounded-md w-full h-[56px]" />
          </div>
        </div>

        <div className="flex flex-col gap-[16px] bg-gray-200 p-[30px] rounded-[8px]">
          <div className="flex gap-[75px] w-full">
            {inputSkeletons.slice(4, 6).map((_, idx) => (
              <div
                key={idx}
                className="bg-gray-300 rounded-md w-full h-[56px]"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyInformationSkeleton;
