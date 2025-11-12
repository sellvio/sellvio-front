'use client';
import { Button } from '@/components/ui/button';
import ReUsableInput from '@/feature/Authorization/components/primitives/ReusableInput';
import { RegistrationFormStepTwo } from '@/feature/registrationSocials/type';

interface RegistrationFormPropsExtended extends RegistrationFormStepTwo {
  onSubmit: (e: React.FormEvent) => void;
  isLoading?: boolean;
}

const RegistrationStepTwo: React.FC<RegistrationFormPropsExtended> = ({
  register,
  onSubmit,
  errors,
  isLoading = false,
}) => {
  return (
    <form className="space-y-[22px] mt-[20px]" onSubmit={onSubmit}>
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
      <Button variant="auth" type="submit" disabled={isLoading}>
        {isLoading ? 'იტვირთება...' : 'რეგისტრაცია'}
      </Button>
    </form>
  );
};

export default RegistrationStepTwo;
