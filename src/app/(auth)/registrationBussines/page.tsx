import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import BusinessRegistration from '@/feature/registration/components/composites/BusinessRegistration';

export const dynamic = 'force-dynamic';

type RegistrationBusinessProps = {
  searchParams: Promise<{ type?: string }>;
};

const RegistrationBusiness = async ({
  searchParams,
}: RegistrationBusinessProps) => {
  const { type } = await searchParams;
  // Creator registration lives on its own route
  if (type === 'creator') {
    redirect('/registration?type=creator');
  }

  return (
    <div className="flex justify-center items-center w-full min-h-screen">
      <Suspense
        fallback={
          <div className="flex justify-center items-center min-h-screen">
            <div>იტვირთება...</div>
          </div>
        }
      >
        <BusinessRegistration />
      </Suspense>
    </div>
  );
};

export default RegistrationBusiness;
