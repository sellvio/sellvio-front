import { Suspense } from 'react';
import Registration from '@/feature/registration/components/composites/Registration';

const RegistrationBusinessPage = () => {
  return (
    <div className="flex justify-center items-center w-full min-h-screen">
      <Suspense fallback={null}>
        <Registration />
      </Suspense>
    </div>
  );
};

export default RegistrationBusinessPage;
