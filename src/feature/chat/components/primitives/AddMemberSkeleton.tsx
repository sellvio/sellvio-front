const AddMemberSkeleton = () => {
  return (
    <div className="flex flex-col gap-2 max-h-[300px] overflow-y-auto">
      {[...Array(5)].map((_, index) => (
        <div
          key={index}
          className="flex items-center gap-2 bg-[#ffffff0a] px-4 py-2 rounded-md animate-pulse"
        >
          <div className="bg-[#ffffff36] border border-[#ffffff36] rounded w-4 h-4" />

          <div className="bg-[#ffffff36] rounded-full w-8 h-8" />

          <div className="bg-[#ffffff36] rounded w-1/3 h-4"></div>
        </div>
      ))}
    </div>
  );
};

export default AddMemberSkeleton;
