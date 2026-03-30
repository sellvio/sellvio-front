import Header from '@/feature/common/header/components/composites/Header';
import React from 'react';
import CompanyBasics from '../primitives/CompanyBasics';
import Platforms from '../primitives/Platforms';

const Campaing = () => {
  return (
    <div className="flex flex-col flex-1 gap-[44px] px-[43px]">
      <Header pageName={'კამპანიის შექმნა'} />

      <div className="flex flex-col gap-[64px] mx-auto w-full max-w-[1440px] h-full min-h-screen">
        <CompanyBasics />
        <Platforms />
      </div>
    </div>
  );
};

export default Campaing;
