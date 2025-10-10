'use client';
import { businessProfileData } from '@/lib/api/businessProfileData';
import { useQuery } from '@tanstack/react-query';

const CompanyInformation = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['businessProfile'],
    queryFn: businessProfileData,
  });

  if (isError) return <p>Failed to fetch profile</p>;
  if (isLoading) return <p>Loading...</p>;

  const profile = data?.data?.business_profiles;

  return (
    <div className="flex flex-col items-center mt-[72px] w-full">
      <div
        className="flex flex-col gap-[30px] p-[30px] rounded-[8px] w-full max-w-[1225px] min-h-[231px]"
        style={{
          border: '1px solid #00000038',
          backdropFilter: 'blur(7.5px)',
          boxShadow: `
            0px 8px 13px 0px #0000000A,
            4px 5px 6px 0px #FFFFFF66 inset,
            -1px -3px 4px 0px #FFFFFF66 inset
          `,
        }}
      >
        <div>
          <p className="font-semibold text-[20px]">კომპანიის ინფორმაცია</p>
          <p className="text-[#000000AD] text-[14px]">
            განაახლე თქვენი კომპანიის ინფორმაცია
          </p>
        </div>

        <form className="flex gap-[75px]">
          <div className="flex flex-col gap-[16px] w-full max-w-[545px]">
            <label
              htmlFor="company"
              className="font-bold text-[18px] cursor-pointer"
            >
              კომპანიის სახელი
            </label>
            <input
              id="company"
              type="text"
              defaultValue={profile?.company_name || ''}
              readOnly
              className="p-2 border border-gray-300 rounded w-full font-bold text-[#000000D4] text-[18px]"
            />
          </div>
          <div className="flex flex-col gap-[16px] w-full max-w-[545px]">
            <label
              htmlFor="industry"
              className="font-bold text-[18px] cursor-pointer"
            >
              ინდუსტრია
            </label>
            <input
              id="industry"
              type="email"
              defaultValue={profile?.business_email || ''}
              readOnly
              className="p-2 border border-gray-300 rounded w-full font-bold text-[#000000D4] text-[18px]"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanyInformation;
