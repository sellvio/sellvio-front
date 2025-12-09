import { Suspense } from 'react';
import BusinessRegistration from '@/feature/registration/components/composites/BusinessRegistration';

export const dynamic = 'force-dynamic';

const RegistrationBusiness = () => {
  return (
    <div className="flex justify-center items-center w-full min-h-screen">
      <Suspense
        fallback={
          <div className="flex justify-center items-center min-h-screen">
            <div>Loading...</div>
          </div>
        }
      >
        <BusinessRegistration />
      </Suspense>
    </div>
  );
};

export default RegistrationBusiness;
