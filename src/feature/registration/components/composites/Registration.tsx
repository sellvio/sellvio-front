'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import Link from 'next/link';
import RegistrationForm from '@/feature/registration/components/primitives/RegistrationForm';
import RegistrationAs from '@/feature/components/composites/RegistrationAs';
import {
  RegistrationSchema,
  RegistrationValues,
} from '@/feature/schema/registrationSchema';
import {
  UploadImageFormValues,
  uploadImageSchema,
} from '@/feature/schema/uploadImageSchema';
import { useRegistrationType } from '@/feature/components/composites/RegistrationType';
import RegistrationBusinessForm from '../primitives/RegistrationBusinessForm';
import BusinessCreatorBtnSlider from '@/feature/Authorization/components/primitives/BusinessCreatorBtnSlider';

const Registration = () => {
  const { registrationType, handleChangeType } =
    useRegistrationType('/registration');

  const {
    register: registerUser,
    formState: { errors: errorsUser },
  } = useForm<RegistrationValues>({
    resolver: zodResolver(RegistrationSchema),
  });

  const {
    register: registerBusiness,
    setValue: setValueBusiness,
    formState: { errors: errorsBusiness },
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

        <BusinessCreatorBtnSlider
          registrationType={registrationType}
          setRegistrationType={handleChangeType}
        />

        {registrationType === 'creator' ? (
          <RegistrationForm register={registerUser} errors={errorsUser} />
        ) : (
          <RegistrationBusinessForm
            register={registerBusiness}
            setValue={setValueBusiness}
            errors={errorsBusiness}
          />
        )}

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

export default Registration;
