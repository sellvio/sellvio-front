import Image from "next/image";
import { campaignData } from "../../data/data";

const YourVideos = () => {
  return (
    <div className="max-w-[1440px] w-full mx-auto flex  gap-[27px] flex-wrap justify-center">
      {campaignData.map((item) => (
        <div
          key={item.id}
          className="max-w-[680px] min-h-[287px] border border-[#E3E3E3] rounded-[10px] overflow-hidden"
        >
          <div className="flex items-center gap-1 w-full bg-[#0866FF0A] py-3 pl-[25px]">
            <div className="w-[31px] h-[31px] rounded-[50px] bg-[#D9D9D9]" />
            <div>
              <p className="font-[600] text-[14px]">{item.name}</p>
              <p className="text-[14px] text-[#000000AD]">{item.role}</p>
            </div>
          </div>

          <div className="w-full flex gap-4 justify-center mt-[20px] mb-[20px] px-[20px]">
            <div>
              <Image
                src={item.video}
                width={156}
                height={150}
                alt="video"
                className="rounded-[8px] object-cover"
              />
            </div>

            <div className="max-w-[455px] min-h-[142px] flex flex-col justify-between">
              <div>
                <h3 className="font-[600] text-[14px]">{item.videoName}</h3>
                <p className="text-[#000000AD] text-[14px]">
                  {item.videoDescription}
                </p>
                <div className="flex items-center gap-1 mt-[18px]">
                  <Image
                    src="/images/creatorDashboard/svg/creatorProfileCalendar.svg"
                    width={14}
                    height={14}
                    alt="calendar"
                  />
                  <p className="text-[13px]">{item.publiched}</p>
                </div>
              </div>

              <div className="flex items-center justify-between mt-[12px]">
                <div className="flex items-center gap-3">
                  <p>სტატუსი:</p>
                  <div
                    className={`w-[80px] h-[24px] text-[9px] flex justify-center items-center rounded-[11px]
                      ${
                        item.status === "დადებითი"
                          ? "bg-[#C4F7C14F] text-[#16A34A]"
                          : "bg-[#C13D3F4F] text-[#EB1654]"
                      }`}
                  >
                    {item.status}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button className="w-[125px] py-[5px] bg-[#0866FF14] text-[#0866FF] rounded-[8px] flex justify-center cursor-pointer">
                    გახსენი ჩატი
                  </button>
                  <button className="w-[125px] py-[5px] bg-[#0866FFDB] text-[#ffffff] rounded-[8px] flex justify-center cursor-pointer">
                    დაამატე URL
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full flex items-center justify-between border-t border-[#E3E3E3] bg-[#0866FF0A] text-[14px] pl-[20px]">
            <div className="flex items-center gap-[16px]">
              <div className="flex items-center gap-1">
                <Image
                  src="/images/creatorDashboard/svg/eye.svg"
                  width={14}
                  height={14}
                  alt="views"
                />
                <p>ნახვები: {item.views}</p>
              </div>
              <div className="flex items-center gap-1">
                <Image
                  src="/images/creatorDashboard/svg/trending-up.svg"
                  width={14}
                  height={14}
                  alt="trending"
                />
                <p>
                  {item.campaingName}: {item.percent}
                </p>
              </div>
            </div>

            <button
              className="w-[131px] text-[#4A4A4A] text-[13px] bg-[#FFFFFF52] font-medium 
                hover:text-black transition border-l border-[#E3E3E3] 
                cursor-pointer flex justify-center items-center py-[12px]"
            >
              კომენტარები
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default YourVideos;
