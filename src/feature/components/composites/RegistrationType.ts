'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export type RegistrationType = 'business' | 'creator';

const REGISTRATION_PATHS: Record<RegistrationType, string> = {
  business: '/registrationBussines',
  creator: '/registration',
};

const isRegistrationType = (value: string | null): value is RegistrationType =>
  value === 'business' || value === 'creator';

// `defaultType` is the type the current page renders the form for
export const useRegistrationType = (defaultType: RegistrationType) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const typeParam = searchParams.get('type');
  const typeFromUrl = isRegistrationType(typeParam) ? typeParam : defaultType;
  const [registrationType, setRegistrationType] =
    useState<RegistrationType>(typeFromUrl);

  useEffect(() => {
    setRegistrationType(typeFromUrl);
  }, [typeFromUrl]);

  const handleChangeType = (type: RegistrationType) => {
    setRegistrationType(type);
    router.push(`${REGISTRATION_PATHS[type]}?type=${type}`);
  };

  return { registrationType, handleChangeType };
};
