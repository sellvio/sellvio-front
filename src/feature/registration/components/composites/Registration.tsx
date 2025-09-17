'use client';
import { Button } from '@/components/ui/button';
import BussinesCreatorBtnSlider from '@/feature/authorization/components/primitives/BussinesCreatorBtnSlider';
import ReUsableInput from '@/feature/authorization/components/primitives/ReusableInput';
import {
  RegistrationSchema,
  RegistrationValues,
} from '@/feature/schema/registrationSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

const Registration = () => {
  const {
    register,
    // handleSubmit
    formState: { errors },
  } = useForm<RegistrationValues>({
    resolver: zodResolver(RegistrationSchema),
  });
  return (
    <div className="space-y-[30px] m-auto w-full max-w-[621px]">
      <div className="flex flex-col items-center gap-[8px]">
        <Link href="/">
          <Image src="/Sellvio.svg" width={150} height={46} alt="logo" />
        </Link>
        <p className="font-bold text-[18px] text-[var(--auth-text-dark)]">
          შედით პროფილზე
        </p>
      </div>
      <div className="px-[32px] py-[26px] border border-[var(--auth-border)] rounded-[8px] w-full max-w-[621px] min-h-[653px]">
        <div className="flex flex-col items-center space-y-[9px]">
          <p className="font-bold text-[35px] text-[var(--auth-text-dark)]">
            გაიარეთ რეგისტრაცია
          </p>
          <p className="font-bold text-[18px] text-[var(--auth-text-dark)]">
            შეარჩიე შენი პროფილის სტილი
          </p>
        </div>
        <BussinesCreatorBtnSlider />
        <form className="space-y-[22px] mt-[39px]">
          <div className="space-y-[30px]">
            <ReUsableInput
              label="სახელი"
              id="firstName"
              type="text"
              placeholder="შეიყვანე სახელი"
              register={register}
              errors={errors}
            />
            <ReUsableInput
              label="გვარი"
              id="lastName"
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
              id="birthDate"
              type="date"
              placeholder="აირჩიე თარიღი"
              register={register}
              errors={errors}
            />
          </div>
          <Button variant="auth">შემდეგი</Button>
        </form>
        <div>
          <p className="mt-[33px] font-bold text-[18px] text-[var(--auth-text-dark)] text-center">
            გაქვს ექაუნთი?
            <Link href="/auth/?type=bussines">
              <span className="ml-[4px] text-[#583CCF]">
                შედით როგორც ბიზნესი
              </span>
            </Link>
            <span className="mx-[4px]">ან</span>
            <Link href="/auth/?type=creator">
              <span className="text-[#583CCF]">შედით როგორც შემქმნელი</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registration;
