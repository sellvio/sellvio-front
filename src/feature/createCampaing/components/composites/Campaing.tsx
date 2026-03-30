import Header from '@/feature/common/header/components/composites/Header';
import React from 'react';
import CompanyBasics from '../primitives/CompanyBasics';

const Campaing = () => {
  return (
    <div className="mx-auto px-[43px] w-full max-w-[1440px] h-full">
      <Header pageName={'კამპანიის შექმნა'} />
      <CompanyBasics />
    </div>
  );
};

export default Campaing;
