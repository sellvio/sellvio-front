import { z } from 'zod';

const MAX_FILE_SIZE = 2 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/jpg',
  'image/svg+xml',
];

export const uploadImageSchema = z.object({
  legalName: z.string().min(1, 'სახელი სავალდებულოა'),
  legalStatus: z.string().min(1, 'სტატუსი სავალდებულოა'),
  website: z.string().url('საიტი უნდა იყოს სწორი URL'),
  logo: z
    .instanceof(File)
    .refine(
      (file) => file.size <= MAX_FILE_SIZE,
      'ფაილი არ უნდა აღემატებოდეს 2MB-ს'
    )
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      'მხოლოდ .jpg, .jpeg, .png, .svg ფორმატებია ნებადართული'
    ),
  tags: z.array(z.string()).min(1, 'მინიმუმ 1 ტეგი აუცილებელია'),
});

export type UploadImageFormValues = z.infer<typeof uploadImageSchema>;
