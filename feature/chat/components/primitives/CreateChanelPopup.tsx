import Image from 'next/image';
import ToggleSwitch from './ToggleSwitch';

const CreateChanelPopup = ({ setIsOpen }) => {
  const channelState = watch('channel_state');

  return (
    <div className="z-50 fixed inset-0 flex justify-center items-center bg-black/50">
      <div className="relative flex flex-col justify-center items-center gap-[25px] bg-[#FFFFFF36] py-[13px] border border-[#FFFFFF36] rounded-[8px] w-full max-w-[462px] min-h-[159px]">
        <div className="space-y-[12px]">
          <p className="font-semibold text-[#ffffff] text-[18px] text-center">
            შექმენი ჩანელი
          </p>
          <p className="font-semiBold text-[#ffffff] text-[13px]">
            კამპანია ”ტიკტოკის გაპიარება”
          </p>
        </div>
        <div className="flex flex-col gap-[13px] px-[24px] w-full">
          <label
            htmlFor=""
            className="font-semibold text-[#FFFFFF] text-[13px]"
          >
            ჩანელის სახელი
          </label>
          <div>
            <input
              type="text"
              placeholder="ახალი ჩანელი"
              className="bg-[#FFFFFF36] pr-[22px] pl-[53px] border rounded-[8px] outline-none w-full min-h-[45px] font-semibold text-[#ffffff] text-[13px]"
            />
          </div>
        </div>
        <div className="space-y-[10px] px-[24px]">
          <div className="flex justify-between w-full">
            <div className="flex items-center gap-[6px]">
              <Image
                src={'/images/chatIcons/svg/visibility.svg'}
                alt="closeButton"
                width={9}
                height={11}
              />
              <p className="text-[#ffffff] text-[13px]">ხილვადობა</p>
            </div>
            <div>
              <p className="font-semibold text-white">
                {channelState === 'public' ? 'საჯარო' : 'დახურული'}
              </p>
              <ToggleSwitch
                value={channelState}
                onToggle={(val) => setValue('channel_state', val)}
              />
            </div>
          </div>
          <p className="font-semibold text-[#ffffff] text-[13px]">
            მხოლოდ არჩეულ მონაწილეებს შეეძლებათ ამ ჩატის ნახვა
          </p>
        </div>
        <div className="flex justify-center gap-[22px] px-[24px] w-full">
          <button
            onClick={() => setIsOpen(false)}
            className="bg-[#FFFFFF1A] rounded-[8px] w-1/2 min-h-[38px] font-bold text-[#ffffff] text-[13px] cursor-pointer"
          >
            უკან დაბრუნება
          </button>
          <button className="bg-[#0866FF] rounded-[8px] w-1/2 min-h-[38px] font-bold text-[#ffffff] text-[13px] cursor-pointer">
            შექმენი ჩანელი
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateChanelPopup;
