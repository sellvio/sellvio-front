'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import Link from 'next/link';
import RegistrationAs from '@/feature/components/composites/RegistrationAs';
import { RegistrationStepBusinessValues } from '@/feature/registrationSocials/type';
import RegistrationBusinessForm from '@/feature/registration/components/primitives/RegistrationBusinessForm';
import { RegistrationStepBusinessSchema } from '@/feature/schema/registrationSchema';

const RegistrationBusinessStepTwo = () => {
  const {
    register,
    formState: { errors },
  } = useForm<RegistrationStepBusinessValues>({
    resolver: zodResolver(RegistrationStepBusinessSchema),
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
        <RegistrationBusinessForm register={register} errors={errors} />
        <RegistrationAs
          accountInfo={'გაქვს ექაუნთი?'}
          business={'შედით როგორც ბიზნესი'}
          creator={'შედით როგორც შემქმნელი'}
          creatorAuth={'login'}
          businessAuth={'login'}
        />
      </div>
    </div>
  );
};

export default RegistrationBusinessStepTwo;
