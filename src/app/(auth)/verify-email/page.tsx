import { Suspense } from 'react';
import VerifyEmail from '@/feature/Authorization/components/composites/VerifyEmail';

const VerifyEmailPage = () => {
  return (
    <div className="flex justify-center items-center px-[16px] min-h-screen">
      <Suspense fallback={null}>
        <VerifyEmail />
      </Suspense>
    </div>
  );
};

export default VerifyEmailPage;
