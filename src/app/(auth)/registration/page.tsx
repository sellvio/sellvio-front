import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import Registration from '@/feature/registration/components/composites/Registration';

type RegistrationPageProps = {
  searchParams: Promise<{ type?: string }>;
};

const RegistrationPage = async ({ searchParams }: RegistrationPageProps) => {
  const { type } = await searchParams;
  // Business registration lives on its own route
  if (type === 'business') {
    redirect('/registrationBussines?type=business');
  }

  return (
    <div className="flex justify-center items-center w-full min-h-screen">
      <Suspense fallback={null}>
        <Registration />
      </Suspense>
    </div>
  );
};

export default RegistrationPage;
