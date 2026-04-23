import { FileRejection } from 'react-dropzone';

export const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
export const MAX_FILES = 10;

export const campaignDropzoneConfig = {
  multiple: true,
  maxFiles: MAX_FILES,
  maxSize: MAX_FILE_SIZE,
  accept: {
    'image/jpeg': ['.jpg', '.jpeg'],
    'image/png': ['.png'],
    'video/mp4': ['.mp4'],
  },
};

export const mapDropzoneErrors = (fileRejections: FileRejection[]) => {
  if (!fileRejections.length) return [];

  return fileRejections.flatMap(({ file, errors }) =>
    errors.map((error) => {
      switch (error.code) {
        case 'file-too-large':
          return `${file.name} - ფაილის ზომა არ უნდა აღემატებოდეს 50MB-ს`;
        case 'file-invalid-type':
          return `${file.name} - დაშვებულია მხოლოდ JPG, PNG და MP4`;
        case 'too-many-files':
          return `შეგიძლიათ მაქსიმუმ ${MAX_FILES} ფაილის ატვირთვა`;
        default:
          return `${file.name} - ${error.message}`;
      }
    })
  );
};
