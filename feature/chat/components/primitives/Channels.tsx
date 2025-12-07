import Image from 'next/image';
import { channelsData } from '../../data/chatData';

const Channels = () => {
  return (
    <div className="flex flex-col justify-between bg-[#001541D6] border-[#E0E0E0] border-r w-full max-w-[277px] h-screen">
      <div className="px-[13px] py-[10px] border-[#E0E0E0] border-b font-[600] text-[#ffffff] text-[16px]">
        კარფურის პროდუქტები
      </div>

      <div className="flex-1">
        {channelsData.map((section) => (
          <div key={section.sectionTitle}>
            <div className="px-[13px] py-[10px] font-[600] text-[#ffffff] text-[16px]">
              {section.sectionTitle}
            </div>

            {section.channels.map((ch) => (
              <div
                key={ch.id}
                className="flex items-center gap-[8px] px-[13px] py-[8px] text-[#cfcfcf] text-[14px] cursor-pointer"
              >
                <Image src={ch.image} alt={ch.title} width={20} height={20} />
                <span>{ch.title}</span>
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
