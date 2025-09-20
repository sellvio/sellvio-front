"use client";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import DropDownInput from "../primitives/DropDownInput";

import Tags from "./Tags";

import { dayOptions } from "../../data/data";
import Button from "../../../myProfile/components/primirtives/button";
import { companySchema } from "../../schema/schema";

const CompanyDetails = () => {
  const {
    register,

    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(companySchema),
  });

  return (
    <div className="max-w-[1222px] w-full bg-transparent mx-auto rounded-[8px] px-[30px] py-[30px] flex flex-col border">
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <Image
            src="/images/svg/companyDetails.svg"
            width={22}
            height={22}
            alt="logo"
          />
          <h2 className="text-[27px] font-[600] text-[#000000]">
            კამპანიის დეტალები
          </h2>
        </div>
        <p className="text-[#000000AD] text-[14px]">
          კამპანიის მოთხოვნები და დამატებითი კონფიგურაცია
        </p>
      </div>

      <form>
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <h3 className="mt-[26px] text-[#000000] font-[700] text-[18px] ">
              კამპანიის ხანგრძლივობა (დღეები)
            </h3>
            <DropDownInput
              size="543px"
              placeholder="მაგ:1 დღე"
              options={dayOptions}
            />
          </div>

          <div className="flex flex-col">
            <h3 className="text-[#000000] font-[700] text-[18px] mb-4">
              სამიზნე აუდიტორია
            </h3>
            <input
              type="text"
              placeholder="მაგ: ტექნოლოგიების მოყვარული, 18-35 წლის"
              {...register("auditory")}
              className="w-[543px] border border-[#E3E8EF] rounded px-3 py-2 text-[#000000] font-[700] outline-none"
            />
            {errors.auditory && (
              <span className="text-xs text-red-500 mt-4">
                {errors.auditory.message}
              </span>
            )}
          </div>
        </div>

        <div className="mt-[37px]">
          <h3 className="font-[700] text-[18px] text-[#000000] mb-4">
            კამპანიის მოთხოვნები
          </h3>
          <textarea
            placeholder="მიუთითეთ მოთხოვნები..."
            {...register("requirements")}
            className="w-full border border-[#E3E8EF] rounded px-3 py-2 text-[#000000] min-h-[218px] font-[700] outline-none resize-none"
          />
          {errors.requirements && (
            <span className="text-xs text-red-500">
              {errors.requirements.message}
            </span>
          )}

          <h3 className="text-[#000000] font-[700] text-[18px] mb-4 mt-6">
            დამატებითი მოთხოვნები
          </h3>
          <textarea
            placeholder="არასავალდებულო..."
            {...register("extraRequirements")}
            className="w-full border border-[#E3E8EF] rounded px-3 py-2 text-[#000000] min-h-[218px] font-[700] outline-none resize-none"
          />

          <h3 className="text-[#000000] font-[700] text-[18px] mb-4 mt-6">
            კამპანიის თეგები
          </h3>
          <Tags label="კამპანიის თეგები" placeholder="თეგების დამატება" />
        </div>

        <div className="flex justify-end gap-4 mt-10">
          <Button
            text="გაუქმება"
            color="bg-transparent border border-[#00000024] text-[#000000]"
            size=" w-[202px] px-4 py-2"
            type="button"
            onClick={() => reset()}
          />
          <Button
            text="შექმენი კამპანია"
            color="bg-blue-500 text-white"
            size="px-4 py-2"
            type="submit"
          />
        </div>
      </form>
    </div>
  );
};

export default CompanyDetails;
