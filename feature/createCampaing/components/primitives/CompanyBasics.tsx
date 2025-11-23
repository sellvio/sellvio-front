"use client";
import { Switch } from "@/components/ui/switch";
import Image from "next/image";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { CampaignSchema } from "../../schema/schema";

const CompanyBasics = () => {
  const [isOn, setIsOn] = useState(true);

  const methods = useFormContext<CampaignSchema>();

  if (!methods) {
    console.warn("CompanyBasics must be used within a FormProvider");
    return null;
  }

  const {
    register,
    formState: { errors },
    watch,
  } = methods;

  console.log(watch("name"));

  const toggleHandler = () => {
    setIsOn((prev) => !prev);
  };

  return (
    <div className="max-w-[1222px] w-full bg-[var(--company-basics-bg)] mx-auto rounded-[8px] px-[30px] py-[30px] flex flex-col border justify-center  border-[var(--createCampaing-border)]">
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

      <div className="flex flex-col gap-[37px] mt-[26px] w-full">
        <div className="flex flex-col lg:flex-row gap-[75px] w-full">
          <div className="flex-1">
            <h3 className="text-[var(--black-color)] font-[700] text-[18px] mb-4">
              კამპანიის სახელი
            </h3>
            <input
              {...register("name")}
              type="text"
              placeholder="მაგ: საზაფხულო პროდუქტი"
              className="w-full border bg-[#FFFFFF1A] border-[#FFFFFF] rounded-[8px] px-3 py-2 text-[var(--black-color)] font-[700] outline-none shadow-[4px_5px_6px_0px_#FFFFFF66_inset] backdrop-blur-[7.5px]"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-4">{errors.name.message}</p>
            )}
          </div>

          <div className="flex-1">
            <h3 className="font-[700] text-[18px] text-[var(--black-color)] mb-4">
              ბიუჯეტი (ლარში)
            </h3>
            <input
              {...register("budget", { valueAsNumber: true })}
              type={isOn ? "number" : "password"}
              placeholder="₾ 5000"
              className="w-full border bg-[#FFFFFF1A] border-[#FFFFFF] border-[var(--auth-input-border) rounded-[8px] px-3 py-2 text-[var(--black-color)] font-[700] outline-none shadow-[4px_5px_6px_0px_#FFFFFF66_inset] backdrop-blur-[7.5px] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              style={{ MozAppearance: "textfield" }}
            />
            {errors.budget && (
              <p className="text-red-500 text-sm mt-4">
                {errors.budget.message}
              </p>
            )}

            <div
              className="w-full flex items-center gap-3 cursor-pointer mt-3 justify-end"
              onClick={toggleHandler}
            >
              <p className="text-[var(--black-color)] font-[700]">
                დამალე ბიუჯეტი შემქნელებისთვის
              </p>
              <Switch {...register("budget_hidden")} />
            </div>
          </div>
        </div>

        <div className="w-full">
          <h3 className="font-[700] text-[18px] text-[var(--black-color)] mb-4">
            კამპანიის აღწერა
          </h3>
          <textarea
            {...register("description")}
            placeholder="აღწერეთ თქვენი კამპანიის მიზნები, სამიზნე აუდიტორია და რას ეძებთ შემქმნელებში..."
            className="w-full border  rounded-[8px] px-3 py-2 text-[var(--black-color)] min-h-[218px] font-[700] outline-none resize-none  bg-[#FFFFFF1A] border-[#FFFFFF] shadow-[4px_5px_6px_0px_#FFFFFF66_inset] backdrop-blur-[7.5px]"
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-4">
              {errors.description.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyBasics;
