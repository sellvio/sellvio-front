"use client";
import Image from "next/image";
import { useState } from "react";

import ToggleSwitch from "../primitives/ToggleSwitch";

const CompanyBasics = () => {
  const [isOn, setIsOn] = useState(false);

  const toggleHandler = () => {
    setIsOn((prev) => !prev);
  };

  return (
    <div className="max-w-[1222px] w-full bg-transparent mx-auto rounded-[8px] px-[30px] py-[30px] flex flex-col border justify-center">
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <Image
            src="/images/svg/companyBasics.svg"
            width={22}
            height={22}
            alt="logo"
          />
          <h2 className="text-[27px] font-[600] text-[var(--)]">
            კამპანიის საფუძვლები
          </h2>
        </div>
        <p className="text-[var(--campaing-form-paragraphs)] text-[14px]">
          დააყენეთ თქვენი კამპანიის ფუნდამენტური დეტალები
        </p>
      </div>

      <form className="flex flex-col gap-[37px] mt-[26px] w-full">
        <div className="flex flex-col lg:flex-row gap-[75px] w-full">
          <div className="flex-1">
            <h3 className="text-[var(--black-color)] font-[700] text-[18px] mb-4">
              კამპანიის სახელი
            </h3>
            <input
              type="text"
              placeholder="მაგ: საზაფხულო პროდუქტი"
              className="w-full border border-[var(--auth-input-border)] rounded px-3 py-2 text-[var(--black-color)] font-[700] outline-none"
            />
          </div>

          <div className="flex-1">
            <h3 className="font-[700] text-[18px] text-[var(--black-color)]] mb-4">
              ბიუჯეტი (ლარში)
            </h3>
            <input
              type={isOn ? "password" : "text"}
              placeholder="₾ 5000"
              className="w-full border border-[var(--auth-input-border) rounded px-3 py-2 text-[var(--black-color)] font-[700] outline-none"
            />

            <div
              className="w-full flex items-center gap-3 cursor-pointer mt-3 justify-end"
              onClick={toggleHandler}
            >
              <p className="text-[var(--black-color)] font-[700]">
                დამალე ბიუჯეტი შემქნელებისთვის
              </p>
              <ToggleSwitch value={isOn} onToggle={toggleHandler} />
            </div>
          </div>
        </div>

        <div className="w-full">
          <h3 className="font-[700] text-[18px] text-[var(--black-color)] mb-4">
            კამპანიის აღწერა
          </h3>
          <textarea
            placeholder="აღწერეთ თქვენი კამპანიის მიზნები, სამიზნე აუდიტორია და რას ეძებთ შემქმნელებში..."
            className="w-full border border-[var(--auth-input-border)] rounded px-3 py-2 text-[var(--black-color)] min-h-[218px] font-[700] outline-none resize-none"
          />
        </div>
      </form>
    </div>
  );
};

export default CompanyBasics;
