'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import RegistrationForm from '@/feature/registration/components/primitives/RegistrationForm';
import {
  RegistrationSchema,
  RegistrationValues,
} from '@/feature/schema/registrationSchema';
import { useRegistrationType } from '@/feature/components/composites/RegistrationType';
import BusinessCreatorBtnSlider from '@/feature/Authorization/components/primitives/BusinessCreatorBtnSlider';
import { FormSchema, FormValues } from '@/feature/schema/authorisationSchema';
import RegistrationStepTwo from '../primitives/RegistrationFormStepTwo';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { CreatorRegisterBody } from '@/types/api';
import { registerUser } from '@/lib/api/login';

const CombinedSchema = RegistrationSchema.merge(FormSchema);

const Registration = () => {
  const router = useRouter();
  const { registrationType, handleChangeType } =
    useRegistrationType('/registration');

  const [currentStep, setCurrentStep] = useState<1 | 2>(1);

  const {
    register: registerUserForm,
    handleSubmit: handleSubmitUser,
    formState: { errors: errorsUser },
  } = useForm<RegistrationValues>({
    resolver: zodResolver(RegistrationSchema),
  });

  const {
    register: registerStepTwo,
    handleSubmit: handleSubmitStepTwo,
    formState: { errors: errorsStepTwo },
  } = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
  });

  const [stepOneData, setStepOneData] = useState<RegistrationValues | null>(
    null
  );

  const { mutateAsync } = useMutation({
    mutationFn: (payload: CreatorRegisterBody) => registerUser(payload),
  });

  const onSubmitStepOne = (data: RegistrationValues) => {
    setStepOneData(data);
    setCurrentStep(2);
  };

  const onSubmitStepTwo = async (data: FormValues) => {
    if (!stepOneData) return;

    const payload: CreatorRegisterBody = {
      ...stepOneData,
      email: data.email,
      password: data.password,
      user_type: 'creator',
    };

    console.log('🚀 Payload ბექისთვის:', payload);

    try {
      await mutateAsync(payload);
      console.log('რეგისტრაცია წარმატებით დასრულდა');
      router.push('/');
    } catch (error) {
      console.error('რეგისტრაციის შეცდომა:', error);
    }
  };

  return (
    <div className="flex m-auto my-[30px] w-full max-w-[1440px]">
      <Image
        src="/images/authIcons/png/authMainPhoto.png"
        width={880}
        height={880}
        alt="logo"
      />
      <div className="flex flex-col justify-between px-[41px] py-[54px] rounded-[8px] w-full max-w-[563px] min-h-[789px]">
        <div className="space-y-[9px]">
          <p className="font-bold text-[35px]">გაიარეთ რეგისტრაცია</p>
        </div>

        <BusinessCreatorBtnSlider
          registrationType={registrationType}
          setRegistrationType={handleChangeType}
        />

        <div className="flex items-center m-auto mt-[20px] w-full max-w-[273px]">
          <div
            className={`flex justify-center items-center border-[3px] rounded-full w-[48px] h-[48px] shrink-0 ${
              currentStep === 1
                ? 'border-[#3012B3]'
                : 'border-[#3012B3] bg-[#3012B3]'
            }`}
          >
            <p
              className={`font-bold text-[20px] ${
                currentStep === 1 ? 'text-[#3012B3]' : 'text-white'
              }`}
            >
              1
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
            onSubmit={handleSubmitUser(onSubmitStepOne)}
          />
        ) : (
          <RegistrationStepTwo
            register={registerStepTwo}
            errors={errorsStepTwo}
            onSubmit={handleSubmitStepTwo(onSubmitStepTwo)}
          />
        )}
      </div>
    </div>
  );
};

export default Registration;
