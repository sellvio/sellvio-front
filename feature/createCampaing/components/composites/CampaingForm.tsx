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
import PaymentStructure from "../primitives/PaymentStructure";
import GoalCreatores from "../primitives/GoalCreatores";
import ExtraMedia from "../primitives/ExtraMedia";
import CompanyDetails from "../primitives/CompanyDetails";
import { sendCampaign } from "../../api/sendCampaing";

const CampaingForm = () => {
  const methods = useForm<CampaignSchema>({
    resolver: zodResolver(campaignSchema) as Resolver<CampaignSchema>,
    defaultValues: {
      media: [],
    },
  });

  const mutation = useMutation({
    mutationFn: sendCampaign,
    onSuccess: (data) => {
      console.log("SUCCESS:", data);
      alert("Campaign created successfully!");
    },
    onError: (err) => {
      console.error("ERROR:", err);
      alert("Error sending campaign!");
    },
  });

  const onSubmit: SubmitHandler<CampaignSchema> = (data) => {
    console.log("Submitting:", data);
    mutation.mutate(data);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="flex gap-16 flex-col"
      >
        <CompanyBasics />
        <Platforms />
        <PaymentStructure />
        <GoalCreatores />
        <ExtraMedia />
        <CompanyDetails />

        <div className=" max-w-[1222px] w-full mx-auto flex justify-end gap-4 mb-4 ">
          <button
            type="button"
            className="bg-transparent border-[var(--cancel-button-bg)] text-[var(--black-color)] w-[202px] px-4 py-2 cursor-pointer rounded-[8px] border"
          >
            გაუქმება
          </button>
          <button
            type="submit"
            className="bg-[var(--button-bg)] rounded-[8px] text-[var(--white-color)] px-4 py-2 cursor-pointer"
          >
            {mutation.isPending ? "Saving..." : "შექმენი კამპანია"}
          </button>
        </div>
      </form>
    </FormProvider>
  );
};

export default CampaingForm;
