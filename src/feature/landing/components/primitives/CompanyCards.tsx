'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import CompanyCard from '../primitives/CompanyCard';
import { useQuery } from '@tanstack/react-query';
import { fetchCompanyCards } from '@/lib/api/BusinessCards';
import { Campaign, CompanyCardsProps } from '../../type';
import CompanyCardSkeleton from './CompanyCardSkeleton';

const CompanyCards = ({ onOpenDetails, onJoin }: CompanyCardsProps) => {
  // null = not checked yet (SSR / first render)
  const [hasToken, setHasToken] = useState<boolean | null>(null);

  useEffect(() => {
    setHasToken(Boolean(localStorage.getItem('access_token')));
  }, []);

  const { data, isLoading, isError, refetch } = useQuery<Campaign[]>({
    queryKey: ['cards'],
    queryFn: fetchCompanyCards,
    enabled: hasToken === true,
  });

  const campaigns = data ?? [];

  const renderContent = () => {
    if (hasToken === false) {
      return (
        <p className="font-medium text-[16px] text-center">
          აქტიური კამპანიების სანახავად{' '}
          <Link
            href="/login"
            className="font-bold text-[var(--auth-registrationas-text)] underline"
          >
            გაიარეთ ავტორიზაცია
          </Link>
        </p>
      );
    }

    if (hasToken === null || isLoading) return <CompanyCardSkeleton />;

    if (isError) {
      return (
        <div className="flex flex-col items-center gap-[12px]">
          <p className="font-medium text-[16px] text-center">
            კამპანიების ჩატვირთვა ვერ მოხერხდა
          </p>
          <button
            type="button"
            onClick={() => refetch()}
            className="bg-gradient-to-r from-[#3012B3] to-[#7B62E8] px-[24px] rounded-[8px] min-h-[39px] font-medium text-[12px] text-white cursor-pointer"
          >
            ხელახლა ცდა
          </button>
        </div>
      );
    }

    if (!campaigns.length) {
      return (
        <p className="font-medium text-[16px] text-center">
          ამ ეტაპზე აქტიური კამპანიები არ არის
        </p>
      );
    }

    return (
      <div className="flex flex-wrap justify-center gap-[26px]">
        {campaigns.slice(0, 3).map((task) => (
          <CompanyCard
            key={task.id}
            task={task}
            onOpenDetails={onOpenDetails}
            onJoin={onJoin}
          />
        ))}
      </div>
    );
  };

  return (
    <div
      id="discoverbusiness"
      className="space-y-[31px] mx-auto mt-[59px] w-full max-w-[1440px]"
    >
      <p className="font-bold text-[32px] text-[var(--auth-registrationas-text)] text-center">
        აღმოაჩინე აქტიური კამპანიები
      </p>
      {renderContent()}
    </div>
  );
};

export default CompanyCards;
