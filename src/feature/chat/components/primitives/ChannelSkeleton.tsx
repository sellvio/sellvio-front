import React from 'react';

const ChannelSkeleton = () => {
  return (
    <div className="animate-pulse">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="flex justify-between items-center gap-2 bg-[#1a1a1a] mb-2 px-2 py-2 rounded-tl-[6px] rounded-bl-[6px]"
        >
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-r from-gray-600 via-gray-500 to-gray-600 rounded-full w-4 h-4"></div>
            <div className="bg-gradient-to-r from-gray-600 via-gray-500 to-gray-600 rounded w-24 h-4"></div>
          </div>
          <div className="bg-gradient-to-r from-gray-600 via-gray-500 to-gray-600 rounded w-4 h-4"></div>
        </div>
      ))}
    </div>
  );
};

export default ChannelSkeleton;
