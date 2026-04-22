'use client';

import Header from '@/feature/common/header/components/composites/Header';
import React from 'react';
import CompanyBasics from '../primitives/CompanyBasics';
import Platforms from '../primitives/Platforms';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  CreateCampaignFormInput,
  CreateCampaignFormOutput,
  createCampaignSchema,
} from '../schema/createCampaignSchema';
import GoalCreatores from '../primitives/GoalCreatores';
import PaymentStructure from '../primitives/PaymentStructure';
import ExtraMedia from '../primitives/ExtraMedia';
import CompanyDetails from '../primitives/CompanyDetails';
import { createCampaign } from '../../api/createCampaingApi';
import { useMutation } from '@tanstack/react-query';

const Campaing = () => {
  const {
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CreateCampaignFormInput, unknown, CreateCampaignFormOutput>({
    resolver: zodResolver(createCampaignSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createCampaign,
    onSuccess: (response) => {
      console.log('campaign created:', response);
    },
    onError: (error) => {
      console.error('create campaign error:', error);
    },
  });

  const onSubmit = (data: CreateCampaignFormOutput) => {
    mutate(data);
  };

  const selectedPlatforms = watch('platforms') ?? [];
  const selectedCreatorTypes = watch('target_creator_types') ?? [];
  const selectedPaymentType = watch('payment_type');

  return (
    <div className="flex flex-col flex-1 bg-[#f5faff] min-h-screen">
      <Header pageName="კამპანიის შექმნა" />

      <div className="flex-1 px-6 md:px-10 py-10">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-12 mx-auto w-full max-w-[1440px]"
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

          <ExtraMedia watch={watch} setValue={setValue} errors={errors} />

          <CompanyDetails
            register={register}
            errors={errors}
            watch={watch}
            setValue={setValue}
          />

          <div className="flex justify-between items-center pt-8 border-[#c4c5d9]/30 border-t">
            <div></div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={isPending}
                className="bg-gradient-to-r from-[#0040e0] to-[#2e5bff] disabled:opacity-70 shadow-[0px_8px_20px_rgba(0,64,224,0.3)] px-10 py-3 rounded-full font-bold text-white hover:scale-105 active:scale-95 disabled:hover:scale-100 transition-all disabled:cursor-not-allowed"
              >
                {isPending ? 'იგზავნება...' : 'შექმენი კამპანია'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Campaing;
