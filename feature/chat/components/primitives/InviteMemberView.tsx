'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Props } from '../../types';
import { addMember } from '../../api/chatApi';
import { toast } from 'react-toastify';
import { useParams } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { addMemberSchema, addMemberValue } from '../../schema/addMemberSchema';
import { zodResolver } from '@hookform/resolvers/zod';

const InviteMemberView = ({
  searchTerm,
  setSearchTerm,
  filteredUsers,
  selectedUsers,
  selectedIds,
  toggleUser,
}: Props) => {
  const params = useParams();
  const channelId = Number(params.updateChatId);

  const {
    setValue,
    formState: { errors },
  } = useForm<addMemberValue>({
    resolver: zodResolver(addMemberSchema),
    defaultValues: { user_ids: selectedIds.map(Number) },
  });

  const { isPending, mutate } = useMutation({
    mutationFn: (data: addMemberValue) => addMember(data, channelId),
    onSuccess: () => toast.success('add member successfully'),
    onError: () => toast.error('failed'),
  });

  const submitForm = () => {
    setValue('user_ids', selectedIds.map(Number));
    mutate({ user_ids: selectedIds.map(Number) });
  };

  return (
    <div className="flex flex-col justify-between bg-[#001541D6] px-[30px] w-full max-w-[1440px] h-screen">
      <div className="flex flex-col gap-[38px]">
        <div className="flex justify-between items-center min-h-[72px]">
          <p className="font-semibold text-[18px] text-white">
            მოწვევის გაკეთება
          </p>

          <Link href="/chat">
            <Image
              src="/images/chatIcons/svg/closeButton.svg"
              alt="close"
              width={40}
              height={40}
            />
          </Link>
        </div>

        <div className="space-y-[10px]">
          <p className="font-semibold text-[15px] text-white">არხის სახელი</p>

          <div className="bg-[#FFFFFF05] shadow-[4px_5px_6px_0px_#FFFFFF42_inset,-1px_-3px_4px_0px_#FFFFFF42_inset,0px_8px_13px_0px_#0000000A] backdrop-blur-[7.5px] p-[18px] border border-white rounded-[8px] min-h-[118px]">
            <p className="mb-[10px] font-semibold text-[18px] text-white">
              დაამატე ადამიანები
            </p>

            <div className="flex bg-[#07070975] p-[6px] rounded-[6px] min-h-[50px]">
              <div className="flex items-center gap-[6px] w-1/2 overflow-x-auto">
                {selectedUsers.map(({ user }) => (
                  <div
                    key={user.id}
                    className="flex items-center gap-[7px] bg-[#FFFFFF36] px-[15px] py-[4px] border-[##FFFFFF75] border-[2px] rounded-[6px]"
                  >
                    <span className="font-semibold text-[17px] text-white">
                      {user.email}
                    </span>
                    <button
                      onClick={() => toggleUser(user.id)}
                      className="text-white cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex gap-[10px] w-1/2">
                <div className="relative bg-[#FFFFFF0A] rounded-[6px] w-full">
                  <input
                    type="search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-transparent pl-[35px] outline-none w-full min-h-[38px] text-[18px] text-white"
                    placeholder="მოთაგეთ ვინმე მაგ: @... (@გიორგი გაბრავა)"
                  />
                  <Image
                    src="/images/chatIcons/svg/searchIcon.svg"
                    alt="search"
                    width={18}
                    height={18}
                    className="top-1/2 left-[10px] absolute -translate-y-1/2"
                  />
                </div>
              </div>
            </div>

            {errors.user_ids && (
              <p className="text-red-400 text-sm">{errors.user_ids.message}</p>
            )}

            <div className="my-[10px] border border-[#FFFFFF75]" />

            <p className="mb-[6px] font-semibold text-[14px] text-white">
              წევრები
            </p>

            <div className="max-h-[300px] overflow-y-auto">
              {filteredUsers.map(({ user }) => (
                <div
                  key={user.id}
                  onClick={() => toggleUser(user.id)}
                  className="flex items-center gap-[8px] hover:bg-[#FFFFFF0A] px-[4px] py-[8px] rounded-[4px] cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(user.id)}
                    readOnly
                  />
                  <div className="bg-black rounded-full w-[34px] h-[34px]" />
                  <p className="font-semibold text-[15px] text-white">
                    {user.email}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end w-full">
        <div className="flex gap-[13px] mb-[40px] w-full max-w-[414px] min-h-[38px]">
          <button className="bg-[#FFFFFF36] border border-[#FFFFFF36] rounded-[8px] w-1/2 min-h-[38px] font-semibold text-[13px] text-white cursor-pointer">
            უკან დაბრუნება
          </button>
          <button
            onClick={submitForm}
            className="bg-[#0866FF] border border-[#C13D3F36] rounded-[8px] w-1/2 min-h-[38px] font-semibold text-[13px] text-white cursor-pointer"
          >
            {isPending ? 'იგზავნება...' : 'დაამატე'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default InviteMemberView;
