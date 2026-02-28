'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { UploadVideoApi } from '../../api/chatApi';
import { useSocketStore } from '@/feature/common/stores/useSocketStore';
import { useChatStore } from '@/feature/common/stores/useChatStore';

const SERVER_ID = 20;
const CHANNEL_ID = 94;

const FeedbackChat = () => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedVideoUrl, setUploadedVideoUrl] = useState<string | null>(null);

  const submitFeedback = useSocketStore((s) => s.submitFeedback);
  const selectedChannelId = useChatStore((s) => s.selectedChannelId);

  const { mutate, isPending } = useMutation({
    mutationFn: (file: File) =>
      UploadVideoApi({
        file,
        serverId: String(SERVER_ID),
        channelId: String(CHANNEL_ID),
      }),
    onSuccess: (res) => {
      if (res?.data?.videoUrl) setUploadedVideoUrl(res.data.videoUrl);
    },
  });

  const handleFile = (file: File) => {
    if (preview || !file.type.startsWith('video/')) return;
    setPreview(URL.createObjectURL(file));
    mutate(file);
  };

  const handleRemove = () => {
    setPreview(null);
    setTitle('');
    setUploadedVideoUrl(null);
    if (fileRef.current) fileRef.current.value = '';
  };

  const handleSubmit = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!uploadedVideoUrl || !title.trim() || !selectedChannelId) return;
    submitFeedback(selectedChannelId, title.trim(), uploadedVideoUrl);
    handleRemove();
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
          if (!preview) handleFile(e.dataTransfer.files?.[0]);
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
            <video
              src={preview}
              controls
              className="rounded-lg w-[112px] h-[126px] object-cover"
            />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleRemove();
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
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleFile(f);
          }}
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
                className="bg-[#0866FF] disabled:opacity-50 rounded-[8px] w-[105px] h-[38px] text-[13px] text-white cursor-pointer disabled:cursor-not-allowed"
              >
                {isPending ? 'იტვირთება...' : 'გაგზავნა'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeedbackChat;
