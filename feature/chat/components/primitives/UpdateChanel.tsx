'use client';

import Image from 'next/image';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import ToggleSwitch from './ToggleSwitch';
import { channelSchema, channelValue } from '../../schema/channelSchema';
import { updateChamel } from '../../api/chatApi';
import Link from 'next/link';

type UpdateChanelProps = {
  channelId: number;
};

const UpdateChanel = ({ channelId }: UpdateChanelProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<channelValue>({
    resolver: zodResolver(channelSchema),
    defaultValues: {
      name: 'საერთო-ჩატი',
      description: 'არხის აღწერა',
      channel_state: 'public',
    },
  });

  const channelState = watch('channel_state');

  const { mutate, isPending } = useMutation({
    mutationFn: (data: channelValue) => updateChamel(data, channelId),
    onSuccess: () => {
      toast.success('Channel updated successfully');
    },
    onError: () => {
      toast.error('Channel update failed');
    },
  });

  const submitForm = (data: channelValue) => {
    mutate(data);
  };

  return (
    <div className="flex flex-col justify-between bg-[#001541D6] w-full max-w-[1440px] h-screen">
      <div className="flex flex-col">
        <div className="flex justify-between items-center px-[26px] w-full min-h-[72px]">
          <p className="font-semibold text-[18px] text-white">
            არხის ინფორმაცია
          </p>

          <Link href={'/chat'} className="cursor-pointer">
            <Image
              src="/images/chatIcons/svg/closeButton.svg"
              alt="close"
              width={40}
              height={40}
            />
          </Link>
        </div>

        <form
          onSubmit={handleSubmit(submitForm)}
          className="flex flex-col gap-[29px] mt-[14px] px-[26px]"
        >
          <div className="flex flex-col gap-[10px]">
            <label className="font-semibold text-[15px] text-white">
              არხის სახელი
            </label>

            <div className="relative w-full min-h-[58px]">
              <Image
                src="/images/chatIcons/svg/hashtag.svg"
                alt="#"
                width={16}
                height={16}
                className="top-1/2 left-[16px] absolute -translate-y-1/2"
              />

              <input
                {...register('name')}
                className="bg-transparent px-[44px] border-[2px] border-white rounded-[8px] outline-none w-full min-h-[58px] text-[18px] text-white"
                placeholder="საერთო-ჩატი"
              />
            </div>

            {errors.name && (
              <p className="text-red-400 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-[10px]">
            <label className="font-semibold text-[15px] text-white">
              არხის აღწერა
            </label>

            <input
              {...register('description')}
              className="bg-transparent px-[18px] border-[2px] border-white rounded-[8px] outline-none w-full min-h-[58px] text-[18px] text-white"
              placeholder="არხის აღწერა"
            />

            {errors.description && (
              <p className="text-red-400 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-[10px]">
            <p className="font-semibold text-[15px] text-white">
              არხის ხილვადობა
            </p>

            <div className="flex justify-between items-center px-[18px] border border-white rounded-[8px] min-h-[58px]">
              <p className="font-semibold text-white">
                {channelState === 'public' ? 'საჯარო' : 'დახურული'}
              </p>

              <ToggleSwitch
                value={channelState}
                onToggle={(val) => setValue('channel_state', val)}
              />
            </div>

            {errors.channel_state && (
              <p className="text-red-400 text-sm">
                {errors.channel_state.message}
              </p>
            )}
          </div>

          <div className="flex justify-end">
            <button
              disabled={isPending}
              className="hover:bg-[#0866FF] disabled:opacity-50 border border-[#0866FF] rounded-[10px] w-[200px] min-h-[50px] text-white"
            >
              {isPending ? 'იგზავნება...' : 'დადასტურება'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateChanel;
