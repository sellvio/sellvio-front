'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import RegistrationForm from '@/feature/registration/components/primitives/RegistrationForm';
import {
  CreatorStepTwoSchema,
  CreatorStepTwoValues,
  RegistrationSchema,
  RegistrationValues,
} from '@/feature/schema/registrationSchema';
import { useRegistrationType } from '@/feature/components/composites/RegistrationType';
import BusinessCreatorBtnSlider from '@/feature/Authorization/components/primitives/BusinessCreatorBtnSlider';
import RegistrationStepTwo from '../primitives/RegistrationFormStepTwo';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { CreatorRegisterBody } from '@/types/api';
import { registerUser } from '@/lib/api/login';
import { toast } from 'react-toastify';
import Link from 'next/link';
import 'react-datepicker/dist/react-datepicker.css';

const Registration = () => {
  const router = useRouter();
  const { registrationType, handleChangeType } = useRegistrationType('creator');

  const [currentStep, setCurrentStep] = useState<1 | 2>(1);

  const {
    register: registerUserForm,
    handleSubmit: handleSubmitUser,
    control: controlUser,
    formState: { errors: errorsUser },
  } = useForm<RegistrationValues>({
    resolver: zodResolver(RegistrationSchema),
  });

  const {
    register: registerStepTwo,
    handleSubmit: handleSubmitStepTwo,
    formState: { errors: errorsStepTwo },
  } = useForm<CreatorStepTwoValues>({
    resolver: zodResolver(CreatorStepTwoSchema),
  });

  const [stepOneData, setStepOneData] = useState<RegistrationValues | null>(
    null
  );

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: CreatorRegisterBody) => registerUser(payload),
  });

  const onSubmitStepOne = (data: RegistrationValues) => {
    setStepOneData(data);
    setCurrentStep(2);
  };

  const onSubmitStepTwo = async (data: CreatorStepTwoValues) => {
    if (!stepOneData) {
      toast.error('გთხოვთ დაიწყოთ თავიდან');
      setCurrentStep(1);
      return;
    }

    // Send the picked calendar day as UTC midnight so the timezone offset
    // (e.g. UTC+4) doesn't shift the birth date to the previous day
    const dob = new Date(stepOneData.date_of_birth);
    const payload: CreatorRegisterBody = {
      first_name: stepOneData.first_name.trim(),
      last_name: stepOneData.last_name.trim(),
      nickname: stepOneData.nickname.trim(),
      email: data.email,
      password: data.password,
      user_type: 'creator',
      date_of_birth: new Date(
        Date.UTC(dob.getFullYear(), dob.getMonth(), dob.getDate())
      ).toISOString(),
    };

    try {
      await mutateAsync(payload);
      toast.success(
        'რეგისტრაცია წარმატებით დასრულდა. ვერიფიკაციის ბმული გამოგზავნილია ემაილზე'
      );
      // Register returns tokens, so the user is already logged in
      router.replace('/creatorDashboard');
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'რეგისტრაციის შეცდომა'
      );
    }
  };

  return (
    <div className="flex m-auto my-[30px] w-full max-w-[1440px]">
      <div className="bg-[url('/images/authIcons/png/authLeftSidePhoto.png')] bg-cover bg-center w-full max-w-[880px] min-h-[880px]">
        <Link href="/" className="mt-[28px] ml-[28px]">
          <Image
            src="/images/authIcons/svg/sellvioLogoForAuth.svg"
            alt="logo"
            width={195}
            height={51}
          />
        </Link>
      </div>
      <div className="flex flex-col justify-between px-[41px] py-[54px] rounded-[8px] w-full max-w-[563px] min-h-[789px]">
        <div className="space-y-[9px]">
          <p className="font-bold text-[35px]">გაიარეთ რეგისტრაცია</p>
        </div>

        <BusinessCreatorBtnSlider
          registrationType={registrationType}
          setRegistrationType={handleChangeType}
        />

        <div
          onClick={() => setCurrentStep(1)}
          className="flex items-center m-auto mt-[20px] w-full max-w-[273px]"
        >
          <div
            className={`flex justify-center items-center border-[3px] rounded-full w-[48px] h-[48px] shrink-0 ${
              currentStep === 1
                ? 'border-[#3012B3]'
                : 'border-[#3012B3] bg-[#3012B3] cursor-pointer'
            }`}
          >
            <p
              className={`font-bold text-[20px] ${
                currentStep === 1 ? 'text-[#3012B3]' : 'text-white'
              }`}
            >
              {currentStep === 1 ? (
                1
              ) : (
                <Image
                  src="/images/authIcons/svg/arrow-back.svg"
                  alt="logo"
                  width={30}
                  height={30}
                />
              )}
            </p>
          </div>
          <div
            className={`w-full h-[2px] ${
              currentStep === 2 ? 'bg-[#3012B3]' : 'bg-[#0000001A]'
            }`}
          ></div>
          <div
            className={`flex justify-center items-center border-[3px] rounded-full w-[48px] h-[48px] shrink-0 ${
              currentStep === 2
                ? 'border-[#3012B3] bg-blue-50'
                : 'border-[#0000001A]'
            }`}
          >
            <p
              className={`font-bold text-[20px] ${
                currentStep === 2 ? 'text-[#3012B3]' : 'text-[#000000AD]'
              }`}
            >
              2
            </p>
          </div>
        </div>

        {currentStep === 1 ? (
          <RegistrationForm
            register={registerUserForm}
            errors={errorsUser}
            control={controlUser}
            onSubmit={handleSubmitUser(onSubmitStepOne)}
          />
        ) : (
          <RegistrationStepTwo
            register={registerStepTwo}
            errors={errorsStepTwo}
            isPending={isPending}
            onSubmit={handleSubmitStepTwo(onSubmitStepTwo)}
          />
        )}
        <div className="flex justify-center gap-[6px] mt-[15px] w-full">
          <p className="font-bold text-[#000000D4] text-[18px]">
            თუ გაქვთ ექაუნი გაიარეთ
          </p>
          <Link
            href={'/login'}
            className="font-bold text-[#583CCF] text-[18px] cursor-pointer"
          >
            ავტორიზაცია
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Registration;
