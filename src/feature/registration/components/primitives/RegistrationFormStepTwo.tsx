'use client';
import { Button } from '@/components/ui/button';
import ReUsableInput from '@/feature/Authorization/components/primitives/ReusableInput';
import { RegistrationFormStepTwo } from '@/feature/registrationSocials/type';

const RegistrationStepTwo: React.FC<RegistrationFormStepTwo> = ({
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
          label="ემაილი"
          id="email"
          type="email"
          placeholder="შეიყვანე ემაილი"
          register={register}
          errors={errors}
        />
        <ReUsableInput
          label="პაროლი"
          id="password"
          type="password"
          placeholder="შეიყვანე პაროლი"
          register={register}
          errors={errors}
        />
        <ReUsableInput
          label="გაიმეორე პაროლი"
          id="repeatPassword"
          type="password"
          placeholder="გაიმეორე პაროლი"
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

export default RegistrationStepTwo;
