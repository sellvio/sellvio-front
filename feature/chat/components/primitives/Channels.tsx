import { channelsData } from "../../data/chatData";

const Channels = () => {
  return (
    <div className="min-h-screen">
      <div className="px-[13px] py-[10px] border-b border-r border-[#E0E0E0] max-w-[277px] w-full text-[#ffffff] text-[16px] font-[600]">
        კარფურის პროდუქტები
      </div>
      <div className="max-w-[277px] w-full border-r border-[#E0E0E0]">
        {channelsData.map((section) => (
          <div key={section.sectionTitle}>
            <div className="px-[13px] py-[10px]  text-[#ffffff] text-[16px] font-[600]">
              {section.sectionTitle}
            </div>

            {section.channels.map((ch) => (
              <div
                key={ch.id}
                className="flex items-center gap-[8px] px-[13px] py-[8px] text-[#cfcfcf] text-[14px] cursor-pointer"
              >
                <img
                  src={ch.image}
                  alt={ch.title}
                  className="w-[20px] h-[20px]"
                />
                <span>{ch.title}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Channels;
