'use client';
import { Button } from '@/components/ui/button';
import ReUsableInput from '@/feature/authorization/components/primitives/ReusableInput';
import TagInput from '@/feature/registrationSocials/components/primitives/TagInput';
import { CompanyFormProps } from '@/feature/registrationSocials/type';
import Image from 'next/image';

const RegistrationBussinesForm: React.FC<CompanyFormProps> = ({
  register,
  errors,
}) => {
  return (
    <form
      className="space-y-[22px] mt-[39px]"
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
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
          <button className="flex justify-center items-center gap-[10px] p-[15px] border border-[#E3E8EF] rounded-[8px] w-full max-w-[217px] min-h-[100px] cursor-pointer">
            <Image src="/upload.svg" alt="upload" width={40} height={40} />
            <p className="w-full max-w-[91px] min-h-[44px] font-bold text-[#000000D4] text-[18px] text-center">
              ატვირთე ლოგო
            </p>
          </button>
        </div>
        <div className="space-y-[16px]">
          <p className="font-bold text-[18px] cursor-default">
            ინდუსტრიის ტაგები:
          </p>
          <TagInput name="tags" register={register} errors={errors} />
        </div>
      </div>
      <Button variant="auth" type="submit">
        შემდეგი
      </Button>
    </form>
  );
};

export default RegistrationBussinesForm;
