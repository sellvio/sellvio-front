'use client';
import { Button } from '@/components/ui/button';
import ReUsableInput from '@/feature/Authorization/components/primitives/ReusableInput';
import { RegistrationFormPropsExtended } from '@/feature/registrationSocials/type';

const BusinessRegistrationLastStep: React.FC<RegistrationFormPropsExtended> = ({
  register,
  onSubmit,
  errors,
  isPending,
}) => {
  return (
    <form className="space-y-[22px] mt-[20px]" onSubmit={onSubmit}>
      <div className="space-y-[12px]">
        <ReUsableInput
          label="საკონტაქტო ნომერი"
          id="phone"
          type="tel"
          placeholder="შეიყვანე საკონტაქტო ნომერი"
          register={register}
          errors={errors}
        />
        <ReUsableInput
          label="ემაილი"
          id="email"
          type="email"
          placeholder="შეიყვანე ემაილი"
          register={register}
          errors={errors}
        />
        <ReUsableInput
          label="კომპანიის Nickname"
          id="company_nickName"
          type="text"
          placeholder="შეიყვანე კომპანიის Nickname"
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
      <Button variant="auth" type="submit" disabled={isPending}>
        {isPending ? 'იგზავნება...' : 'რეგისტრაცია'}
      </Button>
    </form>
  );
};

export default BusinessRegistrationLastStep;
