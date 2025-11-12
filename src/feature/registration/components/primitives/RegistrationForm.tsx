'use client';
import { Button } from '@/components/ui/button';
import ReUsableInput from '@/feature/Authorization/components/primitives/ReusableInput';
import { RegistrationFormProps } from '@/feature/registrationSocials/type';

interface RegistrationFormPropsExtended extends RegistrationFormProps {
  onSubmit: (e: React.FormEvent) => void;
}

const RegistrationForm: React.FC<RegistrationFormPropsExtended> = ({
  register,
  errors,
  onSubmit,
}) => {
  return (
    <form className="space-y-[22px] mt-[20px]" onSubmit={onSubmit}>
      <div className="space-y-[30px]">
        <ReUsableInput
          label="სახელი"
          id="first_name"
          type="text"
          placeholder="შეიყვანე სახელი"
          register={register}
          errors={errors}
        />
        <ReUsableInput
          label="გვარი"
          id="last_name"
          type="text"
          placeholder="შეიყვანე გვარი"
          register={register}
          errors={errors}
        />
        <ReUsableInput
          label="ზედმეტსახელი"
          id="nickname"
          type="text"
          placeholder="შეიყვანე ზედმეტსახელი"
          register={register}
          errors={errors}
        />
        <ReUsableInput
          label="დაბადების თარიღი"
          id="date_of_birth"
          type="date"
          placeholder="აირჩიე თარიღი"
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

export default RegistrationForm;
