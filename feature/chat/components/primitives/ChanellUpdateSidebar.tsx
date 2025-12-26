'use client';

import Image from 'next/image';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { deleteChannel } from '../../api/chatApi';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import DeleteChatPopup from './DeleteChatPopup';

const ChanellUpdateSidebar = ({ chatChanel, setChatChanel, channelId }) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { refetch: deleteChannelRefetch, isFetching } = useQuery({
    queryKey: ['delete-channel', channelId],
    queryFn: () => deleteChannel(channelId),
    enabled: false,
  });

  const [isOpen, setIsOpen] = useState(false);

  const handleDeleteChannel = async () => {
    const toastId = toast.loading('არხი იშლება...');

    try {
      await deleteChannelRefetch();

      toast.update(toastId, {
        render: 'არხი წარმატებით წაიშალა',
        type: 'success',
        isLoading: false,
        autoClose: 3000,
      });

      queryClient.invalidateQueries({
        queryKey: ['channels'],
      });

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
        <Image
          src={'/images/chatIcons/svg/hashtag.svg'}
          alt="# icon"
          width={16}
          height={16}
        />
        <p className="text-[15px] text-white">საერთო-ჩატი</p>
      </div>

      <div className="pl-[13px]">
        <button
          onClick={() => setChatChanel('chatInfo')}
          className={`${
            chatChanel === 'chatInfo' ? 'bg-[#FFFFFF36]' : ''
          } px-[8px] py-[6px] rounded-tl-[6px] w-full flex justify-start rounded-bl-[6px] cursor-pointer`}
        >
          <p className="font-semibold text-[15px] text-white">
            არხის ინფორმაცია
          </p>
        </button>

        <button
          onClick={() => setChatChanel('invitePeople')}
          className={`${
            chatChanel === 'invitePeople' ? 'bg-[#FFFFFF36]' : ''
          } px-[8px] py-[6px] rounded-tl-[6px] flex justify-start w-full rounded-bl-[6px] cursor-pointer`}
        >
          <p className="font-semibold text-[15px] text-white">
            მოწვეის გაკეთება
          </p>
        </button>
      </div>

      <div className="bg-[#FFFFFF75] w-full h-[1px]"></div>

      <div
        // onClick={handleDeleteChannel}
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-[10px] pl-[21px] w-full cursor-pointer"
      >
        <Image
          src={'/images/chatIcons/svg/deleteSvg.svg'}
          alt="# icon"
          width={16}
          height={16}
        />
        <p className="text-[#FF86AC] text-[15px]">
          {isFetching ? 'იშლება...' : 'არხის წაშლა'}
        </p>
      </div>
      {isOpen === true ? (
        <DeleteChatPopup
          handleDeleteChannel={handleDeleteChannel}
          setIsOpen={setIsOpen}
        />
      ) : (
        ''
      )}
    </div>
  );
};

export default ChanellUpdateSidebar;
