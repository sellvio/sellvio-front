'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ChatFromCampaing } from '../../api/chatApi';
import { ChannelsProps, ChatChannel } from '../../types';

import ChannelSkeleton from './ChannelSkeleton';
import ChannelHeaderSkeleton from './ChannelHeaderSkeleton';
import { useChatStore } from '@/feature/common/stores/useChatStore';
import { useSocketStore } from '@/feature/common/stores/useSocketStore';

const SERVER_ID = 31;

const Channels = ({
  setChatInfoOpen,
  setIsOpen,
  toggleChatFull,
  chatFull,
}: ChannelsProps) => {
  const { socket, connect, isConnected, clearMessages } = useSocketStore();
  const { isAdmin, fetchMembers, setSelectedChannelId, selectedChannelId } =
    useChatStore();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) connect(token);
  }, [connect]);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  useEffect(() => {
    if (!socket) return;

    const handleOnline = (data: {
      onlineUsers: any[];
      offlineUsers: any[];
    }) => {
      console.log('სერვერზე ონლაინ არიან:', data.onlineUsers);
    };

    socket.on('server:online', handleOnline);
    return () => socket.off('server:online', handleOnline);
  }, [socket]);

  const { isLoading, isError, data } = useQuery({
    queryKey: ['channelName', SERVER_ID],
    queryFn: () => ChatFromCampaing(SERVER_ID),
  });

  const channels: ChatChannel[] = data?.data?.chat_channels || [];

  const handleChannelSelect = (channelId: number) => {
    if (selectedChannelId === channelId) return;

    clearMessages();
    setSelectedChannelId(channelId);

    if (socket && isConnected) {
      socket.emit('channel:open', {
        serverId: SERVER_ID,
        channelId,
        limit: 20,
      });
    }
  };

  const truncate = (text: string, maxLength: number) =>
    text.length > maxLength ? text.slice(0, maxLength) + '...' : text;

  if (isError) {
    return <div className="text-red-400">Error loading channels</div>;
  }

  return (
    <div className="flex flex-col justify-between bg-[#001541D6] border-[#E0E0E0] border-r w-full max-w-[277px] h-screen">
      {isLoading ? (
        <ChannelHeaderSkeleton />
      ) : (
        <div className="flex justify-between items-center px-3 py-2 border-[#E0E0E0] border-b min-h-[49px] font-semibold text-[16px] text-white">
          <button onClick={toggleChatFull}>
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
          <p>{data?.data?.name && truncate(data.data.name, 20)}</p>
          {isAdmin && (
            <button onClick={() => setChatInfoOpen((prev: boolean) => !prev)}>
              <Image
                src="/images/chatIcons/svg/setting.svg"
                alt="settings"
                width={16}
                height={19}
                className="cursor-pointer"
              />
            </button>
          )}
        </div>
      )}

      <div className="flex-1 pl-3">
        <div className="flex justify-between items-center px-2 py-2 font-semibold text-[14px] text-white">
          <p>ჩათის არხები</p>
          {isAdmin && setIsOpen && (
            <button onClick={() => setIsOpen(true)}>
              <Image
                src="/images/chatIcons/svg/pluse.svg"
                alt="add"
                width={9}
                height={9}
              />
            </button>
          )}
        </div>

        {isLoading ? (
          <ChannelSkeleton />
        ) : (
          channels.map((ch) => (
            <div
              key={ch.id}
              onClick={() => handleChannelSelect(ch.id)}
              className={`group flex justify-between items-center gap-2 px-2 py-2 rounded-tl-[6px] rounded-bl-[6px] text-[14px] transition-all duration-300 cursor-pointer ${
                selectedChannelId === ch.id
                  ? 'bg-[#FFFFFF36] text-white'
                  : 'text-[#cfcfcf] hover:bg-[#FFFFFF36]'
              }`}
            >
              <div className="flex items-center gap-2">
                <Image
                  src="/images/chatIcons/svg/hashtag.svg"
                  alt="hashtag"
                  width={16}
                  height={19}
                />
                <span className="font-semibold text-[15px] text-white">
                  {ch.name}
                </span>
              </div>
              {isAdmin && (
                <Link
                  href={`updateChat/${ch.id}`}
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Image
                    src="/images/chatIcons/svg/setting.svg"
                    alt="setting"
                    width={18}
                    height={16}
                  />
                </Link>
              )}
            </div>
          ))
        )}
      </div>

      <div className="flex items-center gap-3 bg-[#FFFFFF36] mx-3 mb-4 px-3 rounded-[10px] h-[56px]">
        <div className="bg-[aqua] rounded-full w-[31px] h-[31px]" />
        <div className="flex flex-col">
          <p className="font-semibold text-[15px] text-white">
            ვაჩე გაბრინდაშვილი
          </p>
          <p className="font-semibold text-[12px] text-white">ონლაინ</p>
        </div>
      </div>
    </div>
  );
};

export default Channels;
