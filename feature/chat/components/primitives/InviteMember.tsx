'use client';

import Image from 'next/image';
// import { useMutation } from '@tanstack/react-query';
// import { toast } from 'react-toastify';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { useForm } from 'react-hook-form';
// import ToggleSwitch from './ToggleSwitch';
// import { channelSchema, channelValue } from '../../schema/channelSchema';
// import { updateChamel } from '../../api/chatApi';
import Link from 'next/link';

const InviteMember = () => {
  //   const {
  //     formState: { errors },
  //   } = useForm<channelValue>({
  //     resolver: zodResolver(channelSchema),
  //   });

  //   const { mutate, isPending } = useMutation({
  //     mutationFn: (data: channelValue) => updateChamel(data, channelId),
  //     onSuccess: () => {
  //       toast.success('Channel updated successfully');
  //     },
  //     onError: () => {
  //       toast.error('Channel update failed');
  //     },
  //   });

  //   const submitForm = (data: channelValue) => {
  //     mutate(data);
  //   };

  return (
    <div className="flex flex-col justify-between bg-[#001541D6] w-full max-w-[1440px] h-screen">
      <div className="flex flex-col">
        <div className="flex justify-between items-center px-[26px] w-full min-h-[72px]">
          <p className="font-semibold text-[18px] text-white">
            მოწვეის გაკეთება
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
      </div>
    </div>
  );
};

export default InviteMember;
