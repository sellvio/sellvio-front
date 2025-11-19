"use client";
import Image from "next/image";
import DropDownInput from "./DropDownInput";
import { costOptions } from "../../data/data";
import { useFormContext } from "react-hook-form";
import { CampaignSchema } from "../../schema/schema";

const DEFAULT_DESCRIPTION =
  "კონფენსაცია, თუ როგორ მიიღებენ კომპენსაციას შემმნელები";
const DEFAULT_PLACEHOLDER = "რაოდენობა";

const PaymentStructure = () => {
  const methods = useFormContext<CampaignSchema>();

  if (!methods) {
    console.warn("PaymentStructure must be used within a FormProvider");
    return null;
  }

  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = methods;

  const paymentType = watch("payment_type");
  const selectedCostOption = costOptions.find(
    (option) => option.value === paymentType
  );
  const description = selectedCostOption?.description || DEFAULT_DESCRIPTION;
  const quantityPlaceholder = selectedCostOption?.label || DEFAULT_PLACEHOLDER;

  const handleCostTypeChange = (value: string) => {
    setValue("payment_type", value as CampaignSchema["payment_type"], {
      shouldValidate: true,
    });
  };

  return (
    <div className="flex flex-col bg-[var(--company-basics-bg)] mx-auto px-[30px] py-[30px] border rounded-[8px] w-full max-w-[1222px]  border-[var(--createCampaing-border)]">
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <Image
            src="/images/svg/payment.svg"
            width={22}
            height={22}
            alt="logo"
          />
          <h2 className="font-[600] text-[var(--black-color)] text-[27px]">
            გადახდის სტრუქტურა
          </h2>
        </div>
        <p className="text-[var(--campaing-form-paragraphs)] text-[14px]">
          {description}
        </p>

        <div className="flex-col">
          <div className="flex flex-col gap-4">
            <h3 className="mt-[26px] font-[700] text-[var(--black-color)] text-[18px]">
              შეთავაზების ტიპი
            </h3>
            <DropDownInput
              placeholder="აირჩიეთ ტიპი"
              options={costOptions}
              onValueChange={handleCostTypeChange}
              value={paymentType}
            />
            <input {...register("payment_type")} type="hidden" />
          </div>

          <div className="flex gap-4 mt-8 flex-wrap">
            <div className="flex flex-col flex-5 min-w-[250px] max-w-[900px]">
              <h3 className="mb-4 font-[700] text-[var(--black-color)] text-[18px]">
                გადახდის მოდელი
              </h3>
              <input
                {...register("payment_per_quantity", { valueAsNumber: true })}
                type="number"
                placeholder={quantityPlaceholder}
                className="px-3 py-2 border  rounded-[8px] outline-none w-full font-[700] text-[var(--black-color)] bg-[#FFFFFF1A] border-[#FFFFFF] shadow-[4px_5px_6px_0px_#FFFFFF66_inset] backdrop-blur-[7.5px] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                style={{ MozAppearance: "textfield" }}
              />
              {errors.payment_per_quantity && (
                <p className="text-red-500 text-sm mt-4">
                  {errors.payment_per_quantity.message}
                </p>
              )}
            </div>

            <div className="flex flex-col flex-1 min-w-[250px] max-w-[900px]">
              <h3 className="invisible mb-4 font-[700] text-[var(--black-color)] text-[18px]">
                გადახდის მოდელი
              </h3>
              <input
                {...register("payment_amount", { valueAsNumber: true })}
                type="number"
                placeholder="თანხა"
                className="px-3 py-2 border  rounded-[8px] outline-none w-full font-[700] text-[var(--black-color)] bg-[#FFFFFF1A] border-[#FFFFFF] shadow-[4px_5px_6px_0px_#FFFFFF66_inset] backdrop-blur-[7.5px] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                style={{ MozAppearance: "textfield" }}
              />
              {errors.payment_amount && (
                <p className="text-red-500 text-sm mt-4">
                  {errors.payment_amount.message}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentStructure;
