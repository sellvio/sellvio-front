'use client';
import {
  FormProvider,
  Resolver,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { campaignSchema, CampaignSchema } from '../../schema/schema';
import CompanyBasics from '../primitives/CompanyBasics';
import Platforms from '../primitives/Platforms';
import GoalCreatores from '../primitives/GoalCreatores';
import ExtraMedia from '../primitives/ExtraMedia';
import CompanyDetails from '../primitives/CompanyDetails';
import { sendCampaign } from '../../api/sendCampaing';
import PaymentStructure from '../primitives/PaymentStructure';
import { useState } from 'react';

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
      console.log('კამპანია წარმატებით შეიქმნა:', data);
      setShowSuccessModal(true);
    },
    onError: (err: any) => {
      console.error('შეცდომა:', err);
      alert('შეცდომა კამპანიის შექმნისას: ' + (err?.message || err));
    },
  });

  const onSubmit: SubmitHandler<CampaignSchema> = (data) => {
    console.log('ვგზავნი კამპანიას:', data);
    mutation.mutate(data);
  };

  const handleCancelClick = () => {
    setShowCancelConfirm(true);
  };

  const confirmCancel = () => {
    methods.reset();
    setShowCancelConfirm(false);
  };

  console.log('hello world');

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="relative flex flex-col gap-16"
      >
        <CompanyBasics />
        <Platforms />
        <PaymentStructure />
        <GoalCreatores />
        <ExtraMedia />
        <CompanyDetails />

        <div className="flex justify-end gap-4 mx-auto mb-8 w-full max-w-[1222px]">
          <button
            type="button"
            className="bg-transparent px-6 py-3 border border-[var(--cancel-button-bg)] rounded-[8px] w-[202px] font-medium text-[var(--black-color)] cursor-pointer"
            onClick={handleCancelClick}
          >
            გაუქმება
          </button>
          <button
            type="submit"
            disabled={mutation.isPending}
            className="bg-[var(--button-bg)] disabled:opacity-70 px-10 py-3 rounded-[8px] font-medium text-[var(--white-color)] cursor-pointer disabled:cursor-not-allowed"
          >
            {mutation.isPending ? 'მიმდინარეობს...' : 'შექმენი კამპანია'}
          </button>
        </div>

        {showCancelConfirm && (
          <div className="z-50 fixed inset-0 flex justify-center items-center bg-black/60">
            <div className="bg-[#FFFFFF66] shadow-2xl mx-4 p-8 rounded-[12px] w-full max-w-md">
              <h3 className="mb-4 font-semibold text-gray-900 text-xl">
                ნამდვილად გსურთ კამპანიის შექმნის გაუქმება?
              </h3>
              <div className="flex justify-center gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setShowCancelConfirm(false)}
                  className="bg-[#FFFFFF1A] shadow-[4px_5px_6px_0px_#FFFFFF66_inset] backdrop-blur-[7.5px] px-3 py-2 border-[#FFFFFF] rounded-[8px] outline-none w-[200px] font-[700] text-[var(--black-color)] cursor-pointer"
                >
                  არა
                </button>
                <button
                  type="button"
                  onClick={confirmCancel}
                  className="bg-[#FFFFFF1A] shadow-[4px_5px_6px_0px_#FFFFFF66_inset] backdrop-blur-[7.5px] px-3 py-2 border-[#FFFFFF] rounded-[8px] outline-none w-[200px] font-[700] text-[var(--black-color)] cursor-pointer"
                >
                  დიახ
                </button>
              </div>
            </div>
          </div>
        )}

        {showSuccessModal && (
          <div className="z-50 fixed inset-0 flex justify-center items-center bg-black/60">
            <div className="bg-white shadow-2xl mx-4 p-10 rounded-[16px] w-full max-w-md text-center animate-in duration-300 fade-in zoom-in">
              <div className="flex justify-center items-center bg-green-100 mx-auto mb-6 rounded-full w-20 h-20">
                <span className="text-green-600 text-5xl">✓</span>
              </div>
              <h3 className="mb-2 font-bold text-gray-900 text-2xl">
                შენი კამპანია წარმატებით შეიქმნა!
              </h3>
              <p className="mb-8 text-gray-600">
                მალე მიიღებ პასუხს კრეატორებისგან
              </p>
              <button
                type="button"
                onClick={() => {
                  setShowSuccessModal(false);
                  methods.reset();
                }}
                className="bg-[var(--button-bg)] hover:opacity-90 px-10 py-3 rounded-[8px] font-medium text-white transition"
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
