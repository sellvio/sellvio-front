'use client';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { ChatMember } from '../../api/chatApi';

const Member = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['member'],
    queryFn: ChatMember,
  });
  return (
    <div className="[border-bottom-left-radius:10px] [border-top-left-radius:10px] gap-[14px] bg-[linear-gradient(0deg,rgba(17,24,39,0.42),rgba(17,24,39,0.42)),linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.1))] w-full max-w-[304px] h-full overflow-y-auto">
      {data?.data.map((eachElement) => (
        <div
          key={eachElement.user.id}
          className="flex items-center hover:bg-[#FFFFFF36] px-[22px] py-[11px] min-h-[56px] duration-300 ease-in-out cursor-pointer"
        >
          <div className="flex items-center gap-[15px]">
            {/* <div className="relative bg-[#999999] rounded-full w-[31px] h-[31px]">
              <Image
                src={
                  eachElement.status === 'active'
                    ? '/images/chatIcons/svg/activeStatusIcon.svg'
                    : '/images/chatIcons/svg/offlineStatusIcon.svg'
                }
                alt="userStatus"
                width={8}
                height={8}
                className="right-[1px] bottom-[1px] absolute"
              />
            </div> */}
            <div>
              <p className="font-semibold text-[#FFFFFF] text-[15px]">
                {eachElement.user.email}
              </p>
              <p className="font-semibold text-[12px] text-gray-500">
                {eachElement.role}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Member;
