import { MediaPreviewFile } from '../type';

export const addPreviewToFiles = (files: File[]): MediaPreviewFile[] => {
  return files.map((file) =>
    Object.assign(file, {
      preview: URL.createObjectURL(file),
    })
  );
};

export const mergeUniqueFiles = (
  currentFiles: MediaPreviewFile[],
  newFiles: MediaPreviewFile[]
): MediaPreviewFile[] => {
  const map = new Map<string, MediaPreviewFile>();

  [...currentFiles, ...newFiles].forEach((file) => {
    const key = `${file.name}-${file.size}-${file.lastModified}`;
    if (!map.has(key)) {
      map.set(key, file);
    }
  });

  return Array.from(map.values());
};

export const revokeFilePreviews = (files: MediaPreviewFile[]) => {
  files.forEach((file) => {
    if (file.preview) {
      URL.revokeObjectURL(file.preview);
    }
  });
};

export const formatFileSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

export const isImageFile = (file: File) => file.type.startsWith('image/');
export const isVideoFile = (file: File) => file.type.startsWith('video/');
