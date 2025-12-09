'use client';
import { Button } from '@/components/ui/button';
import ReUsableInput from '@/feature/Authorization/components/primitives/ReusableInput';
import { RegistrationFormPropsExtended } from '@/feature/registrationSocials/type';
import { useState } from 'react';

const BusinessRegistrationLastStep: React.FC<RegistrationFormPropsExtended> = ({
  register,
  onSubmit,
  errors,
  isPending,
}) => {
  const [phoneValue, setPhoneValue] = useState('');

  const formatPhoneNumber = (value: string) => {
    const digits = value.replace(/\D/g, '');

    const limitedDigits = digits.slice(0, 9);

    const parts = [];
    for (let i = 0; i < limitedDigits.length; i += 3) {
      parts.push(limitedDigits.slice(i, i + 3));
    }

    return parts.join(' ');
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhoneValue(formatted);

    const digitsOnly = formatted.replace(/\s/g, '');
    e.target.value = digitsOnly;
  };

  return (
    <form className="space-y-[22px] mt-[20px]" onSubmit={onSubmit}>
      <div className="space-y-[12px]">
        <div className="flex flex-col gap-[16px] pt-[22px] rounded-[12px] w-full min-h-[94px]">
          <label
            htmlFor="phone"
            className="flex items-center gap-[16px] font-bold text-[18px] cursor-pointer"
          >
            საკონტაქტო ნომერი
          </label>
          <div className="w-full">
            <input
              className="px-[18px] py-[17px] border border-[var(--auth-input-border)] rounded-[8px] focus:outline-[var(--auth-border)] w-full min-h-[56px] font-bold text-[18px]"
              type="tel"
              placeholder="მაგ: 555 555 555"
              id="phone"
              value={phoneValue}
              {...register('phone')}
              onChange={(e) => {
                handlePhoneChange(e);
                register('phone').onChange(e);
              }}
            />
            {errors.phone?.message && (
              <p className="text-[10px] text-red-600">
                {String(errors.phone?.message)}
              </p>
            )}
          </div>
        </div>
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
