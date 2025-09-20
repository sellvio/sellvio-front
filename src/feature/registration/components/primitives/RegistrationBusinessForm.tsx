'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import ReUsableInput from '@/feature/Authorization/components/primitives/ReusableInput';
import TagInput from '@/feature/registrationSocials/components/primitives/TagInput';

import Image from 'next/image';

import { RegistrationBusinessFormProps } from '@/feature/registrationSocials/type';

const RegistrationBusinessForm: React.FC<RegistrationBusinessFormProps> = ({
  register,
  setValue,
  errors,
}) => {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setValue('logo', file, { shouldValidate: true });
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <form className="space-y-[22px] mt-[39px]">
      <div className="space-y-[30px]">
        <ReUsableInput
          label="კომპანიის სამართლებრივი სახელი"
          id="legalName"
          type="text"
          placeholder="შეიყვანე სახელი"
          register={register}
          errors={errors}
        />

        <ReUsableInput
          label="კომპანიის სამართლებრივი სტატუსი"
          id="legalStatus"
          type="text"
          placeholder="შეიყვანე სტატუსი"
          register={register}
          errors={errors}
        />

        <ReUsableInput
          label="კომპანიის ვებსაიტი"
          id="website"
          type="url"
          placeholder="შეიყვანე საიტი"
          register={register}
          errors={errors}
        />

        <div className="space-y-[16px]">
          <p className="font-bold text-[18px]">ატვირთე კომპანიის ლოგო</p>

          <input
            type="file"
            accept="image/*"
            className="hidden"
            id="logoUpload"
            onChange={handleFileChange}
          />

          <label
            htmlFor="logoUpload"
            className="flex justify-center items-center gap-[10px] p-[15px] border border-[var(--auth-input-border)] rounded-[8px] w-full max-w-[217px] min-h-[100px] cursor-pointer"
          >
            <Image src="/upload.svg" alt="upload" width={40} height={40} />
            <p className="w-full max-w-[91px] min-h-[44px] font-bold text-[18px] text-[var(--auth-text-dark)] text-center">
              ატვირთე ლოგო
            </p>
          </label>

          {preview && (
            <div className="mt-2">
              <Image
                src={preview}
                alt="preview"
                width={96}
                height={96}
                className="border rounded-md object-cover"
              />
            </div>
          )}

          {errors.logo && (
            <p className="text-red-500 text-sm">
              {errors.logo.message as string}
            </p>
          )}
        </div>

        <div className="space-y-[16px]">
          <p className="font-bold text-[18px] cursor-default">
            ინდუსტრიის ტაგები:
          </p>
          <TagInput name="tags" register={register} errors={errors} />
          {errors.tags && (
            <p className="text-red-500 text-sm">
              {errors.tags.message as string}
            </p>
          )}
        </div>
      </div>

      <Button variant="auth" type="submit">
        შემდეგი
      </Button>
    </form>
  );
};

export default RegistrationBusinessForm;
