'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import ReUsableInput from '../primitives/ReusableInput';
import { FormSchema, FormValues } from '../../../schema/authorisationSchema';
import { useMutation } from '@tanstack/react-query';
import { loginUser } from '@/lib/api/login';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

const Authorization = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      toast.success('Login successful');
      router.push('/');
    },
    onError: () => {
      toast.error('Login failed');
    },
  });

  const submitForm = (data: FormValues) => {
    mutate(data);
  };
  return (
    <div className="flex w-full max-w-[1343px]">
      <Image
        src="/images/authIcons/png/authMainPhoto.png"
        width={780}
        height={780}
        alt="logo"
      />
      <div className="flex flex-col justify-between px-[41px] py-[54px] rounded-[8px] w-full max-w-[563px] min-h-[789px]">
        <div className="space-y-[9px]">
          <div className="flex justify-center mb-[52px] w-full">
            <Link href="/">
              <Image
                src="/images/authIcons/svg/selvioAuthLogo.svg"
                width={160}
                height={48}
                alt="logo"
              />
            </Link>
          </div>
          <p className="font-bold text-[35px]">დაბრუნებას გილოცავ</p>
          <p className="text-[18px] text-[var(--auth-text-dark)]">
            შეარჩიე შენი პროფილის სტილი
          </p>
        </div>

        <form
          onSubmit={handleSubmit(submitForm)}
          className="space-y-[22px] mt-[39px]"
        >
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
              type="password"
              placeholder="შეიყვანე პაროლი"
              register={register}
              errors={errors}
            />
          </div>
          <Button variant="auth" disabled={isPending}>
            {isPending ? 'იგზავნება...' : 'შესვლა'}
          </Button>
        </form>
        <div className="flex justify-center gap-[6px] w-full">
          <p className="font-bold text-[#000000D4] text-[18px]">
            არ გაქვს ექაუნთი?
          </p>
          <Link href={'/'} className="font-bold text-[#583CCF] text-[18px]">
            დარეგისტრირდი
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Authorization;
