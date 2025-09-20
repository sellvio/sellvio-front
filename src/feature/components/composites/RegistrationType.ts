'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export type RegistrationType = 'business' | 'creator';

export const useRegistrationType = (basePath: string) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const typeFromUrl =
    (searchParams.get('type') as RegistrationType) || 'creator';
  const [registrationType, setRegistrationType] =
    useState<RegistrationType>(typeFromUrl);

  useEffect(() => {
    setRegistrationType(typeFromUrl);
  }, [typeFromUrl]);

  const handleChangeType = (type: RegistrationType) => {
    setRegistrationType(type);
    router.push(`${basePath}?type=${type}`);
  };

  return { registrationType, handleChangeType };
};
