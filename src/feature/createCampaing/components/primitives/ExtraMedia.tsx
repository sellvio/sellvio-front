'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { FieldErrors, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { CreateCampaignFormOutput } from '../schema/createCampaignSchema';
import MediaDropzone from './MediaDropzone';
import SelectedMediaList from './SelectedMediaList';
import {
  addPreviewToFiles,
  mergeUniqueFiles,
  revokeFilePreviews,
} from '../../utils/mediaFiles';
import { MediaPreviewFile } from '../../type';

type ExtraMediaProps = {
  watch: UseFormWatch<CreateCampaignFormOutput>;
  setValue: UseFormSetValue<CreateCampaignFormOutput>;
  errors: FieldErrors<CreateCampaignFormOutput>;
};

const ExtraMedia = ({ watch, setValue, errors }: ExtraMediaProps) => {
  const formFiles = watch('asset_files') || [];
  const [dropzoneErrors, setDropzoneErrors] = useState<string[]>([]);

  const previewFiles = useMemo<MediaPreviewFile[]>(() => {
    return addPreviewToFiles(formFiles);
  }, [formFiles]);

  useEffect(() => {
    return () => {
      revokeFilePreviews(previewFiles);
    };
  }, [previewFiles]);

  const handleAddFiles = (acceptedFiles: File[]) => {
    setDropzoneErrors([]);

    const nextFiles = mergeUniqueFiles(
      addPreviewToFiles(formFiles),
      addPreviewToFiles(acceptedFiles)
    ).map((file) => {
      const cleanFile = new File([file], file.name, {
        type: file.type,
        lastModified: file.lastModified,
      });

      return cleanFile;
    });

    setValue('asset_files', nextFiles, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const handleRemoveFile = (index: number) => {
    const nextFiles = formFiles.filter((_, fileIndex) => fileIndex !== index);

    setValue('asset_files', nextFiles, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const handleClearFiles = () => {
    setValue('asset_files', [], {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
    setDropzoneErrors([]);
  };

  return (
    <section className="bg-white shadow-[0px_12px_32px_-4px_rgba(0,19,86,0.06)] p-10 rounded-[1.5rem]">
      <div className="flex items-center gap-3 mb-1">
        <div className="flex justify-center items-center bg-[#0040e0]/10 rounded-xl w-9 h-9 shrink-0">
          <Image
            src="/images/svg/upload.svg"
            width={20}
            height={20}
            alt="logo"
          />
        </div>

        <h2 className="font-bold text-[#171c20] text-2xl">
          ატვირთეთ მედიის აქტივები
        </h2>
      </div>

      <p className="mb-8 ml-12 text-[#434656] text-sm">
        იმ შემთხვევაში, თუ კონტენტის შექმნისთვის საჭიროა თქვენი ფოტოებისა და
        ვიდეოების გამოყენება, გთხოვთ ატვირთოთ, რათა შეძლონ გამოყენება
      </p>

      <div className="space-y-6">
        <MediaDropzone
          files={previewFiles}
          onAddFiles={handleAddFiles}
          onErrors={setDropzoneErrors}
        />

        {!!dropzoneErrors.length && (
          <div className="space-y-2">
            {dropzoneErrors.map((message, index) => (
              <p key={`${message}-${index}`} className="text-red-500 text-sm">
                {message}
              </p>
            ))}
          </div>
        )}

        {errors.asset_files?.message && (
          <p className="text-red-500 text-sm">
            {String(errors.asset_files.message)}
          </p>
        )}

        <SelectedMediaList
          files={previewFiles}
          onRemove={handleRemoveFile}
          onClear={handleClearFiles}
        />
      </div>
    </section>
  );
};

export default ExtraMedia;
