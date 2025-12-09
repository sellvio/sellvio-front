"use client";

import {
  FormProvider,
  Resolver,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { campaignSchema, CampaignSchema } from "../../schema/schema";
import CompanyBasics from "../primitives/CompanyBasics";
import Platforms from "../primitives/Platforms";
import GoalCreatores from "../primitives/GoalCreatores";
import ExtraMedia from "../primitives/ExtraMedia";
import CompanyDetails from "../primitives/CompanyDetails";
import { sendCampaign } from "../../api/sendCampaing";
import PaymentStructure from "../primitives/PaymentStructure";
import { useState } from "react";

const CampaingForm = () => {
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const methods = useForm<CampaignSchema>({
    resolver: zodResolver(campaignSchema) as Resolver<CampaignSchema>,
    defaultValues: {
      media: [],
    },
  });

  const mutation = useMutation({
    mutationFn: sendCampaign,
    onSuccess: (data) => {
      console.log("კამპანია წარმატებით შეიქმნა:", data);
      setShowSuccessModal(true);
    },
    onError: (err: any) => {
      console.error("შეცდომა:", err);
      alert("შეცდომა კამპანიის შექმნისას: " + (err?.message || err));
    },
  });

  const onSubmit: SubmitHandler<CampaignSchema> = (data) => {
    console.log("ვგზავნი კამპანიას:", data);
    mutation.mutate(data);
  };

  const handleCancelClick = () => {
    setShowCancelConfirm(true);
  };

  const confirmCancel = () => {
    methods.reset();
    setShowCancelConfirm(false);
  };

  console.log("hello world");

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="flex gap-16 flex-col relative"
      >
        <CompanyBasics />
        <Platforms />
        <PaymentStructure />
        <GoalCreatores />
        <ExtraMedia />
        <CompanyDetails />

        <div className="max-w-[1222px] w-full mx-auto flex justify-end gap-4 mb-8">
          <button
            type="button"
            className="bg-transparent border-[var(--cancel-button-bg)] text-[var(--black-color)] w-[202px] px-6 py-3 cursor-pointer rounded-[8px] border font-medium"
            onClick={handleCancelClick}
          >
            გაუქმება
          </button>
          <button
            type="submit"
            disabled={mutation.isPending}
            className="bg-[var(--button-bg)] rounded-[8px] text-[var(--white-color)] px-10 py-3 cursor-pointer font-medium disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {mutation.isPending ? "მიმდინარეობს..." : "შექმენი კამპანია"}
          </button>
        </div>

        {showCancelConfirm && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-[#FFFFFF66] rounded-[12px] p-8 max-w-md w-full mx-4 shadow-2xl">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                ნამდვილად გსურთ კამპანიის შექმნის გაუქმება?
              </h3>
              <div className="flex gap-4 justify-center mt-6">
                <button
                  type="button"
                  onClick={() => setShowCancelConfirm(false)}
                  className="bg-[#FFFFFF1A] border-[#FFFFFF] rounded-[8px] px-3 py-2 text-[var(--black-color)] font-[700] outline-none shadow-[4px_5px_6px_0px_#FFFFFF66_inset] backdrop-blur-[7.5px] w-[200px] cursor-pointer"
                >
                  არა
                </button>
                <button
                  type="button"
                  onClick={confirmCancel}
                  className=" bg-[#FFFFFF1A] border-[#FFFFFF] rounded-[8px] px-3 py-2 text-[var(--black-color)] font-[700] outline-none shadow-[4px_5px_6px_0px_#FFFFFF66_inset] backdrop-blur-[7.5px] w-[200px] cursor-pointer"
                >
                  დიახ
                </button>
              </div>
            </div>
          </div>
        )}

        {showSuccessModal && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-white rounded-[16px] p-10 max-w-md w-full mx-4 shadow-2xl text-center animate-in fade-in zoom-in duration-300">
              <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-5xl text-green-600">✓</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                შენი კამპანია წარმატებით შეიქმნა!
              </h3>
              <p className="text-gray-600 mb-8">
                მალე მიიღებ პასუხს კრეატორებისგან
              </p>
              <button
                type="button"
                onClick={() => {
                  setShowSuccessModal(false);
                  methods.reset();
                }}
                className="px-10 py-3 bg-[var(--button-bg)] text-white rounded-[8px] font-medium hover:opacity-90 transition"
              >
                კარგი
              </button>
            </div>
          </div>
        )}
      </form>
    </FormProvider>
  );
};

export default CampaingForm;
