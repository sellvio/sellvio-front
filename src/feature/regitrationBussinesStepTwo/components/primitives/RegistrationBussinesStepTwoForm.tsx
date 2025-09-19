'use client';
import { Button } from '@/components/ui/button';
import ReUsableInput from '@/feature/authorization/components/primitives/ReusableInput';
import { RegistrationStepTwoValues } from '@/feature/registrationSocials/type';

const RegistrationBussinesStepTwoForm: React.FC<RegistrationStepTwoValues> = ({
  register,
  errors,
}) => {
  return (
    <form className="space-y-[22px] mt-[39px]">
      <div className="space-y-[30px]">
        <ReUsableInput
          label="მარეგისტრირებელი პირის საკონტაქტო ნომერი"
          id="contactNumber"
          type="text"
          placeholder="შეიყვანე ნომერი"
          register={register}
          errors={errors}
        />
        <ReUsableInput
          label="მარეგისტრირებელი პირის Email"
          id="email"
          type="email"
          placeholder="შეიყვანე Email-ი"
          register={register}
          errors={errors}
        />

        <ReUsableInput
          label="კომპანიის Nickname"
          id="nickname"
          type="text"
          placeholder="შეიყვანე Nickname"
          register={register}
          errors={errors}
        />

        <ReUsableInput
          label="პაროლი"
          id="password"
          type="password"
          placeholder="შეიყვანეთ პაროლი"
          register={register}
          errors={errors}
        />

        <ReUsableInput
          label="გაიმეორე პაროლი"
          id="confirmPassword"
          type="password"
          placeholder="გაიმეორეთ პაროლი"
          register={register}
          errors={errors}
        />
      </div>
      <Button variant="auth">შემდეგი</Button>
    </form>
  );
};

export default RegistrationBussinesStepTwoForm;
