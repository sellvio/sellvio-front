'use client';

import Header from '@/feature/common/header/components/composites/Header';
import React, { useEffect, useRef } from 'react';
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
import { getStoredUserType } from '../../utils/storedUser';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const Campaing = () => {
  const {
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CreateCampaignFormInput, unknown, CreateCampaignFormOutput>({
    resolver: zodResolver(createCampaignSchema),
    defaultValues: {
      payment_type: 'cost_per_view',
      budget_hidden: false,
      chat_type: 'public',
      status: 'active',
      platforms: [],
      target_creator_types: [],
      tags: [],
      media: [],
      asset_files: [],
      campaign_image_url: null,
    },
  });

  const router = useRouter();
  const queryClient = useQueryClient();
  const submittingRef = useRef(false);

  // Only business accounts can create campaigns
  useEffect(() => {
    if (!localStorage.getItem('access_token')) {
      router.replace('/login');
      return;
    }
    if (getStoredUserType() === 'creator') {
      router.replace('/creatorDashboard');
    }
  }, [router]);

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: createCampaign,
    onSuccess: (_data, variables) => {
      toast.success(
        variables.status === 'draft'
          ? 'კამპანია შენახულია დრაფტად'
          : 'კამპანია შეიქმნა'
      );
      queryClient.invalidateQueries({ queryKey: ['myCampaigns'] });
      router.push('/buisnessDashboard');
    },
    onError: (error) => {
      submittingRef.current = false;
      toast.error(
        error instanceof Error && error.message
          ? error.message
          : 'კამპანიის შექმნა ვერ მოხერხდა'
      );
    },
  });

  const isBusy = isPending || isSuccess;

  const onSubmit = (data: CreateCampaignFormOutput) => {
    if (submittingRef.current) return;
    submittingRef.current = true;
    mutate(data);
  };

  const onInvalid = () => {
    toast.error('გთხოვთ შეავსოთ ყველა სავალდებულო ველი სწორად');
  };

  const submitWithStatus = (status: 'active' | 'draft') => {
    if (isBusy) return;
    setValue('status', status);
    handleSubmit(onSubmit, onInvalid)();
  };

  const selectedPlatforms = watch('platforms') ?? [];
  const selectedCreatorTypes = watch('target_creator_types') ?? [];
  const selectedPaymentType = watch('payment_type');

  return (
    <div className="flex flex-col flex-1 bg-[#f5faff] min-h-screen">
      <Header pageName="კამპანიის შექმნა" />

      <div className="flex-1 px-6 md:px-10 py-10">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submitWithStatus('active');
          }}
          noValidate
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
            <button
              type="button"
              disabled={isBusy}
              onClick={() => submitWithStatus('draft')}
              className="px-6 py-3 rounded-full font-bold text-[#434656] hover:text-[#0040e0] transition-all disabled:cursor-not-allowed disabled:opacity-70"
            >
              შეინახე დრაფტად
            </button>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={isBusy}
                className="bg-gradient-to-r from-[#0040e0] to-[#2e5bff] disabled:opacity-70 shadow-[0px_8px_20px_rgba(0,64,224,0.3)] px-10 py-3 rounded-full font-bold text-white hover:scale-105 active:scale-95 disabled:hover:scale-100 transition-all disabled:cursor-not-allowed"
              >
                {isBusy ? 'იგზავნება...' : 'შექმენი კამპანია'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Campaing;
