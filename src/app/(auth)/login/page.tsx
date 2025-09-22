import { Suspense } from 'react';
import Authorization from '@/feature/Authorization/components/composites/Authorization';

const Auth = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Suspense fallback={null}>
        <Authorization />
      </Suspense>
    </div>
  );
};

export default Auth;
