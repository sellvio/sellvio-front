'use client';
import Image from 'next/image';
import { ChannelsProps } from '../../types';
import { useQuery } from '@tanstack/react-query';
import { ChatFromCampaing } from '../../api/chatApi';
import ChannelSkeleton from './ChannelSkeleton';
import Link from 'next/link';
import { useEffect } from 'react';
import { useChatStore } from '@/feature/common/stores/useChatStore';
import ChannelHeaderSkeleton from './ChannelHeaderSkeleton';

const Channels = ({ setChatInfoOpen, setIsOpen }: ChannelsProps) => {
  const { isLoading, isError, data } = useQuery({
    queryKey: ['chanelName', 31],
    queryFn: () => ChatFromCampaing(31),
  });

  const { isAdmin, fetchMembers } = useChatStore();

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  if (isError) return <div>Error loading channels</div>;

  const channels = data?.data?.chat_channels || [];

  const truncate = (text: string, maxLength: number) =>
    text.length > maxLength ? text.slice(0, maxLength) + '...' : text;

  return (
    <div className="flex flex-col justify-between bg-[#001541D6] border-[#E0E0E0] border-r w-full max-w-[277px] h-screen">
      {isLoading ? (
        <ChannelHeaderSkeleton />
      ) : (
        <div className="flex justify-between items-center px-[13px] py-[10px] border-[#E0E0E0] border-b min-h-[49px] font-[600] text-[#ffffff] text-[16px]">
          {data?.data && <p>{truncate(data.data.name, 25)}</p>}

          {isAdmin && (
            <button onClick={() => setChatInfoOpen((prev) => !prev)}>
              <Image
                src={'/images/chatIcons/svg/setting.svg'}
                alt="reshotka"
                width={16}
                height={19}
                className="cursor-pointer"
              />
            </button>
          )}
        </div>
      )}

      <div className="flex-1 pl-[13px]">
        <div className="flex justify-between items-center py-[10px] pr-[8px] pl-[8px] font-[600] text-[#ffffff] text-[16px]">
          <p className="font-semibold text-[14px]">ჩათის არხები</p>
          {isAdmin && (
            <button className="cursor-pointer" onClick={() => setIsOpen(true)}>
              <Image
                src={'/images/chatIcons/svg/pluse.svg'}
                alt="adding chat"
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
              className="group flex justify-between items-center gap-[8px] hover:bg-[#FFFFFF36] py-[8px] pr-[7px] pl-[8px] rounded-tl-[6px] rounded-bl-[6px] text-[#cfcfcf] text-[14px] transition-all duration-300 ease-in-out cursor-pointer"
            >
              <div className="flex gap-[10px]">
                <Image
                  src={'/images/chatIcons/svg/hashtag.svg'}
                  alt="reshotka"
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
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
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
        <div className="bg-[aqua] rounded-full w-[31px] h-[31px]"></div>

        <div className="flex flex-col">
          <p className="font-[600] text-[#FFFFFF] text-[15px]">
            ვაჩე გაბრინდაშვილი
          </p>
          <p className="font-[600] text-[#FFFFFF] text-[12px]">ონლაინ</p>
        </div>
      </div>
    </div>
  );
};

export default Channels;
