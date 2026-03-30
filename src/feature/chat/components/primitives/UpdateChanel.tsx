'use client';

import Image from 'next/image';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { updateChanel, updateChanelValue } from '../../schema/updateChanel';
import { useChatLayout } from '@/feature/common/stores/useChatLayout';
import { useChatStore } from '@/feature/common/stores/useChatStore';
import { updateChannel } from '../../api/chatApi';

type UpdateChanelProps = {
  channelId: number;
};

const UpdateChanel = ({ channelId }: UpdateChanelProps) => {
  const serverId = useChatStore((state) => state.serverId);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<updateChanelValue>({
    resolver: zodResolver(updateChanel),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: updateChanelValue) => {
      if (!serverId) throw new Error('Server ID is missing');
      return updateChannel(serverId, channelId, data);
    },
    onSuccess: () => {
      toast.success('Channel updated successfully');
    },
    onError: () => {
      toast.error('Channel update failed');
    },
  });

  const { chatFull } = useChatLayout();

  const submitForm = (data: updateChanelValue) => {
    mutate(data);
  };

  return (
    <div
      className={`flex flex-col justify-between bg-[#001541D6] w-full ${chatFull ? '' : 'max-w-[1440px]'} h-screen`}
    >
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
                placeholder="შეიყვანეთ არხის სახელი"
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
              placeholder="შეიყვანეთ დამატებითი ინფორმაცია"
            />

            {errors.description && (
              <p className="text-red-400 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="w-full">
            <button
              disabled={isPending || !serverId}
              className="hover:bg-[#0866FF] disabled:opacity-50 border border-[#0866FF] rounded-[10px] w-full min-h-[50px] text-white cursor-pointer"
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
