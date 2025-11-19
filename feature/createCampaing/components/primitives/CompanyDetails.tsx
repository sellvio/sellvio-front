"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Tags from "./Tags";
import { Calendar22 } from "../../../components/ui/date-picker";
import { useFormContext } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { CampaignSchema } from "../../schema/schema";

const CompanyDetails = () => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<CampaignSchema>();
  const durationDays = watch("duration_days");
  const tagsValue = watch("tags") || [];
  const chatType = watch("chat_type") || "";
  const [isChatDropdownOpen, setChatDropdownOpen] = useState(false);
  const chatDropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        chatDropdownRef.current &&
        !chatDropdownRef.current.contains(event.target as Node)
      ) {
        setChatDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChatTypeSelect = (value: string) => {
    setValue("chat_type", value as CampaignSchema["chat_type"], {
      shouldValidate: true,
    });
    setChatDropdownOpen(false);
  };

  return (
    <div className="max-w-[1222px] w-full bg-[var(--company-basics-bg)] mx-auto rounded-[8px] px-[30px] py-[30px] flex flex-col border border-[var(--createCampaing-border)]">
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

      <div>
        <div className="flex items-center justify-between flex-wrap md:w-full mt-[20px]">
          <div className="flex flex-col gap-4 w-full md:w-[543px] rounded-[8px]">
            <h3 className="text-[var(--black-color)] font-[700] text-[18px]">
              კამპანიის ხანგრძლივობა (დღეები)
            </h3>
            <Calendar22
              value={durationDays}
              onChange={(days: number) => setValue("duration_days", days)}
            />
            <p className="text-red-500 text-sm min-h-[20px] leading-4">
              {errors.duration_days?.message ?? "\u00A0"}
            </p>
          </div>

          <div className="flex flex-col gap-4 w-full md:w-[543px]">
            <h3 className="text-[var(--black-color)] font-[700] text-[18px]">
              სამიზნე აუდიტორია
            </h3>
            <input
              type="text"
              placeholder="მაგ: ტექნოლოგიების მოყვარული, 18-35 წლის"
              {...register("target_audience")}
              className="w-full border rounded-[8px] px-3 py-2 text-[var(--black-color)] font-[700] outline-none bg-[#FFFFFF1A] border-[#FFFFFF] shadow-[4px_5px_6px_0px_#FFFFFF66_inset] backdrop-blur-[7.5px]"
            />
            <p className="text-red-500 text-sm min-h-[20px] leading-4">
              {errors.target_audience?.message ?? "\u00A0"}
            </p>
          </div>

          <div className="w-full relative mt-[30px]" ref={chatDropdownRef}>
            <button
              type="button"
              onClick={() => setChatDropdownOpen((prev) => !prev)}
              className="w-full border rounded-[8px] px-3 py-2 pr-14 text-left text-[var(--black-color)] font-[700] outline-none bg-[#FFFFFF1A] border-[#FFFFFF] shadow-[4px_5px_6px_0px_#FFFFFF66_inset] backdrop-blur-[7.5px] flex items-center justify-between"
            >
              <span
                className={`${
                  chatType
                    ? "text-[var(--black-color)]"
                    : "text-[var(--campaing-form-paragraphs)]"
                } font-[700]`}
              >
                {chatType === "public"
                  ? "საჯარო"
                  : chatType === "private"
                  ? "პირადი"
                  : "ჩატში გაწევრიანების ტიპი"}
              </span>
              <motion.div
                animate={{ rotate: isChatDropdownOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="pointer-events-none flex items-center absolute right-4"
              >
                <Image
                  src="images/svg/dropdown.svg"
                  width={12}
                  height={6}
                  alt="dropDown"
                />
              </motion.div>
            </button>
            <input type="hidden" {...register("chat_type")} />
            <AnimatePresence>
              {isChatDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="mt-2 border rounded-[8px] border-[#FFFFFF] bg-[#FFFFFF1A] shadow-[4px_5px_6px_0px_#FFFFFF33] backdrop-blur-[7.5px]">
                    {[
                      { value: "public", label: "საჯარო" },
                      { value: "private", label: "პირადი" },
                    ].map((option) => (
                      <motion.button
                        key={option.value}
                        type="button"
                        onClick={() => handleChatTypeSelect(option.value)}
                        className="w-full text-left px-3 py-2 font-[700] text-[var(--black-color)] hover:bg-[#FFFFFF33]"
                        whileTap={{ scale: 0.98 }}
                      >
                        {option.label}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <p className="text-red-500 text-sm min-h-[20px] leading-4 mt-4">
              {errors.chat_type?.message ?? "\u00A0"}
            </p>
          </div>
        </div>

        <div className="mt-[37px]">
          <h3 className="font-[700] text-[18px] text-[var(--black-color)] mb-4">
            კამპანიის მოთხოვნები
          </h3>
          <textarea
            placeholder="მიუთითეთ მოთხოვნები..."
            {...register("requirements")}
            className="w-full border rounded-[8px] px-3 py-2 text-[var(--black-color)] min-h-[218px] font-[700] outline-none resize-none bg-[#FFFFFF1A] border-[#FFFFFF] shadow-[4px_5px_6px_0px_#FFFFFF66_inset] backdrop-blur-[7.5px]"
          />
          <p className="text-red-500 text-sm min-h-[20px] leading-4">
            {errors.requirements?.message ?? "\u00A0"}
          </p>

          <h3 className="text-[var(--black-color)] font-[700] text-[18px] mb-4 mt-6">
            დამატებითი მოთხოვნები
          </h3>
          <textarea
            placeholder="არასავალდებულო..."
            {...register("additional_requirements")}
            className="w-full border rounded-[8px] px-3 py-2 text-[var(--black-color)] min-h-[218px] font-[700] outline-none resize-none bg-[#FFFFFF1A] border-[#FFFFFF] shadow-[4px_5px_6px_0px_#FFFFFF66_inset] backdrop-blur-[7.5px]"
          />
          <p className="text-red-500 text-sm min-h-[20px] leading-4">
            {errors.additional_requirements?.message ?? "\u00A0"}
          </p>

          <Tags
            label="კამპანიის თეგები"
            placeholder="თეგების დამატება"
            onChange={(tags: string[]) => setValue("tags", tags)}
            value={tagsValue}
          />
          <p className="text-red-500 text-sm min-h-[20px] leading-4">
            {errors.tags?.message ?? "\u00A0"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetails;
