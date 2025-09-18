'use client';
import { Button } from '@/components/ui/button';
import ReUsableInput from '@/feature/authorization/components/primitives/ReusableInput';
import { CompanyFormProps } from '@/feature/registrationSocials/type';

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
      </div>
      <Button variant="auth" type="submit">
        შემდეგი
      </Button>
    </form>
  );
};

export default RegistrationBussinesForm;
