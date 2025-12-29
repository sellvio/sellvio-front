import Image from 'next/image';
import ToggleSwitch from './ToggleSwitch';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import {
  createChatSchea,
  createChatValue,
} from '../../schema/createChanelSchema';
import { addChanel } from '../../api/chatApi';

const CreateChanelPopup = ({ setIsOpen }) => {
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
    mutationFn: addChanel,
    onSuccess: () => {
      toast.success('Channel created successfully');
    },
    onError: () => {
      toast.error('Channel creation failed');
    },
  });

  const submitForm = (data: createChatValue) => {
    mutate(data);
  };

  return (
    <div className="z-50 fixed inset-0 flex justify-center items-center bg-black/50">
      <form
        onSubmit={handleSubmit(submitForm)}
        className="relative flex flex-col justify-center items-center bg-[#FFFFFF36] py-[13px] border border-[#FFFFFF36] rounded-[8px] w-full max-w-[462px] min-h-[159px]"
      >
        <div className="space-y-[12px]">
          <p className="font-semibold text-[#ffffff] text-[18px] text-center">
            შექმენი ჩანელი
          </p>
          <p className="font-semiBold text-[#ffffff] text-[13px]">
            კამპანია ”ტიკტოკის გაპიარება”
          </p>
        </div>
        <div className="flex flex-col gap-[13px] mt-[24px] px-[24px] w-full">
          <label
            htmlFor=""
            className="font-semibold text-[#FFFFFF] text-[13px]"
          >
            ჩანელის სახელი
          </label>
          <div className="relative">
            <input
              {...register('name')}
              type="text"
              placeholder="ახალი ჩანელი"
              className="bg-[#FFFFFF36] pr-[22px] pl-[53px] border rounded-[8px] outline-none w-full min-h-[45px] font-semibold text-[#ffffff] text-[13px]"
            />
            <Image
              src={'/images/chatIcons/svg/hashtag.svg'}
              alt="# icon"
              width={16}
              height={16}
              className="top-1/2 left-[22px] absolute -translate-y-1/2"
            />
          </div>
          <div className="flex items-start min-h-[24px]">
            {errors.name && (
              <p className="text-red-400 text-sm">{errors.name.message}</p>
            )}
          </div>
        </div>
        <div className="space-y-[10px] px-[24px]">
          <div className="flex justify-between w-full">
            <div className="flex items-center gap-[6px]">
              <Image
                src={'/images/chatIcons/svg/visibility.svg'}
                alt="closeButton"
                width={9}
                height={11}
              />
              <p className="text-[#ffffff] text-[13px]">ხილვადობა</p>
            </div>
            <div>
              <div className="flex items-center gap-[4px]">
                <p className="font-semibold text-[10px] text-white">
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
          </div>
          <p className="font-semibold text-[#ffffff] text-[13px]">
            მხოლოდ არჩეულ მონაწილეებს შეეძლებათ ამ ჩატის ნახვა
          </p>
        </div>
        <div className="flex justify-center gap-[22px] mt-[24px] px-[24px] w-full">
          <button
            onClick={() => setIsOpen(false)}
            disabled={isPending}
            className="bg-[#FFFFFF1A] rounded-[8px] w-1/2 min-h-[38px] font-bold text-[#ffffff] text-[13px] cursor-pointer"
          >
            უკან დაბრუნება
          </button>
          <button className="bg-[#0866FF] rounded-[8px] w-1/2 min-h-[38px] font-bold text-[#ffffff] text-[13px] cursor-pointer">
            {isPending ? 'იგზავნება..' : 'შექმენი ჩანელი'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateChanelPopup;
