'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useRegistrationType } from '@/feature/components/composites/RegistrationType';
import BusinessCreatorBtnSlider from '@/feature/Authorization/components/primitives/BusinessCreatorBtnSlider';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import RegistrationBusinessForm from '../primitives/RegistrationBusinessForm';
import { CompanySchema, CompanyValues } from '@/feature/schema/companySchema';
import {
  RegistrationStepTwoSchema,
  RegistrationStepTwoValues,
} from '@/feature/schema/businessRegistrationSchemaStepTwo';
import BusinessRegistrationLastStep from '../primitives/BusinessRegistrationStepTwo';
import { registerUser } from '@/lib/api/login';
import { BusinessRegisterBody } from '@/feature/registrationSocials/type';
import Link from 'next/link';

const BusinessRegistration = () => {
  const router = useRouter();
  const { registrationType, handleChangeType } =
    useRegistrationType('/registration');
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const [stepOneData, setStepOneData] = useState<CompanyValues | null>(null);

  const {
    register: businessRegistration,
    handleSubmit: handleSubmitBusiness,
    formState: { errors: errorsStepOne },
    setValue: setValueStepOne,
  } = useForm<CompanyValues>({
    resolver: zodResolver(CompanySchema),
  });

  const {
    register: registerStepTwo,
    handleSubmit: handleSubmitStepTwo,
    formState: { errors: errorsStepTwo },
  } = useForm<RegistrationStepTwoValues>({
    resolver: zodResolver(RegistrationStepTwoSchema),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: BusinessRegisterBody) => registerUser(payload),
    onSuccess: () => {
      toast.success('რეგისტრაცია წარმატებით დასრულდა');
      router.push('/');
    },
    onError: (error: any) => {
      toast.error(error.message || 'რეგისტრაციის შეცდომა');
      console.error('Registration error:', error);
    },
  });

  const onSubmitBusiness = (data: CompanyValues) => {
    console.log('Step 1 data:', data);
    setStepOneData(data);
    setCurrentStep(2);
  };

  const onSubmitStepTwo = async (data: RegistrationStepTwoValues) => {
    if (!stepOneData) {
      toast.error('გთხოვთ დაიწყოთ თავიდან');
      setCurrentStep(1);
      return;
    }

    const payload: BusinessRegisterBody = {
      email: data.email,
      password: data.password,
      user_type: 'business',
      company_name: stepOneData.company_name,
      company_nickName: data.company_nickName,
      legal_status: stepOneData.legal_status,
      website_url: stepOneData.website,
      business_email: data.email,
      phone: data.phone || '',
      business_tags: stepOneData.business_tags || [],
    };

    console.log('Final payload:', payload);

    try {
      await mutateAsync(payload);
    } catch (error) {
      console.error('Submission error:', error);
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
          <RegistrationBusinessForm
            register={businessRegistration}
            errors={errorsStepOne}
            onSubmit={handleSubmitBusiness(onSubmitBusiness)}
            setValue={setValueStepOne}
          />
        ) : (
          <BusinessRegistrationLastStep
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

export default BusinessRegistration;
