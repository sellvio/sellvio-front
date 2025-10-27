'use client';
const BusinessProfilePictureSkeleton = () => {
  const skeletonTags = [
    { id: 1, width: '120px', height: '20px' },
    { id: 2, width: '150px', height: '20px' },
    { id: 3, width: '100px', height: '20px' },
  ];

  return (
    <div className="flex flex-col items-end gap-6 m-auto w-full max-w-[1360px] min-h-[548px] animate-pulse">
      <div className="flex flex-col items-center gap-4 mt-[48px] w-full">
        <div className="relative bg-gray-300 rounded-[12px] w-full max-w-[1360px] min-h-[397px]" />

        <div className="pl-[330px] w-full">
          <div className="bg-gray-300 rounded-md w-[300px] h-[29px]" />
        </div>

        <div className="flex gap-[34px] pl-[330px] w-full">
          {skeletonTags.map((tag) => (
            <div
              key={tag.id}
              className="flex items-center gap-2 bg-gray-200 px-5 py-3 rounded-[12px]"
            >
              <div className="bg-gray-400 rounded-full w-5 h-5" />
              <div
                className={`h-[${tag.height}] w-[${tag.width}] bg-gray-300 rounded-md`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BusinessProfilePictureSkeleton;
