'use client';
import Image from 'next/image';
import { ChannelsProps } from '../../types';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import ToggleSwitch from './ToggleSwitch';
import { channelSchema, channelValue } from '../../schema/channelSchema';
import { addChanel } from '../../api/chatApi';

const ChanelInfo = ({ setChatInfoOpen }: ChannelsProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<channelValue>({
    resolver: zodResolver(channelSchema),
    defaultValues: {
      channel_state: 'public',
    },
  });

  const channelState = watch('channel_state');

  const { mutate, isPending } = useMutation({
    mutationFn: addChanel,
    onSuccess: () => {
      toast.success('Channel created successfully');
    },
    onError: () => {
      toast.error('Channel creation failed');
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
          <button
            onClick={() => setChatInfoOpen((prev) => !prev)}
            className="cursor-pointer"
          >
            <Image
              src={'/images/chatIcons/svg/closeButton.svg'}
              alt="closeButton"
              width={40}
              height={40}
            />
          </button>
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
                src={'/images/chatIcons/svg/hashtag.svg'}
                alt="# icon"
                width={16}
                height={16}
                className="top-1/2 left-[16px] absolute -translate-y-1/2"
              />

              <input
                {...register('name')}
                className="shadow-[4px_5px_6px_0px_#FFFFFF42_inset,-1px_-3px_4px_0px_#FFFFFF42_inset,0px_8px_13px_0px_#0000000A] px-[44px] border-[2px] border-white rounded-[8px] outline-none w-full min-h-[58px] text-[18px] text-white"
                placeholder="საერთო-ჩატი"
              />

              <Image
                src={'/images/chatIcons/svg/smile.svg'}
                alt="smile icon"
                width={24}
                height={24}
                className="top-1/2 right-[16px] absolute -translate-y-1/2 cursor-pointer"
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

            <div className="relative w-full min-h-[58px]">
              <input
                {...register('description')}
                className="shadow-[4px_5px_6px_0px_#FFFFFF42_inset,-1px_-3px_4px_0px_#FFFFFF42_inset,0px_8px_13px_0px_#0000000A] pr-[44px] pl-[18px] border-[2px] border-white rounded-[8px] outline-none w-full min-h-[58px] text-[18px] text-white"
                placeholder="გააგებინე ყველას თუ როგორ გამოიყენონ ეს არხი"
              />

              <Image
                src={'/images/chatIcons/svg/smile.svg'}
                alt="smile icon"
                width={24}
                height={24}
                className="top-1/2 right-[16px] absolute -translate-y-1/2 cursor-pointer"
              />
            </div>

            {errors.description && (
              <p className="text-red-400 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-[10px] w-full">
            <div className="font-semibold text-[15px] text-white">
              არხის ხილვადობა
            </div>

            <div className="relative flex justify-between items-center pr-[18px] pl-[50px] border border-white rounded-[8px] w-full min-h-[58px]">
              <Image
                src={'/images/chatIcons/svg/visibility.svg'}
                alt="visibility icon"
                width={18}
                height={22}
                className="top-1/2 left-[16px] absolute -translate-y-1/2"
              />

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

          <div className="flex justify-end items-center w-full">
            <button
              disabled={isPending}
              className="hover:bg-[#0866FF] mb-[30px] border border-[#0866FF] hover:border-[#C13D3F36] rounded-[10px] w-full max-w-[200px] min-h-[50px] text-[#FFFFFF] cursor-pointer"
            >
              {isPending ? 'იგზავნება..' : 'დადასტურება'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChanelInfo;
