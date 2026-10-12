'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import { ChannelsProps, ChatChannel } from '@/feature/chat/types';
import ChannelSkeleton from './ChannelSkeleton';
import ChannelHeaderSkeleton from './ChannelHeaderSkeleton';
import { useChatStore } from '@/feature/common/stores/useChatStore';
import { useSocketStore } from '@/feature/common/stores/useSocketStore';
import { useChatServer } from '@/feature/chat/hooks/useChatServer';

const truncate = (text: string, max: number) =>
  text.length > max ? `${text.slice(0, max)}...` : text;

const Channels = ({
  campaignId,
  setChatInfoOpen,
  setIsOpen,
  toggleChatFull,
  chatFull,
}: ChannelsProps) => {
  const {
    socket,
    connect,
    isConnected,
    clearMessages,
    joinChannel,
    closeChannel,
  } = useSocketStore();

  const {
    isAdmin,
    fetchMembers,
    setSelectedChannelId,
    selectedChannelId,
    currentUser,
    serverId,
  } = useChatStore();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) connect(token);
  }, [connect]);

  const { isLoading, isError, server, channels } = useChatServer(campaignId);

  useEffect(() => {
    if (socket && isConnected && serverId) {
      socket.emit('server:open', { serverId });
    }
  }, [socket, isConnected, serverId]);

  useEffect(() => {
    if (serverId) fetchMembers();
  }, [serverId, fetchMembers]);

  const handleChannelSelect = (ch: ChatChannel) => {
    if (!serverId || !socket || !isConnected) return;
    if (selectedChannelId === ch.id) return;

    const previousChannelId = selectedChannelId;

    if (previousChannelId) {
      closeChannel(serverId, previousChannelId);
    }

    clearMessages();
    setSelectedChannelId(ch.id, ch.channel_type_id ?? null, ch.name);
    joinChannel(serverId, ch.id, ch.channel_type_id ?? undefined);
  };

  return (
    <div className="flex flex-col justify-between bg-[#001541D6] border-[#E0E0E0] border-r w-full max-w-[277px] h-screen">
      {isLoading ? (
        <ChannelHeaderSkeleton />
      ) : (
        <div className="flex justify-between items-center px-3 py-2 border-[#E0E0E0] border-b min-h-[49px] font-semibold text-[16px] text-white cursor-pointer">
          <button onClick={toggleChatFull} className="cursor-pointer">
            <Image
              src={
                chatFull
                  ? '/images/chatIcons/svg/sizeDownChat.svg'
                  : '/images/chatIcons/svg/sizeUpChat.svg'
              }
              alt="size"
              width={21}
              height={21}
            />
          </button>
          <p>{server?.name && truncate(server.name, 20)}</p>
          {isAdmin && (
            <button onClick={() => setChatInfoOpen((prev) => !prev)}>
              <Image
                src="/images/chatIcons/svg/setting.svg"
                alt="settings"
                width={16}
                height={19}
              />
            </button>
          )}
        </div>
      )}

      <div className="flex-1 pl-3 overflow-y-auto">
        <div className="flex justify-between items-center px-2 py-2 font-semibold text-[14px] text-white">
          <p>ჩათის არხები</p>
          {isAdmin && (
            <button
              onClick={() => setIsOpen?.(true)}
              className="cursor-pointer"
            >
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
        ) : isError ? (
          <div className="px-2 py-3 text-white/70 text-sm">
            ჩატი ვერ მოიძებნა ან მასზე წვდომა არ გაქვს
          </div>
        ) : channels.length === 0 ? (
          <div className="px-2 py-3 text-white/70 text-sm">
            არხები ჯერ არ არის
          </div>
        ) : (
          channels.map((ch) => (
            <div
              key={ch.id}
              onClick={() => handleChannelSelect(ch)}
              className={`group flex justify-between items-center gap-2 px-2 py-2 rounded-tl-[6px] rounded-bl-[6px] transition-all cursor-pointer ${
                selectedChannelId === ch.id
                  ? 'bg-[#FFFFFF36] text-white'
                  : 'text-[#cfcfcf] hover:bg-[#FFFFFF36]'
              }`}
            >
              <div className="flex items-center gap-2">
                <Image
                  src="/images/chatIcons/svg/hashtag.svg"
                  alt="#"
                  width={16}
                  height={19}
                />
                <span className="font-semibold text-[15px]">{ch.name}</span>
              </div>

              {isAdmin && (
                <Link
                  href={`/updateChat/${ch.id}?campaignId=${campaignId}`}
                  className="opacity-0 group-hover:opacity-100"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Image
                    src="/images/chatIcons/svg/setting.svg"
                    alt="edit"
                    width={18}
                    height={16}
                  />
                </Link>
              )}
            </div>
          ))
        )}
      </div>

      <div className="flex items-center gap-3 bg-[#FFFFFF36] mx-3 mb-4 px-3 rounded-[10px] h-[56px] shrink-0">
        <div className="bg-[aqua] rounded-full w-[31px] h-[31px]" />
        <div className="flex flex-col">
          <p className="max-w-[150px] font-semibold text-[15px] text-white truncate">
            {currentUser?.name ?? 'მომხმარებელი'}
          </p>
          <p className="font-semibold text-[12px] text-white/70">
            {isConnected ? 'ონლაინ' : 'კავშირი არ არის'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Channels;
