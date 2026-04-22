'use client';

import Image from 'next/image';
import { MediaPreviewFile } from '../../type';
import {
  formatFileSize,
  isImageFile,
  isVideoFile,
} from '../../utils/mediaFiles';

type SelectedMediaListProps = {
  files: MediaPreviewFile[];
  onRemove: (index: number) => void;
  onClear: () => void;
};

const SelectedMediaList = ({
  files,
  onRemove,
  onClear,
}: SelectedMediaListProps) => {
  if (!files.length) return null;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="font-bold text-[#171c20] text-sm">ატვირთული ფაილები</p>

        <button
          type="button"
          onClick={onClear}
          className="flex items-center gap-2 bg-[#e9eef3] hover:bg-red-50 px-6 py-2.5 rounded-full font-bold text-[#434656] hover:text-red-500 text-sm active:scale-95 transition-all"
        >
          წაშლა
        </button>
      </div>

      <div className="gap-4 grid md:grid-cols-2">
        {files.map((file, index) => (
          <div
            key={`${file.name}-${file.size}-${file.lastModified}`}
            className="flex items-center gap-4 bg-[#eff4f9] p-4 rounded-2xl"
          >
            <div className="flex justify-center items-center bg-white rounded-xl w-20 h-20 overflow-hidden shrink-0">
              {isImageFile(file) && file.preview ? (
                <img
                  src={file.preview}
                  alt={file.name}
                  className="w-full h-full object-cover"
                />
              ) : isVideoFile(file) && file.preview ? (
                <video
                  src={file.preview}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Image
                  src="/images/svg/upload.svg"
                  width={22}
                  height={22}
                  alt="file"
                />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <p className="font-semibold text-[#171c20] text-sm truncate">
                {file.name}
              </p>
              <p className="mt-1 text-[#434656] text-xs">
                {formatFileSize(file.size)}
              </p>
              <p className="mt-1 text-[#434656] text-xs uppercase">
                {file.type || 'unknown'}
              </p>
            </div>

            <button
              type="button"
              onClick={() => onRemove(index)}
              className="hover:opacity-70 text-red-500 text-sm transition-opacity"
            >
              წაშლა
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectedMediaList;
