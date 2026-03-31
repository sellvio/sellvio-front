'use client';

import Header from '@/feature/common/header/components/composites/Header';
import React from 'react';
import CompanyBasics from '../primitives/CompanyBasics';
import Platforms from '../primitives/Platforms';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  CreateCampaignFormOutput,
  createCampaignSchema,
} from '../schema/createCampaignSchema';
import GoalCreatores from '../primitives/GoalCreatores';
import PaymentStructure from '../primitives/PaymentStructure';
import ExtraMedia from '../primitives/ExtraMedia';

const Campaing = () => {
  const {
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createCampaignSchema),
  });

  const selectedPlatforms = watch('platforms') || [];
  const selectedCreatorTypes = watch('target_creator_types') || [];
  const selectedPaymentType = watch('payment_type');
  const onSubmit = (data: CreateCampaignFormOutput) => {
    console.log(data);
  };

  return (
    <div className="flex flex-col flex-1 gap-[44px] px-[43px]">
      <Header pageName={'კამპანიის შექმნა'} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-[64px] mx-auto w-full max-w-[1440px] h-full min-h-screen"
      >
        <CompanyBasics
          register={register}
          errors={errors}
          watch={watch}
          setValue={setValue}
        />
        <Platforms
          selected={selectedPlatforms}
          setValue={setValue}
          errors={errors}
        />

        <PaymentStructure
          register={register}
          setValue={setValue}
          errors={errors}
          selectedPaymentType={selectedPaymentType}
        />

        <GoalCreatores
          selected={selectedCreatorTypes}
          setValue={setValue}
          errors={errors}
        />
        <ExtraMedia />

        <div className="flex justify-end w-full">
          <button
            type="submit"
            className="relative bg-[#0866FF]/[0.88] shadow-[inset_4px_5px_6px_0px_rgba(255,255,255,0.4),inset_-1px_-3px_4px_0px_rgba(255,255,255,0.4)] px-[47px] py-[16px] border-[#FFFFFF] border-[0.5px] rounded-[8px] overflow-hidden font-bold text-[#FFFFFF] text-[14px] cursor-pointer"
          >
            <div className="absolute inset-0 bg-[length:6px_6px] bg-[radial-gradient(rgba(255,255,255,0.55)_0.3px,transparent_0.3px)] opacity-25 pointer-events-none mix-blend-soft-light" />
            შექმენი კამპანია
          </button>
        </div>
      </form>
    </div>
  );
};

export default Campaing;
