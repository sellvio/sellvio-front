'use client';
import Image from 'next/image';
import BussinesCreatorBtnSlider from '../primitives/BussinesCreatorBtnSlider';
import ReUsableInput from '../primitives/ReusableInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { FormSchema, FormValues } from '../../schema/authorisationSchema';

const Authorization = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
  });
  return (
    <div className="space-y-[30px] m-auto mt-[130px] w-full max-w-[621px]">
      <div className="flex flex-col items-center">
        <Image
          src="./assets/images/svg/Sellvio.svg"
          width={172}
          height={48}
          alt="logo"
        />
        <p className="font-bold text-[#000000D4] text-[18px]">შედით პროფილზე</p>
      </div>
      <div className="px-[32px] py-[26px] border border-[#3012B3CC] rounded-[8px] w-full max-w-[621px] min-h-[653px]">
        <div className="space-y-[9px]">
          <p className="font-bold text-[35px]">დაბრუნებას გილოცავ</p>
          <p className="text-[#000000D4] text-[18px]">
            შეარჩიე შენი პროფილის სტილი
          </p>
        </div>
        <BussinesCreatorBtnSlider />
        <form action="">
          <ReUsableInput
            label="ემაილი"
            id="email"
            type="tel"
            placeholder="შეიყვანე ემაილი"
            register={register}
            errors={errors}
          />
        </form>
        <div></div>
      </div>
    </div>
  );
};

export default Authorization;
