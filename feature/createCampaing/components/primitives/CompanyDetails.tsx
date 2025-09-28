"use client";
import Image from "next/image";
import Tags from "./Tags";
import { Calendar22 } from "../../../components/ui/date-picker";

const CompanyDetails = () => {
  return (
    <div className="max-w-[1222px] w-full bg-transparent mx-auto rounded-[8px] px-[30px] py-[30px] flex flex-col border  border-[var(--createCampaing-border)]">
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
        <div className="flex items-center justify-between flex-wrap md:w-full mt-[20px]">
          <div className="flex flex-col gap-4 w-full md:w-[543px]">
            <h3 className="text-[var(--black-color)] font-[700] text-[18px]">
              კამპანიის ხანგრძლივობა (დღეები)
            </h3>
            <Calendar22 />
          </div>

          <div className="flex flex-col gap-4 w-full md:w-[543px]">
            <h3 className="text-[var(--black-color)] font-[700] text-[18px]">
              სამიზნე აუდიტორია
            </h3>
            <input
              type="text"
              placeholder="მაგ: ტექნოლოგიების მოყვარული, 18-35 წლის"
              className="w-full border border-[var(--auth-input-border)] rounded-[8px] px-3 py-2 text-[var(--black-color)] font-[700] outline-none"
            />
          </div>
          <div className="w-full relative mt-[30px]">
            <input
              type="text"
              placeholder="ჩატში გაწევრიანების ტიპი"
              className="w-full border border-[var(--auth-input-border)] rounded-[8px] px-3 py-2 pr-14 text-[var(--black-color)] font-[700] outline-none"
            />
            f
          </div>
        </div>

        <div className="mt-[37px]">
          <h3 className="font-[700] text-[18px] text-[var(--black-color)] mb-4">
            კამპანიის მოთხოვნები
          </h3>
          <textarea
            placeholder="მიუთითეთ მოთხოვნები..."
            className="w-full border border-[var(--auth-input-border)] rounded-[8px] px-3 py-2 text-[var(--black-color)] min-h-[218px] font-[700] outline-none resize-none"
          />

          <h3 className="text-[var(--black-color)] font-[700] text-[18px] mb-4 mt-6">
            დამატებითი მოთხოვნები
          </h3>
          <textarea
            placeholder="არასავალდებულო..."
            className="w-full border border-[var(--auth-input-border)] rounded-[8px] px-3 py-2 text-[var(--black-color)] min-h-[218px] font-[700] outline-none resize-none"
          />

          <Tags label="კამპანიის თეგები" placeholder="თეგების დამატება" />
        </div>

        <div className="flex justify-end gap-4 mt-10">
          <button className="bg-transparent  border-[var(--cancel-button-bg)] text-[var(--black-color)] w-[202px] px-4 py-2 cursor-pointer rounded-[8px] border">
            გაუქმება
          </button>
          <button
            type="submit"
            className=" bg-[var(--button-bg)] rounded-[8px] text-[var(--white-color)] px-4 py-2 cursor-pointer "
          >
            შექმენი კამპანია
          </button>
        </div>
      </form>
    </div>
  );
};

export default CompanyDetails;
