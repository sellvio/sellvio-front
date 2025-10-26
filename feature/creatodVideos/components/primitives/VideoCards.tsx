"use client";
import Image from "next/image";
import { videoData } from "../../data/data";
import ToggleButtons from "../../../createCampaing/components/primitives/ToggleButtons";
import Link from "next/link";
import { useState } from "react";
import { campaignData } from "../../../creatorDashboard/data/data";

const VideoCards = () => {
  const [active, setActive] = useState<"analytic" | "campaing">("analytic");
  return (
    <div className="flex flex-col max-w-[1387px] w-full mx-auto justify-center py-[22px]">
      <div className="flex mt-[26px] mb-[40px] max-w-[1440px] w-full justify-between items-center flex-wrap">
        <ToggleButtons
          active={active}
          setActive={setActive}
          firstLabel="ვიდეოები"
          secondLabel="შენახული"
          className="max-w-[536px] w-full flex"
          firstImage="/images/creatorDashboard/svg/trumpet.svg"
          secondImage="/images/creatorDashboard/svg/gallery.svg"
        />
        <Link href="/createForm">
          <button className="bg-[var(--button-bg)] w-[229px] py-3 justify-center border cursor-pointer text-[14px] flex items-center gap-2 text-[var(--white-color)] rounded-[8px]">
            <Image
              src="/images/creatorDashboard/svg/users.svg"
              width={18}
              height={18}
              alt="icon"
            />
            მოძებნე მეტი კამპანია
          </button>
        </Link>
      </div>

      {active === "analytic" ? (
        // Video Cards View (ვიდეოები)
        <div className="flex flex-wrap justify-between max-w-[1387px] gap-5">
          {videoData?.map((eachElement) => (
            <div
              key={eachElement.id}
              className="max-w-[446px] bg-transparent rounded-[8px] min-h-[402px] border border-[var(--buisness-cards-border)] flex flex-col relative gap-5"
            >
              <div className="relative">
                <Image
                  src="/images/png/pictureBg.png"
                  width={446}
                  height={244}
                  alt="bg"
                  className="rounded-t-[8px]"
                />

                <div className="absolute top-[19px] left-[19px] flex items-center gap-[6px]">
                  {eachElement.statusImage && (
                    <Image
                      src={eachElement.statusImage}
                      alt={eachElement.status}
                      width={18}
                      height={18}
                    />
                  )}

                  <div
                    className={`rounded-3xl px-3 py-2 font-semibold text-[10px] ${
                      eachElement.status === "გაწევრიანებული"
                        ? "bg-[var(--videos-status-green)] text-[var(--total-payment)]"
                        : eachElement.status === "მომლოდინეთა სიაში"
                        ? "bg-[#FFFFFF57] text-[var(--videos-status-pending)]"
                        : eachElement.status === "დადასტურებული"
                        ? "bg-[var(--videos-status-green)] text-[var(--approved-card-status)]"
                        : eachElement.status === "უარყოფილი"
                        ? "bg-[var(--videos-status-rejected)] text-[var(--videos-status-rejected-text)]"
                        : ""
                    }`}
                  >
                    {eachElement.status}
                  </div>
                </div>

                <div className="absolute bottom-[22px] left-[19px]">
                  <p className="text-[18px] font-[700] text-[var(--white-color)] drop-shadow-md">
                    ვიდეოს სახელწოდება
                  </p>
                  <p className="text-[14px] font-[500] text-[var(--videos-card-paragraph)] drop-shadow-md">
                    $28 ყოველ 1 მ ნახვაზე
                  </p>
                </div>
              </div>

              <div className="flex flex-col px-[22px] flex-1 gap-3">
                <div className="flex justify-between max-w-[319px]">
                  <div className="flex items-center gap-2">
                    <Image
                      src="/images/svg/eye.svg"
                      width={16}
                      height={16}
                      alt="views"
                    />
                    <p className="text-[var(--buisness-card-info)] font-medium">
                      <span>{eachElement.views.toLocaleString()}</span> ნახვა
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Image
                      src="/images/svg/created.svg"
                      width={16}
                      height={16}
                      alt="created"
                    />
                    <div className="flex items-center gap-3">
                      <p className="text-[var(--buisness-card-info)] font-medium flex gap-2">
                        <span>{eachElement.creator.toLocaleString()}</span>
                        ვიდეო
                      </p>
                    </div>
                  </div>
                </div>

                <div className="w-full h-[1px] bg-[#11182742]"></div>

                <div className="flex justify-between items-center text-[var(--buisness-card-info)] font-medium">
                  <p>ჯამური გადახდა</p>
                  <p className="text-[var(--total-payment)] font-semibold">
                    ${eachElement.totalpayment.toLocaleString()}
                  </p>
                </div>

                <div className="flex gap-3 mt-4 mb-[18px]">
                  <button className="w-[259px] py-3 bg-transparent rounded-[8px] border border-[var(--buisness-cards-border)] text-[var(--buisness-card-info)] font-bold flex items-center justify-center gap-2 cursor-pointer">
                    <Image
                      src="/images/svg/analytic.svg"
                      width={18}
                      height={18}
                      alt="analytic"
                    />
                    ანალიტიკა
                  </button>
                  <button className="w-[133px] py-3 bg-transparent rounded-[8px] border border-[var(--buisness-cards-border)] text-[var(--buisness-card-info)] font-bold flex items-center justify-center text-[15px] cursor-pointer">
                    გახსენი ჩატი
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Campaign Cards View (შენახული)
        <div className="flex gap-[27px] flex-wrap justify-start">
          {campaignData.map((item) => (
            <div
              key={item.id}
              className="max-w-[680px] w-full min-h-[287px] border border-[#E3E3E3] rounded-[10px]"
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
      )}
    </div>
  );
};

export default VideoCards;
