'use client';

import Image from 'next/image';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { FieldErrors, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { CreateCampaignFormInput } from '../schema/createCampaignSchema';
import MediaDropzone from './MediaDropzone';
import SelectedMediaList from './SelectedMediaList';
import {
  addPreviewToFiles,
  mergeUniqueFiles,
  revokeFilePreviews,
} from '../../utils/mediaFiles';
import { MediaPreviewFile } from '../../type';
import {
  MAX_FILE_SIZE,
  MAX_FILES,
} from '../../config/campaignDropzoneConfig';

type ExtraMediaProps = {
  watch: UseFormWatch<CreateCampaignFormInput>;
  setValue: UseFormSetValue<CreateCampaignFormInput>;
  errors: FieldErrors<CreateCampaignFormInput>;
};

const COVER_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

const ExtraMedia = ({ watch, setValue, errors }: ExtraMediaProps) => {
  const watchedFiles = watch('asset_files');
  const formFiles = useMemo(() => watchedFiles ?? [], [watchedFiles]);
  const coverImage = watch('campaign_image_url') ?? null;
  const [dropzoneErrors, setDropzoneErrors] = useState<string[]>([]);
  const [coverError, setCoverError] = useState('');

  // Build preview wrappers without mutating the File objects stored in the
  // form, so revoking old previews never breaks the current ones.
  const previewFiles = useMemo<MediaPreviewFile[]>(() => {
    return addPreviewToFiles(
      formFiles.map(
        (file) =>
          new File([file], file.name, {
            type: file.type,
            lastModified: file.lastModified,
          })
      )
    );
  }, [formFiles]);

  useEffect(() => {
    return () => {
      revokeFilePreviews(previewFiles);
    };
  }, [previewFiles]);

  const coverPreview = useMemo(
    () => (coverImage ? URL.createObjectURL(coverImage) : null),
    [coverImage]
  );

  useEffect(() => {
    return () => {
      if (coverPreview) URL.revokeObjectURL(coverPreview);
    };
  }, [coverPreview]);

  const handleAddFiles = (acceptedFiles: File[]) => {
    setDropzoneErrors([]);

    const merged = mergeUniqueFiles(formFiles, acceptedFiles);
    const nextFiles = merged.slice(0, MAX_FILES);

    if (merged.length > MAX_FILES) {
      setDropzoneErrors([`შეგიძლიათ მაქსიმუმ ${MAX_FILES} ფაილის ატვირთვა`]);
    }

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

  const handleCoverChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;

    if (!COVER_IMAGE_TYPES.includes(file.type)) {
      setCoverError('დაშვებულია მხოლოდ JPG, PNG და WEBP სურათები');
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setCoverError('ფაილის ზომა არ უნდა აღემატებოდეს 50MB-ს');
      return;
    }

    setCoverError('');
    setValue('campaign_image_url', file, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const handleRemoveCover = () => {
    setCoverError('');
    setValue('campaign_image_url', null, {
      shouldValidate: true,
      shouldDirty: true,
    });
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
        <div className="flex flex-wrap items-center gap-4 bg-[#eff4f9] p-6 rounded-xl">
          <div className="flex justify-center items-center bg-white rounded-xl w-28 h-20 overflow-hidden shrink-0">
            {coverPreview ? (
              <img
                src={coverPreview}
                alt="კამპანიის ქავერი"
                className="w-full h-full object-cover"
              />
            ) : (
              <Image
                src="/images/svg/gallery.svg"
                width={24}
                height={24}
                alt="ქავერი"
              />
            )}
          </div>
          <div className="flex-1 min-w-[200px]">
            <p className="font-bold text-[#171c20]">კამპანიის ქავერ ფოტო</p>
            <p className="text-[#434656] text-sm">
              გამოჩნდება კამპანიის ბარათზე (JPG, PNG, WEBP)
            </p>
          </div>
          <div className="flex gap-3">
            <label className="bg-[#0040e0] px-6 py-2.5 rounded-full font-bold text-white text-sm hover:scale-105 active:scale-95 transition-all cursor-pointer">
              {coverImage ? 'შეცვლა' : 'არჩევა'}
              <input
                type="file"
                accept={COVER_IMAGE_TYPES.join(',')}
                className="hidden"
                onChange={handleCoverChange}
              />
            </label>
            {coverImage && (
              <button
                type="button"
                onClick={handleRemoveCover}
                className="bg-[#e9eef3] hover:bg-red-50 px-6 py-2.5 rounded-full font-bold text-[#434656] hover:text-red-500 text-sm transition-all"
              >
                წაშლა
              </button>
            )}
          </div>
          {coverError && (
            <p className="w-full text-red-500 text-sm">{coverError}</p>
          )}
        </div>

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
