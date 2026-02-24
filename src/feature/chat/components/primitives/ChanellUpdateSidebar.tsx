'use client';

import Image from 'next/image';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { deleteChannel } from '../../api/chatApi';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import DeleteChatPopup from './DeleteChatPopup';
import { ChanellUpdateSidebarProps } from '../../types';
import { useChatStore } from '@/feature/common/stores/useChatStore';

const ChanellUpdateSidebar = ({
  chatChanel,
  setChatChanel,
  channelId,
  toggleChatFull,
  chatFull,
}: ChanellUpdateSidebarProps) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const serverId = useChatStore((state) => state.serverId);

  const [isOpen, setIsOpen] = useState(false);

  const { mutateAsync: deleteMutate, isPending } = useMutation({
    mutationFn: () => {
      if (!serverId) throw new Error('Server ID is missing');
      return deleteChannel(serverId, channelId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['channelName'],
      });
    },
  });

  const handleDeleteChannel = async () => {
    const toastId = toast.loading('არხი იშლება...');

    try {
      await deleteMutate();

      toast.update(toastId, {
        render: 'არხი წარმატებით წაიშალა',
        type: 'success',
        isLoading: false,
        autoClose: 3000,
      });

      setIsOpen(false);
      router.push('/chat');
    } catch (error) {
      toast.update(toastId, {
        render: 'არხის წაშლა ვერ მოხერხდა',
        type: 'error',
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="flex flex-col gap-[10px] bg-[#001541D6] py-[16px] border-[#E0E0E0] border-r w-full max-w-[277px] h-screen">
      <div className="flex items-center gap-[10px] px-[13px] w-full">
        <button onClick={() => toggleChatFull()}>
          <Image
            src={
              chatFull
                ? '/images/chatIcons/svg/sizeDownChat.svg'
                : '/images/chatIcons/svg/sizeUpChat.svg'
            }
            alt="chatSize"
            width={21}
            height={21}
            className="cursor-pointer"
          />
        </button>
        <Image
          src={'/images/chatIcons/svg/hashtag.svg'}
          alt="# icon"
          width={16}
          height={16}
        />
        <p className="text-[15px] text-white">არხის პარამეტრები</p>
      </div>

      <div className="pl-[13px]">
        <button
          onClick={() => setChatChanel('chatInfo')}
          className={`${
            chatChanel === 'chatInfo' ? 'bg-[#FFFFFF36]' : ''
          } px-[8px] py-[6px] rounded-tl-[6px] w-full flex justify-start rounded-bl-[6px] cursor-pointer transition-colors`}
        >
          <p className="font-semibold text-[15px] text-white">
            არხის ინფორმაცია
          </p>
        </button>

        <button
          onClick={() => setChatChanel('invitePeople')}
          className={`${
            chatChanel === 'invitePeople' ? 'bg-[#FFFFFF36]' : ''
          } px-[8px] py-[6px] rounded-tl-[6px] flex justify-start w-full rounded-bl-[6px] cursor-pointer transition-colors`}
        >
          <p className="font-semibold text-[15px] text-white">
            მოწვევის გაკეთება
          </p>
        </button>
      </div>

      <div className="bg-[#FFFFFF75] mx-[13px] h-[1px]"></div>

      <div
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-[10px] hover:bg-red-500/20 mt-2 px-[21px] py-2 w-full transition-all cursor-pointer"
      >
        <Image
          src={'/images/chatIcons/svg/deleteSvg.svg'}
          alt="delete icon"
          width={16}
          height={16}
        />
        <p className="text-[#FF86AC] text-[15px]">
          {isPending ? 'იშლება...' : 'არხის წაშლა'}
        </p>
      </div>

      {isOpen && (
        <DeleteChatPopup
          handleDeleteChannel={handleDeleteChannel}
          setIsOpen={setIsOpen}
          isPending={isPending}
        />
      )}
    </div>
  );
};

export default ChanellUpdateSidebar;
