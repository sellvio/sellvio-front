import { Suspense } from 'react';
import Registration from '@/feature/registration/components/composites/Registration';

const RegistrationBusinessPage = () => {
  return (
    <div>
      <Suspense fallback={null}>
        <Registration />
      </Suspense>
    </div>
  );
};

export default RegistrationBusinessPage;
