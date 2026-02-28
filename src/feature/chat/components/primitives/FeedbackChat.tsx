import Image from 'next/image';

const FeedbackChat = () => {
  return (
    <div className="flex items-center gap-2 mt-2 mb-4 px-[7px] min-h-[56px]">
      <div className="relative flex items-center border-[2px] border-dashed rounded-[6px] w-full">
        <Image
          src="/images/chatIcons/svg/upload.svg"
          width={24}
          height={24}
          alt="plus"
          className="left-2 absolute opacity-70"
        />
        <input
          type="text"
          placeholder="ატვირთე ფაილი"
          className="bg-[#FFFFFF36] disabled:opacity-50 py-[10px] pl-[36px] rounded-[6px] focus:outline-none w-full h-[56px] text-white placeholder:text-white/50 disabled:cursor-not-allowed"
        />
      </div>
    </div>
  );
};

export default FeedbackChat;
