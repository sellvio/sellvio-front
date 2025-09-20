"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import DropDownInput from "../primitives/DropDownInput";
import { companySchema } from "../../schema/schema";
import { costOptions } from "../../data/data";

type CompanyFormValues = z.infer<typeof companySchema>;

const PaymentStructure = () => {
  const {
    register,
    formState: { errors },
  } = useForm<CompanyFormValues>({
    resolver: zodResolver(companySchema),
  });

  return (
    <div className="max-w-[1222px] w-full bg-transparent mx-auto rounded-[8px] px-[30px] py-[30px] flex flex-col border">
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <Image
            src="/images/svg/payment.svg"
            width={22}
            height={22}
            alt="logo"
          />
          <h2 className="text-[27px] font-[600] text-[#000000]">
            გადახდის სტრუქტურა
          </h2>
        </div>
        <p className="text-[#000000AD] text-[14px]">
          კონფენსაცია, თუ როგორ მიიღებენ კომპენსაციას შემმნელები
        </p>

        <form className="flex-col  mx-auto">
          <div>
            <h3 className="mt-[26px] text-[#000000] font-[700] text-[18px] ">
              შეთავაზების ტიპი
            </h3>
            <DropDownInput
              size="1162px"
              placeholder="Cost per View"
              options={costOptions}
            />
          </div>

          <div className="flex gap-4 mt-8">
            <div className="flex flex-col">
              <h3 className="text-[#000000] font-[700] text-[18px] mb-4">
                გადახდის მოდელი
              </h3>
              <input
                type="text"
                placeholder="რაოდენობა"
                {...register("auditory")}
                className="w-[875px] border border-[#E3E8EF] rounded px-3 py-2 text-[#000000] font-[700] outline-none"
              />
              {errors.auditory && (
                <span className="text-xs text-red-500 mt-1">
                  {errors.auditory.message}
                </span>
              )}
            </div>

            <div className="flex flex-col">
              <h3 className="text-[#000000] font-[700] text-[18px] mb-4 invisible">
                გადახდის მოდელი
              </h3>
              <input
                type="text"
                placeholder="თანხა"
                {...register("payMent")}
                className="w-[269px] border border-[#E3E8EF] rounded px-3 py-2 text-[#000000] font-[700] outline-none"
              />
              {errors.payMent && (
                <span className="text-xs text-red-500 mt-1">
                  {errors.payMent.message}
                </span>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentStructure;
