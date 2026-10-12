'use client';

import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { resendVerification, verifyEmail } from '@/lib/api/login';

// Target of the link in the backend verification email: /verify-email?token=...
const VerifyEmail = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const requested = useRef(false);
  const [email, setEmail] = useState('');

  const verify = useMutation({ mutationFn: verifyEmail });
  const { mutate: verifyMutate } = verify;

  const resend = useMutation({
    mutationFn: resendVerification,
    onSuccess: () => {
      toast.success('ვერიფიკაციის ბმული ხელახლა გამოგზავნილია');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'წერილის გაგზავნა ვერ მოხერხდა');
    },
  });

  useEffect(() => {
    // Tokens are single-use, so never send the request twice
    if (!token || requested.current) return;
    requested.current = true;
    verifyMutate(token);
  }, [token, verifyMutate]);

  const failed = !token || verify.isError;

  return (
    <div className="flex flex-col items-center gap-[24px] px-[32px] py-[40px] border border-[var(--auth-border)] rounded-[8px] w-full max-w-[563px] text-center">
      <Link href="/">
        <Image
          src="/images/authIcons/svg/selvioAuthLogo.svg"
          width={160}
          height={48}
          alt="logo"
        />
      </Link>

      {verify.isPending && (
        <p className="font-bold text-[18px]">ემაილი მოწმდება...</p>
      )}

      {verify.isSuccess && (
        <>
          <p className="font-bold text-[28px]">ემაილი დადასტურებულია</p>
          <Link
            href="/login"
            className="font-bold text-[#583CCF] text-[18px]"
          >
            ავტორიზაცია
          </Link>
        </>
      )}

      {failed && (
        <>
          <p className="font-bold text-[24px]">
            {token
              ? 'ბმული არასწორია ან ვადაგასულია'
              : 'ვერიფიკაციის ბმული არ არის მითითებული'}
          </p>
          <form
            className="flex flex-col gap-[16px] w-full"
            onSubmit={(e) => {
              e.preventDefault();
              if (email.trim()) resend.mutate(email.trim());
            }}
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="შეიყვანე ემაილი"
              className="px-[18px] py-[17px] border border-[var(--auth-input-border)] rounded-[8px] focus:outline-[var(--auth-border)] w-full min-h-[56px] font-bold text-[18px]"
            />
            <Button variant="auth" type="submit" disabled={resend.isPending}>
              {resend.isPending ? 'იგზავნება...' : 'ბმულის ხელახლა გაგზავნა'}
            </Button>
          </form>
        </>
      )}
    </div>
  );
};

export default VerifyEmail;
