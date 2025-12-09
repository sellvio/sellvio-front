const ProfileUpdatePopup = ({ successUpdate, setSuccsessUpdate }) => {
  if (!successUpdate) return null;
  return (
    <div className="z-50 fixed inset-0 flex justify-center items-center bg-black/50">
      <div className="relative flex flex-col justify-center items-center gap-[46px] bg-[linear-gradient(0deg,rgba(255,255,255,0.88),rgba(255,255,255,0.88)),linear-gradient(0deg,rgba(8,102,255,0.1),rgba(8,102,255,0.1))] shadow-[4px_5px_6px_0px_#FFFFFF66_inset,-1px_-3px_4px_0px_#FFFFFF66_inset,0px_8px_13px_0px_#0000000A] backdrop-blur-[7.5px] rounded-[8px] w-full max-w-[721px] min-h-[257px]">
        <p className="font-bold text-[20px] text-black">
          შენი პროფილი წარმატებით განახლდა
        </p>
        <button
          onClick={() => setSuccsessUpdate(false)}
          className="bg-[#FFFFFF1A] hover:bg-[#0ACF4640] shadow-[4px_5px_6px_0px_#FFFFFF66_inset,-1px_-3px_4px_0px_#FFFFFF66_inset,0px_8px_13px_0px_#0000000A] px-[102px] py-[16px] border border-[#E3E8EF] rounded-[8px] font-bold text-[#000000D4] text-[20px] cursor-pointer"
        >
          დეშბორდზე დაბრუნება
        </button>
      </div>
    </div>
  );
};

export default ProfileUpdatePopup;
