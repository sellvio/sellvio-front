'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { UploadVideoApi } from '../../api/chatApi';

const FeedbackChat = () => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [description, setDescription] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const { mutate, data } = useMutation({
    mutationFn: UploadVideoApi,
  });

  const handleFile = (file: File) => {
    if (preview) return;
    setPreview(URL.createObjectURL(file));
    mutate(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    handleFile(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    if (preview) return;

    const file = e.dataTransfer.files?.[0];
    if (!file || !file.type.startsWith('video/')) return;

    handleFile(file);
  };

  const handleRemove = () => {
    setPreview(null);
    setDescription('');
    if (fileRef.current) {
      fileRef.current.value = '';
    }
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
        onDrop={handleDrop}
        className={`relative flex bg-[#FFFFFF36] ${
          preview ? 'p-[20px] items-start' : 'items-center px-[20px]'
        } border-2 ${
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
          <div className="relative rounded-[8px] w-[112px] h-[126px] overflow-hidden">
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
          onChange={handleChange}
        />

        <div className="flex flex-col justify-between w-full h-full">
          <div className="flex flex-col w-full">
            {preview && (
              <label
                htmlFor="description"
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
              id="description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={preview ? 'მიუთითე აღწერა' : 'ატვირთე ვიდეო'}
              className="pl-[16px] rounded-lg focus:outline-none w-full h-[56px] text-white placeholder:text-white/50"
            />
          </div>

          {preview && (
            <div className="flex justify-end w-full">
              <button className="bg-[#0866FF] rounded-[8px] w-[105px] h-[38px] text-[13px] text-white cursor-pointer">
                გაგზავნა
              </button>
            </div>
          )}
        </div>
      </div>

      {data?.success && (
        <p className="text-white text-xs break-all">{data.data.videoUrl}</p>
      )}
    </div>
  );
};

export default FeedbackChat;
