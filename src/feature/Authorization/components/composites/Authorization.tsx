'use client';
import Image from 'next/image';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { FormSchema, FormValues } from '../../../schema/authorisationSchema';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import ReUsableInput from '../primitives/ReusableInput';
import RegistrationAs from '@/feature/components/composites/RegistrationAs';
import BusinessCreatorBtnSlider from '../primitives/BusinessCreatorBtnSlider';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

type RegistrationType = 'bussines' | 'creator';

const Authorization = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const typeFromUrl =
    (searchParams.get('type') as RegistrationType) || 'creator';

  const [registrationType, setRegistrationType] =
    useState<RegistrationType>(typeFromUrl);

  useEffect(() => {
    setRegistrationType(typeFromUrl);
  }, [typeFromUrl]);

  const handleChangeType = (type: RegistrationType) => {
    setRegistrationType(type);
    router.push(`/registration?type=${type}`);
  };

  const {
    register,
    // handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
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
        <div className="space-y-[9px]">
          <p className="font-bold text-[35px]">დაბრუნებას გილოცავ</p>
          <p className="text-[18px] text-[var(--auth-text-dark)]">
            შეარჩიე შენი პროფილის სტილი
          </p>
        </div>
        <BusinessCreatorBtnSlider
          registrationType={registrationType}
          setRegistrationType={handleChangeType}
        />
        <form className="space-y-[22px] mt-[39px]">
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
              type="text"
              placeholder="შეიყვანე პაროლი"
              register={register}
              errors={errors}
            />
          </div>
          <Button variant="auth">მონაწილეობის მიღება</Button>
        </form>
        <RegistrationAs
          accountInfo={'არ გაქვს ექაუნთი?'}
          bussines={'დარეგისტრირდი როგორც ბიზნესი'}
          creator={'დარეგისტრირდი როგორც შემქმნელი'}
          creatorAuth={'registration'}
          businessAuth={'registration'}
        />
      </div>
    </div>
  );
};

export default Authorization;
