'use client';
import { Button } from '@/components/ui/button';
import ReUsableInput from '@/feature/Authorization/components/primitives/ReusableInput';
import TagInput from '@/feature/registration/components/primitives/TagInput';
import { CompanyFormProps } from '@/feature/registrationSocials/type';

const RegistrationBusinessForm: React.FC<CompanyFormProps> = ({
  onSubmit,
  register,
  errors,
  setValue,
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-[22px] mt-[39px]">
      <div className="space-y-[30px]">
        <ReUsableInput
          label="კომპანიის სამართლებრივი სახელი"
          id="company_name"
          type="text"
          placeholder="შეიყვანე სახელი"
          register={register}
          errors={errors}
        />

        <ReUsableInput
          label="კომპანიის სამართლებრივი სტატუსი"
          id="legal_status"
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
          <TagInput
            name="business_tags"
            register={register}
            errors={errors}
            setValue={setValue}
          />
          {errors.business_tags && (
            <p className="text-red-500 text-sm">
              {errors.business_tags.message as string}
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
