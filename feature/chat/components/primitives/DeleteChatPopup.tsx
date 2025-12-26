import React from 'react';

const DeleteChatPopup = ({ handleDeleteChannel, setIsOpen }) => {
  return (
    <div className="z-50 fixed inset-0 flex justify-center items-center bg-black/50">
      <div className="relative flex flex-col justify-center items-center gap-[46px] bg-[#FFFFFF36] border border-[#FFFFFF36] rounded-[8px] w-full max-w-[392px] min-h-[159px]">
        <div className="space-y-[12px]">
          <p className="font-semibold text-[#ffffff] text-[18px] text-center">
            წაშალეთ წერილი
          </p>
          <p className="font-semiBold text-[#ffffff] text-[13px]">
            ნამდვილად გსურთ შესწორების გაუქმება?
          </p>
        </div>
        <div className="flex justify-center gap-[22px] w-full">
          <button
            onClick={() => setIsOpen(false)}
            className="bg-[#FFFFFF1A] hover:bg-[#16EB5440] shadow-[4px_5px_6px_0px_#FFFFFF66_inset,-1px_-3px_4px_0px_#FFFFFF66_inset,0px_8px_13px_0px_#0000000A] border border-[#E3E8EF] rounded-[8px] w-full max-w-[165px] min-h-[38px] font-bold text-[#ffffff] text-[13px] cursor-pointer"
          >
            უკან დაბრუნება
          </button>
          <button
            onClick={handleDeleteChannel}
            className="bg-[#FFFFFF1A] hover:bg-[#EB165440] shadow-[4px_5px_6px_0px_#FFFFFF66_inset,-1px_-3px_4px_0px_#FFFFFF66_inset,0px_8px_13px_0px_#0000000A] border border-[#E3E8EF] rounded-[8px] w-full max-w-[165px] min-h-[38px] font-bold text-[#ffffff] text-[13px] cursor-pointer"
          >
            წაშლა
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteChatPopup;
