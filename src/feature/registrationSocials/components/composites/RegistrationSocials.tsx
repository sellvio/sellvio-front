'use client';
import Link from 'next/link';
import { socialMediaData } from '../../data/socialMediaData';
import Image from 'next/image';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { SocialsSchema, SocialsValues } from '@/feature/schema/SocialsSchema';
import RegistrationSocialsForm from '../primitives/RegistrationSocialsForm';
import RegistrationAs from '@/feature/components/composites/RegistrationAs';

const RegistrationSocials = () => {
  const {
    register,
    // handleSubmit,
    formState: { errors },
  } = useForm<SocialsValues>({
    resolver: zodResolver(SocialsSchema),
  });

  const [visible, setVisible] = useState<number[]>([1]);

  const toggleInput = (id: number) => {
    setVisible((prev) => {
      if (prev.includes(id)) {
        return prev.length > 1
          ? prev.filter((lastElement) => lastElement !== id)
          : prev;
      }
      return [...prev, id];
    });
  };

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
        <div className="mt-[37px]">
          <p className="font-bold text-[18px] text-center">
            რომელ სოციალურ ქსელებს იყენებ?
          </p>
          <div className="flex justify-center gap-[53px] mt-[16px] w-full">
            {socialMediaData.map((eachElement) => (
              <div key={eachElement.id}>
                <button
                  onClick={() => toggleInput(eachElement.id)}
                  className="relative cursor-pointer"
                >
                  <Image
                    src={eachElement.image}
                    alt={eachElement.alt}
                    width={eachElement.width}
                    height={eachElement.height}
                  />
                  {visible.includes(eachElement.id) && (
                    <Image
                      src="/choose.svg"
                      alt="chooseIcon"
                      width={14}
                      height={14}
                      className="top-0 right-0 absolute -translate-y-1/4 translate-x-1/4"
                    />
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
        <RegistrationSocialsForm
          visible={visible}
          register={register}
          errors={errors}
        />
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

export default RegistrationSocials;
