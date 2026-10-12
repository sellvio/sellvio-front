'use client';
import { Button } from '@/components/ui/button';
import ReUsableInput from '@/feature/Authorization/components/primitives/ReusableInput';
import { RegistrationStepBusinesValuess } from '@/feature/schema/registrationSchema';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

type RegistrationBusinessStepTwoFormProps = {
  register: UseFormRegister<RegistrationStepBusinesValuess>;
  errors: FieldErrors<RegistrationStepBusinesValuess>;
};

const RegistrationBusinessStepTwoForm: React.FC<
  RegistrationBusinessStepTwoFormProps
> = ({ register, errors }) => {
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
          id="repeatPassword"
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

export default RegistrationBusinessStepTwoForm;
