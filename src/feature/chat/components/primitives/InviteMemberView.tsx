'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { addMemberSchema, addMemberValue } from '../../schema/addMemberSchema';
import { addMember } from '../../api/chatApi';
import AddMemberSkeleton from './AddMemberSkeleton';
import { useChatLayout } from '@/feature/common/stores/useChatLayout';
import { useChatStore } from '@/feature/common/stores/useChatStore';
import { InvitePeopleProps } from '../../types';
import { getUserDisplayName } from '../../utils/getUserDisplayName';

const InviteMemberView = ({
  searchTerm,
  setSearchTerm,
  filteredUsers,
  selectedUsers,
  selectedIds,
  toggleUser,
  isLoading,
  isError,
  channelId,
  backHref,
  onInvited,
}: InvitePeopleProps) => {
  const queryClient = useQueryClient();
  const serverId = useChatStore((state) => state.serverId);
  const [validationError, setValidationError] = useState<string | null>(null);

  const { isPending, mutate } = useMutation({
    mutationFn: (data: addMemberValue) => {
      if (!serverId) throw new Error('Server ID is missing');
      return addMember(serverId, channelId, data);
    },
    onSuccess: (res) => {
      const added = res?.data?.added ?? 0;
      if (added > 0) {
        toast.success(`დაემატა ${added} წევრი`);
      } else {
        toast.warning(
          'წევრები ვერ დაემატა (მხოლოდ კამპანიის დადასტურებული შემქმნელების დამატებაა შესაძლებელი)'
        );
      }
      queryClient.invalidateQueries({
        queryKey: ['invitableMembers', serverId, channelId],
      });
      onInvited();
    },
    onError: () => toast.error('წევრების დამატება ვერ მოხერხდა'),
  });

  const submitForm = () => {
    const parsed = addMemberSchema.safeParse({ user_ids: selectedIds });
    if (!parsed.success) {
      setValidationError(parsed.error.issues[0]?.message ?? null);
      return;
    }
    setValidationError(null);
    mutate(parsed.data);
  };

  const { chatFull } = useChatLayout();

  return (
    <div
      className={`flex flex-col justify-between bg-[#001541D6] px-[30px] w-full ${chatFull ? '' : 'max-w-[1440px]'} h-screen`}
    >
      <div className="flex flex-col gap-[38px]">
        <div className="flex justify-between items-center min-h-[72px]">
          <p className="font-semibold text-[18px] text-white">
            მოწვევის გაკეთება
          </p>

          <Link href={backHref}>
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
              <div className="flex items-center gap-[6px] w-1/2 overflow-x-auto custom-scrollbar">
                {selectedUsers.map(({ user }) => (
                  <div
                    key={user.id}
                    className="flex items-center gap-[7px] bg-[#FFFFFF36] px-[15px] py-[4px] border-[#FFFFFF75] border-[2px] rounded-[6px] whitespace-nowrap"
                  >
                    <span className="font-semibold text-[17px] text-white">
                      {getUserDisplayName({ user })}
                    </span>
                    <button
                      onClick={() => toggleUser(user.id)}
                      className="text-white hover:text-red-400 cursor-pointer"
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
                    placeholder="მოთაგეთ ვინმე..."
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

            {validationError && (
              <p className="mt-2 text-red-400 text-sm">{validationError}</p>
            )}

            <div className="my-[10px] border border-[#FFFFFF75]" />

            <p className="mb-[6px] font-semibold text-[14px] text-white">
              წევრები
            </p>

            <div className="max-h-[300px] overflow-y-auto custom-scrollbar">
              {isLoading && <AddMemberSkeleton />}
              {isError && (
                <p className="py-2 text-red-400 text-sm">
                  წევრების ჩატვირთვა ვერ მოხერხდა
                </p>
              )}
              {!isLoading && !isError && filteredUsers.length === 0 && (
                <p className="py-2 text-white/60 text-sm">
                  მოსაწვევი წევრები არ მოიძებნა
                </p>
              )}
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
                    className="cursor-pointer"
                  />
                  <div className="bg-gray-700 rounded-full w-[34px] h-[34px]" />
                  <p className="font-semibold text-[15px] text-white">
                    {getUserDisplayName({ user })}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end w-full">
        <div className="flex gap-[13px] mb-[40px] w-full max-w-[414px] min-h-[38px]">
          <Link
            href={backHref}
            className="flex justify-center items-center bg-[#FFFFFF36] hover:bg-[#FFFFFF50] border border-[#FFFFFF36] rounded-[8px] w-1/2 font-semibold text-[13px] text-white cursor-pointer"
          >
            უკან დაბრუნება
          </Link>
          <button
            onClick={submitForm}
            disabled={isPending || !serverId || selectedIds.length === 0}
            className="bg-[#0866FF] hover:bg-[#0052D1] disabled:opacity-50 border border-[#C13D3F36] rounded-[8px] w-1/2 min-h-[38px] font-semibold text-[13px] text-white cursor-pointer"
          >
            {isPending ? 'იგზავნება...' : 'დაამატე'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default InviteMemberView;
