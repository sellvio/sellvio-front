'use client';

import Image from 'next/image';
import ToggleSwitch from './ToggleSwitch';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import {
  createChatSchea,
  createChatValue,
} from '../../schema/createChanelSchema';
import { addChanel } from '../../api/chatApi';
import { CreateChanelPopupProps } from '../../types';
import { useChatStore } from '@/feature/common/stores/useChatStore';

const CreateChanelPopup = ({ setIsOpen }: CreateChanelPopupProps) => {
  const queryClient = useQueryClient();
  const serverId = useChatStore((state) => state.serverId);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<createChatValue>({
    resolver: zodResolver(createChatSchea),
    defaultValues: {
      channel_state: 'public',
    },
  });

  const channelState = watch('channel_state');

  const { mutate, isPending } = useMutation({
    // გადავცემთ serverId-ს და მონაცემებს
    mutationFn: (data: createChatValue) => {
      if (!serverId) throw new Error('Server ID is missing');
      return addChanel(serverId, data);
    },
    onSuccess: () => {
      toast.success('Channel created successfully');
      queryClient.invalidateQueries({ queryKey: ['channelName'] });
      setIsOpen(false);
    },
    onError: () => {
      toast.error('Channel creation failed');
    },
  });

  const submitForm = (data: createChatValue) => {
    mutate(data);
  };

  return (
    <div className="z-50 fixed inset-0 flex justify-center items-center bg-black/50 backdrop-blur-sm">
      <form
        onSubmit={handleSubmit(submitForm)}
        className="relative flex flex-col justify-center items-center bg-[#1e293b] shadow-2xl py-[20px] border border-[#FFFFFF36] rounded-[12px] w-full max-w-[462px] min-h-[159px]"
      >
        <div className="space-y-[12px]">
          <p className="font-semibold text-[#ffffff] text-[20px] text-center">
            შექმენი ჩანელი
          </p>
          <p className="font-medium text-[#cbd5e1] text-[13px] text-center">
            კამპანია ”ტიკტოკის გაპიარება”
          </p>
        </div>

        <div className="flex flex-col gap-[8px] mt-[24px] px-[24px] w-full">
          <label className="font-semibold text-[#FFFFFF] text-[13px]">
            ჩანელის სახელი
          </label>
          <div className="relative">
            <input
              {...register('name')}
              type="text"
              placeholder="ახალი ჩანელი"
              className="bg-[#FFFFFF1A] pr-[22px] pl-[53px] border border-white/20 focus:border-[#0866FF] rounded-[8px] outline-none w-full min-h-[48px] font-semibold text-[#ffffff] text-[14px] transition-all"
            />
            <Image
              src={'/images/chatIcons/svg/hashtag.svg'}
              alt="# icon"
              width={16}
              height={16}
              className="top-1/2 left-[22px] absolute -translate-y-1/2"
            />
          </div>
          <div className="min-h-[20px]">
            {errors.name && (
              <p className="text-[12px] text-red-400">{errors.name.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-[15px] mt-[10px] px-[24px] w-full">
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center gap-[8px]">
              <Image
                src={'/images/chatIcons/svg/visibility.svg'}
                alt="visibility"
                width={14}
                height={14}
              />
              <p className="text-[#ffffff] text-[14px]">ხილვადობა</p>
            </div>
            <div className="flex items-center gap-[8px]">
              <p className="font-semibold text-[12px] text-white">
                {channelState === 'public' ? 'საჯარო' : 'დახურული'}
              </p>
              <ToggleSwitch
                value={channelState}
                onToggle={(val) => setValue('channel_state', val)}
              />
            </div>
          </div>
          <p className="text-[#ffffff99] text-[12px] leading-relaxed">
            {channelState === 'public'
              ? 'ამ ჩატის ნახვა შეეძლება სერვერის ყველა წევრს.'
              : 'მხოლოდ არჩეულ მონაწილეებს შეეძლებათ ამ ჩატის ნახვა.'}
          </p>
        </div>

        <div className="flex justify-center gap-[15px] mt-[30px] px-[24px] w-full">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="bg-[#FFFFFF1A] hover:bg-[#FFFFFF2A] rounded-[8px] w-1/2 min-h-[42px] font-bold text-[#ffffff] text-[13px] transition-colors cursor-pointer"
          >
            უკან დაბრუნება
          </button>
          <button
            type="submit"
            disabled={isPending || !serverId}
            className="bg-[#0866FF] hover:bg-[#0052D1] disabled:opacity-50 rounded-[8px] w-1/2 min-h-[42px] font-bold text-[#ffffff] text-[13px] transition-colors cursor-pointer"
          >
            {isPending ? 'იგზავნება..' : 'შექმენი ჩანელი'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateChanelPopup;
