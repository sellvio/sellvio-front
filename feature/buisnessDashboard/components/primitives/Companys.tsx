"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ToggleButtons from "../../../createCampaing/components/primitives/ToggleButtons";
import Button from "../../../myProfile/components/primirtives/button";
import ProgressBar from "./ProgressDash";
import { data } from "../../data/landingData";

const Companys = () => {
  const [active, setActive] = useState<"analytic" | "campaing">("analytic");

  return (
    <div>
      <ToggleButtons active={active} setActive={setActive} />
      <div className="flex flex-wrap gap-6 max-w-[1387px] w-full mx-auto">
        <div className="flex justify-between items-center w-[1378px] mx-auto">
          <h2 className="text-[24px] font-bold text-[#000000]">
            შენი კამპანიები
          </h2>
          <div>
            <Link href="createForm">
              <Button
                text="დაიწყე ახალი კემპინგი"
                color=" bg-[#0866FF] text-[#ffffff]"
                size="w-[229px] py-3 px-2 border cursor-pointer text-[14px]"
                img="/images/svg/plus.svg"
              />
            </Link>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 max-w-[1387px]  justify-center ">
          {data?.map((eachElement, index) => (
            <div
              key={index}
              className="max-w-[446px] bg-transparent rounded-[8px] border border-[#00000036] flex flex-col relative"
            >
              <div className="relative">
                <Image
                  src="/images/png/pictureBg.png"
                  width={446}
                  height={244}
                  alt="bg"
                  className="rounded-t-[8px]"
                />
                <div
                  className={`absolute top-[19px] left-[19px] rounded-3xl px-3 py-2 font-semibold text-[10px] text-white ${
                    eachElement.status === "აქტიური"
                      ? "bg-[#00D5404F]"
                      : eachElement.status === "დაუსრულებელი"
                      ? "bg-[#C13D3F4F]"
                      : "bg-[#C13D3F4F]"
                  }`}
                >
                  {eachElement.status}
                </div>

                <div className="absolute bottom-[22px] left-[19px]">
                  <p className="text-[18px] font-[700] text-white drop-shadow-md">
                    კამპანიის სახელწოდება
                  </p>
                </div>
              </div>

              <div className="flex flex-col px-[22px] mt-4 flex-1">
                <div className="flex justify-between max-w-[319px]">
                  <div className="flex items-center gap-2">
                    <Image
                      src="/images/svg/created.svg"
                      width={16}
                      height={16}
                      alt="created"
                    />
                    <div className="flex items-center gap-3">
                      <p className="text-[#111827AD] font-medium">
                        <span>{eachElement.creator.toLocaleString()}</span>
                        შექმნილი
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Image
                      src="/images/svg/eye.svg"
                      width={16}
                      height={16}
                      alt="views"
                    />
                    <p className="text-[#111827AD] font-medium">
                      <span>{eachElement.views.toLocaleString()}</span> ნახვა
                    </p>
                  </div>
                </div>

                <div className="flex justify-between mt-[13px] text-[14px] text-[#111827AD]">
                  <p className="font-medium">ბიუჯეტი</p>
                  <p className="font-[600] text-[#111827]">
                    ${eachElement.yourbudget.toLocaleString()} / $
                    {eachElement.fullbudget.toLocaleString()}
                  </p>
                </div>
                <ProgressBar
                  currentAmount={eachElement.yourbudget}
                  goalAmount={10000}
                />

                <div className="flex justify-between items-center text-[#000000AD] font-medium">
                  <p>ჯამური გადახდა</p>
                  <p className="text-[#00D540] font-semibold">
                    ${eachElement.totalpayment.toLocaleString()}
                  </p>
                </div>

                <div className="flex gap-3 mt-4 mb-[18px]">
                  <button className="w-[259px] py-3 bg-transparent rounded-[8px] border border-[#00000036] text-[#111827] font-bold flex items-center justify-center gap-2 cursor-pointer">
                    <Image
                      src="/images/svg/analytic.svg"
                      width={18}
                      height={18}
                      alt="analytic"
                    />
                    ანალიტიკა
                  </button>
                  <button className="w-[133px] py-3 bg-transparent rounded-[8px] border border-[#00000036] text-[#111827] font-bold flex items-center justify-center text-[15px] cursor-pointer">
                    გახსენი ჩატი
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Companys;
