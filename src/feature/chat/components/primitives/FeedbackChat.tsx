'use client';

import Image from 'next/image';
import { Loader2 } from 'lucide-react';
import { useVideoUpload } from '@/feature/chat/hooks/useVideoUpload';
import { useSocketStore } from '@/feature/common/stores/useSocketStore';
import { useChatStore } from '@/feature/common/stores/useChatStore';

const FeedbackChat = () => {
  const submitFeedback = useSocketStore((s) => s.submitFeedback);
  const selectedChannelId = useChatStore((s) => s.selectedChannelId);
  const serverId = useChatStore((s) => s.serverId);
  const isAdmin = useChatStore((s) => s.isAdmin);

  const {
    fileRef,
    preview,
    title,
    setTitle,
    isDragging,
    setIsDragging,
    uploadedVideoUrl,
    isPending,
    handleFile,
    handleReset,
  } = useVideoUpload({ serverId, channelId: selectedChannelId });

  if (isAdmin) return null;

  const handleSubmit = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!uploadedVideoUrl || !title.trim() || !selectedChannelId) return;
    submitFeedback(selectedChannelId, title.trim(), uploadedVideoUrl);
    handleReset();
  };

  return (
    <div className="flex flex-col gap-3 mt-2 mb-4 px-[7px] w-full">
      <div
        onClick={() => !preview && fileRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          if (!preview) setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          handleFile(e.dataTransfer.files?.[0]);
        }}
        className={`relative flex bg-[#FFFFFF36] ${preview ? 'p-[20px] items-start' : 'items-center px-[20px]'} border-2 ${
          isDragging ? 'border-white' : 'border-gray-400 hover:border-white'
        } border-dashed rounded-lg transition cursor-pointer`}
      >
        {!preview && (
          <Image
            src="/images/chatIcons/svg/upload.svg"
            width={24}
            height={24}
            alt="upload"
          />
        )}

        {preview && (
          <div className="relative flex-shrink-0 rounded-[8px] w-[112px] h-[126px] overflow-hidden">
            {/* skeleton სანამ ატვირთება */}
            {isPending && (
              <div className="z-10 absolute inset-0 flex justify-center items-center bg-black/60 rounded-[8px]">
                <Loader2 className="w-8 h-8 text-white animate-spin" />
              </div>
            )}
            <video
              src={preview}
              controls
              className="rounded-lg w-[112px] h-[126px] object-cover"
            />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleReset();
              }}
              className="top-1 right-1 absolute flex justify-center items-center bg-[#001541D6] rounded-full w-[22px] h-[22px] text-white text-xs cursor-pointer"
            >
              ✕
            </button>
          </div>
        )}

        <input
          ref={fileRef}
          type="file"
          accept="video/*"
          hidden
          disabled={!!preview}
          onChange={(e) => handleFile(e.target.files?.[0])}
        />

        <div className="flex flex-col justify-between w-full h-full">
          {preview && (
            <label
              htmlFor="feedback-title"
              className="flex items-center gap-[10px] pl-[16px] cursor-pointer"
            >
              <Image
                src="/images/chatIcons/svg/upload.svg"
                width={22}
                height={22}
                alt="edit"
              />
              <p className="font-bold text-[#FFFFFFAD]">ფაილის სათაური</p>
            </label>
          )}

          <input
            id="feedback-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onClick={(e) => e.stopPropagation()}
            placeholder={preview ? 'მიუთითე სათაური' : 'ატვირთე ვიდეო'}
            className="bg-transparent pl-[16px] rounded-lg focus:outline-none w-full h-[56px] text-white placeholder:text-white/50"
          />

          {preview && (
            <div className="flex justify-end w-full">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!uploadedVideoUrl || isPending || !title.trim()}
                className="flex justify-center items-center gap-2 bg-[#0866FF] disabled:opacity-50 rounded-[8px] w-[105px] h-[38px] text-[13px] text-white cursor-pointer disabled:cursor-not-allowed"
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> იტვირთება...
                  </>
                ) : (
                  'გაგზავნა'
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeedbackChat;
