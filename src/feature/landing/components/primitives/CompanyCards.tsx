'use client';

import CompanyCard from '../primitives/CompanyCard';
import { useQuery } from '@tanstack/react-query';
import { fetchCompanyCards } from '@/lib/api/BusinessCards';
import { Campaign } from '../../type';
import CompanyCardSkeleton from './CompanyCardSkeleton';

const CompanyCards = () => {
  const { data, isLoading, isError } = useQuery<Campaign[]>({
    queryKey: ['cards'],
    queryFn: fetchCompanyCards,
  });

  const campaigns = data ?? [];

  if (isError) return <p>Failed to fetch Cards</p>;

  return (
    <div
      id="discoverbusiness"
      className="space-y-[31px] mx-auto mt-[59px] w-full max-w-[1440px]"
    >
      <p className="font-bold text-[32px] text-[var(--auth-registrationas-text)] text-center">
        აღმოაჩინე აქტიური კამპანიები
      </p>

      {isLoading ? (
        <CompanyCardSkeleton />
      ) : (
        <div className="flex flex-wrap justify-center gap-[26px]">
          {campaigns.slice(0, 3).map((task) => (
            <CompanyCard key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CompanyCards;
