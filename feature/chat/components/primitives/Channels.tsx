import Image from 'next/image';
import { channelsData } from '../../data/chatData';
import { ChannelsProps } from '../../types';

const Channels = ({ setChatInfoOpen }: ChannelsProps) => {
  return (
    <div className="flex flex-col justify-between bg-[#001541D6] border-[#E0E0E0] border-r w-full max-w-[277px] h-screen">
      <div className="px-[13px] py-[10px] border-[#E0E0E0] border-b min-h-[49px] font-[600] text-[#ffffff] text-[16px]">
        კარფურის პროდუქტები
      </div>

      <div className="flex-1 pl-[13px]">
        {channelsData.map((section) => (
          <div key={section.sectionTitle}>
            <div className="py-[10px] pl-[8px] font-[600] text-[#ffffff] text-[16px]">
              {section.sectionTitle}
            </div>

            {section.channels.map((ch) => (
              <div
                key={ch.id}
                className="group flex justify-between items-center gap-[8px] hover:bg-[#FFFFFF36] py-[8px] pr-[7px] pl-[8px] rounded-tl-[6px] rounded-bl-[6px] text-[#cfcfcf] text-[14px] transition-all duration-300 ease-in-out cursor-pointer"
              >
                <div className="flex gap-[10px]">
                  <Image src={ch.image} alt={ch.title} width={17} height={17} />
                  <span>{ch.title}</span>
                </div>
                {ch.settings === true && (
                  <button
                    onClick={() => setChatInfoOpen((prev) => !prev)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                  >
                    <Image
                      src="/images/chatIcons/svg/setting.svg"
                      alt="setting"
                      width={18}
                      height={16}
                    />
                  </button>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3 bg-[#FFFFFF36] mx-3 mb-4 px-3 rounded-[10px] h-[56px]">
        <div className="bg-[aqua] rounded-full w-[31px] h-[31px]"></div>

        <div className="flex flex-col">
          <p className="font-[600] text-[#FFFFFF] text-[15px]">
            ვაჩე გაბრინდაშვილი
          </p>
          <p className="font-[600] text-[#FFFFFF] text-[12px]">ონლაინ</p>
        </div>
      </div>
    </div>
  );
};

export default Channels;
