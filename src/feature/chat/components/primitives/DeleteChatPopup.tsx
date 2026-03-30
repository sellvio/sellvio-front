'use client';

import React, { useState } from 'react';
import { DeleteChatPopupProps } from '../../types';

const DeleteChatPopup = ({
  handleDeleteChannel,
  setIsOpen,
}: DeleteChatPopupProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onConfirm = async () => {
    setIsSubmitting(true);
    try {
      await handleDeleteChannel();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="z-50 fixed inset-0 flex justify-center items-center bg-black/60 backdrop-blur-sm">
      <div className="relative flex flex-col justify-center items-center gap-[40px] bg-[#1e293b] shadow-2xl p-[24px] border border-[#FFFFFF36] rounded-[12px] w-full max-w-[420px]">
        <div className="space-y-[12px] text-center">
          <p className="font-bold text-[#ffffff] text-[20px]">არხის წაშლა</p>
          <p className="font-medium text-[#cbd5e1] text-[14px] leading-relaxed">
            ნამდვილად გსურთ ამ არხის წაშლა? <br />
            ეს ქმედება შეუქცევადია და წაიშლება ყველა მონაცემი.
          </p>
        </div>

        <div className="flex justify-center gap-[15px] w-full">
          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => setIsOpen(false)}
            className="bg-[#FFFFFF1A] hover:bg-[#FFFFFF2A] disabled:opacity-50 border border-[#FFFFFF36] rounded-[8px] w-full max-w-[170px] min-h-[42px] font-bold text-[#ffffff] text-[13px] transition-all cursor-pointer"
          >
            გაუქმება
          </button>

          <button
            type="button"
            disabled={isSubmitting}
            onClick={onConfirm}
            className="bg-[#EB165440] hover:bg-[#EB1654] disabled:opacity-50 shadow-lg border border-[#EB1654] rounded-[8px] w-full max-w-[170px] min-h-[42px] font-bold text-[#ffffff] text-[13px] transition-all cursor-pointer"
          >
            {isSubmitting ? 'იშლება...' : 'დიახ, წაშლა'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteChatPopup;
