"use client";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

import ToggleSwitch from "../primitives/ToggleSwitch";
import { companySchema } from "../../schema/schema";

const CompanyBasics = () => {
  const [isOn, setIsOn] = useState(false);

  const toggleHandler = () => {
    setIsOn((prev) => !prev);
  };

  const {
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(companySchema),
  });

  return (
    <div className="max-w-[1222px] w-full bg-transparent mx-auto  rounded-[8px] px-[30px] py-[30px] flex flex-col border ">
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <Image
            src="/images/svg/companyBasics.svg"
            width={22}
            height={22}
            alt="logo"
          />
          <h2 className="text-[27px] font-[600] text-[#000000]">
            კამპანიის საფუძვლები
          </h2>
        </div>
        <p className="text-[#000000AD] text-[14px]">
          დააყენეთ თქვენი კამპანიის ფუნდამენტური დეტალები
        </p>
      </div>

      <form className="flex-col gap-[75px] mx-auto">
        <div className="flex gap-[75px] mt-[26px]">
          <div>
            <h3 className="text-[#000000] font-[700] text-[18px] mb-4">
              კამპანიის სახელი
            </h3>
            <div>
              <label className="block mb-1 text-sm font-medium"></label>
              <input
                type="text"
                placeholder="მაგ: საზაფხულო პროდუქტი"
                {...register("companyName")}
                className="w-[543px] border border-[#E3E8EF] rounded px-3 py-2 text-[#000000] font-[700] outline-none"
              />
              {errors.companyName && (
                <span className="text-xs text-red-500">
                  {errors.companyName.message}
                </span>
              )}
            </div>
          </div>

          <div>
            <div>
              <h3 className="font-[700] text-[18px] text-[#000000] mb-4 ">
                ბიუჯეტი (ლარში)
              </h3>
              <div>
                <label className="block mb-1 text-sm font-medium"></label>
                <input
                  type={isOn ? "password" : "text"}
                  placeholder="₾ 5000"
                  {...register("budget")}
                  className="w-[543px] border border-[#E3E8EF] rounded px-3 py-2 text-[#000000] font-[700] outline-none"
                />
                {errors.budget && (
                  <span className="text-xs text-red-500">
                    {errors.budget.message}
                  </span>
                )}
              </div>
            </div>

            <div
              className="w-full flex items-center gap-3 cursor-pointer mt-3 justify-end "
              onClick={toggleHandler}
            >
              <p className="text-[#000000] font-[700]">
                დამალე ბიუჯეტი შემქნელებისთვის
              </p>

              <ToggleSwitch value={isOn} onToggle={toggleHandler} />
            </div>
          </div>
        </div>

        <div className="mt-[37px]">
          <h3 className="font-[700] text-[18px] text-[#000000] mb-4">
            კამპანიის აღწერა
          </h3>
          <div>
            <label className="block mb-1 text-sm font-medium"></label>
            <textarea
              placeholder="აღწერეთ თქვენი კამპანიის მიზნები, სამიზნე აუდიტორია და რას ეძებთ შემქმნელებში..."
              {...register("companyDesc")}
              className="w-full border border-[#E3E8EF] rounded px-3 py-2 text-[#000000] min-h-[218px] font-[700] outline-none resize-none"
            />
            {errors.companyDesc && (
              <span className="text-xs text-red-500">
                {errors.companyDesc.message}
              </span>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default CompanyBasics;
