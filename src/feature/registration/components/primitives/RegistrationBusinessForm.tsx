'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import ReUsableInput from '@/feature/Authorization/components/primitives/ReusableInput';
import TagInput from '@/feature/registrationSocials/components/primitives/TagInput';
import { RegistrationBusinessFormProps } from '@/feature/registrationSocials/type';

const RegistrationBusinessForm: React.FC<RegistrationBusinessFormProps> = ({
  onSubmit,
  register,
  errors,
}) => {
  const [preview, setPreview] = useState<string | null>(null);

  return (
    <form onSubmit={onSubmit} className="space-y-[22px] mt-[39px]">
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
