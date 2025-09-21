"use client";

import Image from "next/image";
import DropDownInput from "../primitives/DropDownInput";

import Tags from "./Tags";

import { dayOptions } from "../../data/data";
import Button from "../../../myProfile/components/primirtives/button";

const CompanyDetails = () => {
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
          <h2 className="text-[27px] font-[600] text-[var(--black-color)]">
            კამპანიის დეტალები
          </h2>
        </div>
        <p className="text-[var(--campaing-form-paragraphs)] text-[14px]">
          კამპანიის მოთხოვნები და დამატებითი კონფიგურაცია
        </p>
      </div>

      <form>
        <div className="flex items-center justify-between flex-wrap md:w-full">
          <div className="flex flex-col">
            <h3 className="mt-[26px] text-[var(--black-color)] font-[700] text-[18px] ">
              კამპანიის ხანგრძლივობა (დღეები)
            </h3>
            <DropDownInput
              size="543px"
              placeholder="მაგ:1 დღე"
              options={dayOptions}
            />
          </div>

          <div className="flex flex-col">
            <h3 className="text-[var(--black-color)] font-[700] text-[18px] mb-4">
              სამიზნე აუდიტორია
            </h3>
            <input
              type="text"
              placeholder="მაგ: ტექნოლოგიების მოყვარული, 18-35 წლის"
              className="w-[543px] border border-[va(--auth-input-border)] rounded px-3 py-2 text-[var(--black-color)] font-[700] outline-none"
            />
          </div>
        </div>

        <div className="mt-[37px]">
          <h3 className="font-[700] text-[18px] text-[var(--black-color)] mb-4">
            კამპანიის მოთხოვნები
          </h3>
          <textarea
            placeholder="მიუთითეთ მოთხოვნები..."
            className="w-full border border-[var(--auth-input-border)] rounded px-3 py-2 text-[var(--black-color)] min-h-[218px] font-[700] outline-none resize-none"
          />

          <h3 className="text-[var(--black-color)] font-[700] text-[18px] mb-4 mt-6">
            დამატებითი მოთხოვნები
          </h3>
          <textarea
            placeholder="არასავალდებულო..."
            className="w-full border border-[var(--auth-input-border)] rounded px-3 py-2 text-[var(--black-color)] min-h-[218px] font-[700] outline-none resize-none"
          />

          <Tags label="კამპანიის თეგები" placeholder="თეგების დამატება" />
        </div>

        <div className="flex justify-end gap-4 mt-10">
          <Button
            text="გაუქმება"
            color="bg-transparent border border-[#00000024] text-[#000000]"
            size=" w-[202px] px-4 py-2 cursor-pointer"
            type="button"
          />
          <Button
            text="შექმენი კამპანია"
            color="bg-blue-500 text-white"
            size="px-4 py-2 cursor-pointer"
            type="submit"
          />
        </div>
      </form>
    </div>
  );
};

export default CompanyDetails;
