import { Suspense } from 'react';
import BusinessRegistration from '@/feature/registration/components/composites/BusinessRegistration';

export const dynamic = 'force-dynamic';

const RegistrationBusiness = () => {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center min-h-screen">
          <div>Loading...</div>
        </div>
      }
    >
      <BusinessRegistration />
    </Suspense>
  );
};

export default RegistrationBusiness;
