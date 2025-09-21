'use client';

import CompanyCard from '../primitives/CompanyCard';
import { CompanyCardProps } from '../../type';
import { useQuery } from '@tanstack/react-query';
import { fetchCompanyCards } from '@/lib/api/BusinessCards';

const CompanyCards = () => {
  const { data, isLoading, isError } = useQuery<CompanyCardProps[]>({
    queryKey: ['cards'],
    queryFn: fetchCompanyCards,
  });

  if (isError) return <p>Failed to fetch Cards</p>;

  return (
    <div
      id="discoverbusiness"
      className="space-y-[31px] mx-auto mt-[59px] w-full max-w-[1440px]"
    >
      <p className="font-bold text-[#583CCF] text-[32px] text-center">
        აღმოაჩინე აქტიური კამპანიები
      </p>

      {isLoading ? (
        <p className="justify-center w-full">Loading ...</p>
      ) : (
        <div className="flex flex-wrap justify-center gap-[26px]">
          {data?.map((task) => (
            <div key={task.id}>
              <CompanyCard task={task} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CompanyCards;
