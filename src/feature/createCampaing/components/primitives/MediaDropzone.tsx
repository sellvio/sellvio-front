'use client';

import Image from 'next/image';
import { useDropzone } from 'react-dropzone';
import { MediaPreviewFile } from '../../type';
import {
  campaignDropzoneConfig,
  mapDropzoneErrors,
} from '../../config/campaignDropzoneConfig';

type MediaDropzoneProps = {
  files: MediaPreviewFile[];
  onAddFiles: (files: File[]) => void;
  onErrors: (messages: string[]) => void;
};

const MediaDropzone = ({ files, onAddFiles, onErrors }: MediaDropzoneProps) => {
  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    ...campaignDropzoneConfig,
    noClick: true,
    onDrop: (acceptedFiles, fileRejections) => {
      const errors = mapDropzoneErrors(fileRejections);

      if (errors.length) {
        onErrors(errors);
      }

      if (acceptedFiles.length) {
        onAddFiles(acceptedFiles);
      }
    },
  });

  return (
    <div
      {...getRootProps()}
      className={`group flex flex-col justify-center items-center p-10 border-2 border-dashed rounded-2xl transition-all ${
        isDragActive
          ? 'bg-[#0040e0]/5 border-[#0040e0]'
          : 'bg-[#eff4f9]/30 hover:bg-[#0040e0]/5 border-[#c4c5d9]'
      }`}
    >
      <input {...getInputProps()} />

      <div className="flex justify-center items-center bg-[#0040e0]/10 mb-4 rounded-full w-14 h-14 group-hover:scale-110 transition-transform">
        <Image
          src="/images/svg/gallery.svg"
          width={28}
          height={28}
          alt="ატვირთე ფაილი"
        />
      </div>

      <p className="mb-1 font-bold text-[#171c20] text-center">
        {isDragActive ? 'გაუშვი ფაილები აქ' : 'გადმოათრიეთ ფაილები აქ'}
      </p>

      <p className="mb-6 text-[#434656] text-xs text-center">
        მაქსიმალური ზომა: 50MB (JPG, PNG, MP4)
      </p>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={open}
          className="flex items-center gap-2 bg-[#0040e0] px-6 py-2.5 rounded-full font-bold text-white text-sm hover:scale-105 active:scale-95 transition-all"
        >
          <span className="text-lg leading-none">+</span>
          დამატება
        </button>

        <div className="flex items-center text-[#434656] text-xs">
          არჩეულია: {files.length}
        </div>
      </div>
    </div>
  );
};

export default MediaDropzone;
