import Image from "next/image";
import { channelsData } from "../../data/chatData";

const Channels = () => {
  return (
    <div className="flex flex-col justify-between max-w-[277px] w-full h-screen border-r border-[#E0E0E0]">
      <div className="px-[13px] py-[10px] border-b border-[#E0E0E0] text-[#ffffff] text-[16px] font-[600]">
        კარფურის პროდუქტები
      </div>

      <div className="flex-1">
        {channelsData.map((section) => (
          <div key={section.sectionTitle}>
            <div className="px-[13px] py-[10px] text-[#ffffff] text-[16px] font-[600]">
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

      <div className="bg-[#FFFFFF36] h-[50px] flex items-center gap-3 px-3 mb-4 rounded-[10px] mx-3">
        <div className="w-[31px] h-[31px] rounded-full bg-[aqua]"></div>

        <div className="flex flex-col">
          <p className="text-[#FFFFFF] text-[15px] font-[600]">
            ვაჩე გაბრინდაშვილი
          </p>
          <p className="text-[#FFFFFF] text-[12px] font-[600]">ონლაინ</p>
        </div>
      </div>
    </div>
  );
};

export default Channels;
