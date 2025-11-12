'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import RegistrationForm from '@/feature/registration/components/primitives/RegistrationForm';
import {
  RegistrationSchema,
  RegistrationValues,
} from '@/feature/schema/registrationSchema';
import {
  UploadImageFormValues,
  uploadImageSchema,
} from '@/feature/schema/uploadImageSchema';
import { useRegistrationType } from '@/feature/components/composites/RegistrationType';
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
          <div className="flex justify-center items-center border-[#0000001A] border-[3px] rounded-full w-[48px] h-[48px] shrink-0">
            <p className="font-bold text-[#000000AD] text-[20px]">1</p>
          </div>
          <div className="bg-[#0000001A] w-full h-[2px]"></div>
          <div className="flex justify-center items-center border-[#0000001A] border-[3px] rounded-full w-[48px] h-[48px] shrink-0">
            <p className="font-bold text-[#000000AD] text-[20px]">2</p>
          </div>
        </div>
        <RegistrationForm register={registerUser} errors={errorsUser} />
      </div>
    </div>
  );
};

export default Registration;
