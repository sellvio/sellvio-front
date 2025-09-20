'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import Link from 'next/link';
import RegistrationBussinesForm from '../primitives/RegistrationBussinesForm';
import RegistrationAs from '@/feature/components/composites/RegistrationAs';
import BussinesCreatorBtnSlider from '@/feature/Authorization/components/primitives/BusinessCreatorBtnSlider';
import {
  UploadImageFormValues,
  uploadImageSchema,
} from '@/feature/schema/uploadImageSchema';
import RegistrationForm from '@/feature/registration/components/primitives/RegistrationForm';
import {
  RegistrationSchema,
  RegistrationValues,
} from '@/feature/schema/registrationSchema';
import { useState } from 'react';

const Registration = () => {
  const [registrationType, setRegistrationType] = useState<
    'bussines' | 'creator'
  >('creator');

  const {
    register: registerUser,
    formState: { errors: errorsUser },
  } = useForm<RegistrationValues>({
    resolver: zodResolver(RegistrationSchema),
  });

  const {
    register: registerBussines,
    setValue: setValueBussines,
    formState: { errors: errorsBussines },
  } = useForm<UploadImageFormValues>({
    resolver: zodResolver(uploadImageSchema),
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
        <BussinesCreatorBtnSlider
          registrationType={registrationType}
          setRegistrationType={setRegistrationType}
        />
        {registrationType === 'creator' ? (
          <RegistrationForm register={registerUser} errors={errorsUser} />
        ) : (
          <RegistrationBussinesForm
            register={registerBussines}
            setValue={setValueBussines}
            errors={errorsBussines}
          />
        )}

        <RegistrationAs
          accountInfo={'არ გაქვს ექაუნთი?'}
          bussines={'დარეგისტრირდი როგორც ბიზნესი'}
          creator={'დარეგისტრირდი როგორც შემქმნელი'}
        />
      </div>
    </div>
  );
};

export default Registration;
