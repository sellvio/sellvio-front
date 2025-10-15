'use client';
import { businessProfileData } from '@/lib/api/businessProfileData';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';

const CompanyInformation = ({ changeProfile, setChangeProfile }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['businessProfile'],
    queryFn: businessProfileData,
  });

  if (isError) return <p>Failed to fetch profile</p>;
  if (isLoading) return <p>Loading...</p>;

  const profile = data?.data?.business_profiles;

  return (
    <div className="flex flex-col items-center mt-[72px] w-full">
      <form className="flex flex-col gap-[31px] w-full max-w-[1225px]">
        <div className="flex flex-col gap-[30px] bg-[rgba(88,60,207,0.02)] shadow-[0_8px_13px_0_rgba(0,0,0,0.04),4px_5px_6px_0_rgba(255,255,255,0.4)_inset,-1px_-3px_4px_0_rgba(255,255,255,0.4)_inset] backdrop-blur-[7.5px] p-[30px] border border-[rgba(0,0,0,0.22)] rounded-[8px] w-full max-w-[1225px] min-h-[231px]">
          <div>
            <p className="font-semibold text-[20px]">კომპანიის ინფორმაცია</p>
            <p className="text-[#000000AD] text-[14px]">
              განაახლე თქვენი კომპანიის ინფორმაცია
            </p>
          </div>
          <div className="flex justify-between">
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
                readOnly={!changeProfile}
                className="bg-[rgba(255,255,255,0.14)] shadow-[4px_5px_6px_0_rgba(255,255,255,0.4)_inset,-1px_-3px_4px_0_rgba(255,255,255,0.4)_inset,0_8px_13px_0_rgba(0,0,0,0.04)] backdrop-blur-[7.5px] p-2rounded px-[18px] border border-[#E3E8EF] rounded-[8px] w-full min-h-[56px] font-bold text-[#000000D4] text-[18px]"
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
                type="text"
                defaultValue={profile?.business_email || ''}
                readOnly={!changeProfile}
                className="bg-[rgba(255,255,255,0.14)] shadow-[4px_5px_6px_0_rgba(255,255,255,0.4)_inset,-1px_-3px_4px_0_rgba(255,255,255,0.4)_inset,0_8px_13px_0_rgba(0,0,0,0.04)] backdrop-blur-[7.5px] p-2rounded px-[18px] border border-[#E3E8EF] rounded-[8px] w-full min-h-[56px] font-bold text-[#000000D4] text-[18px]"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[16px] bg-[rgba(88,60,207,0.02)] shadow-[0_8px_13px_0_rgba(0,0,0,0.04),4px_5px_6px_0_rgba(255,255,255,0.4)_inset,-1px_-3px_4px_0_rgba(255,255,255,0.4)_inset] backdrop-blur-[7.5px] p-[30px] border border-[rgba(0,0,0,0.22)] rounded-[8px] w-full max-w-[1225px]">
          <label htmlFor="description" className="font-bold text-[18px]">
            კომპანიის დახასიათება
          </label>
          <input
            type="text"
            id="description"
            readOnly={!changeProfile}
            defaultValue={profile?.description || ''}
            className="bg-[rgba(255,255,255,0.14)] shadow-[4px_5px_6px_0_rgba(255,255,255,0.4)_inset,-1px_-3px_4px_0_rgba(255,255,255,0.4)_inset,0_8px_13px_0_rgba(0,0,0,0.04)] backdrop-blur-[7.5px] p-2rounded px-[18px] border border-[#E3E8EF] rounded-[8px] w-full min-h-[56px] font-bold text-[#000000D4] text-[18px]"
          />
        </div>
        <div className="flex flex-col gap-[16px] bg-[rgba(88,60,207,0.02)] shadow-[0_8px_13px_0_rgba(0,0,0,0.04),4px_5px_6px_0_rgba(255,255,255,0.4)_inset,-1px_-3px_4px_0_rgba(255,255,255,0.4)_inset] backdrop-blur-[7.5px] p-[30px] border border-[rgba(0,0,0,0.22)] rounded-[8px] w-full max-w-[1225px]">
          <div className="flex gap-[75px] w-full">
            <div className="flex flex-col gap-[16px] w-full">
              <label htmlFor="email" className="font-bold text-[18px]">
                ემაილი
              </label>
              <div className="flex items-center gap-[10px] w-full">
                <Image
                  src={'/images/businessProfileIcon/svg/emailIcon.svg'}
                  alt="email"
                  width={24}
                  height={24}
                />
                <input
                  type="email"
                  id="email"
                  readOnly
                  className="bg-[rgba(255,255,255,0.14)] shadow-[4px_5px_6px_0_rgba(255,255,255,0.4)_inset,-1px_-3px_4px_0_rgba(255,255,255,0.4)_inset,0_8px_13px_0_rgba(0,0,0,0.04)] backdrop-blur-[7.5px] p-2rounded px-[18px] border border-[#E3E8EF] rounded-[8px] w-full min-h-[56px] font-bold text-[#000000D4] text-[18px]"
                  defaultValue={profile?.business_email || ''}
                />
              </div>
            </div>
            <div className="flex flex-col gap-[16px] w-full">
              <label htmlFor="phone" className="font-bold text-[18px]">
                ტელეფონი
              </label>
              <div className="flex items-center gap-[10px] w-full">
                <Image
                  src={'/images/businessProfileIcon/svg/phoneIcon.svg'}
                  alt="email"
                  width={24}
                  height={24}
                />
                <input
                  type="email"
                  id="phone"
                  readOnly={!changeProfile}
                  className="bg-[rgba(255,255,255,0.14)] shadow-[4px_5px_6px_0_rgba(255,255,255,0.4)_inset,-1px_-3px_4px_0_rgba(255,255,255,0.4)_inset,0_8px_13px_0_rgba(0,0,0,0.04)] backdrop-blur-[7.5px] p-2rounded px-[18px] border border-[#E3E8EF] rounded-[8px] w-full min-h-[56px] font-bold text-[#000000D4] text-[18px]"
                  defaultValue={profile?.phone || ''}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[16px] w-full">
            <label htmlFor="web" className="font-bold text-[18px]">
              ვებსაიტი
            </label>
            <div className="flex items-center gap-[10px] w-full">
              <Image
                src={'/images/businessProfileIcon/svg/webIcon.svg'}
                alt="email"
                width={24}
                height={24}
              />
              <input
                type="email"
                id="web"
                readOnly={!changeProfile}
                className="bg-[rgba(255,255,255,0.14)] shadow-[4px_5px_6px_0_rgba(255,255,255,0.4)_inset,-1px_-3px_4px_0_rgba(255,255,255,0.4)_inset,0_8px_13px_0_rgba(0,0,0,0.04)] backdrop-blur-[7.5px] p-2rounded px-[18px] border border-[#E3E8EF] rounded-[8px] w-full min-h-[56px] font-bold text-[#000000D4] text-[18px]"
                defaultValue={profile?.website_url || ''}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[16px] bg-[rgba(88,60,207,0.02)] shadow-[0_8px_13px_0_rgba(0,0,0,0.04),4px_5px_6px_0_rgba(255,255,255,0.4)_inset,-1px_-3px_4px_0_rgba(255,255,255,0.4)_inset] backdrop-blur-[7.5px] p-[30px] border border-[rgba(0,0,0,0.22)] rounded-[8px] w-full max-w-[1225px]">
          <div className="flex gap-[75px] w-full">
            <div className="flex flex-col gap-[16px] w-full">
              <label htmlFor="location" className="font-bold text-[18px]">
                ლოკაცია
              </label>
              <div className="flex items-center gap-[10px] w-full">
                <Image
                  src={'/images/businessProfileIcon/svg/map-pin.svg'}
                  alt="email"
                  width={24}
                  height={24}
                />
                <input
                  type="text"
                  id="location"
                  readOnly={!changeProfile}
                  className="bg-[rgba(255,255,255,0.14)] shadow-[4px_5px_6px_0_rgba(255,255,255,0.4)_inset,-1px_-3px_4px_0_rgba(255,255,255,0.4)_inset,0_8px_13px_0_rgba(0,0,0,0.04)] backdrop-blur-[7.5px] p-2rounded px-[18px] border border-[#E3E8EF] rounded-[8px] w-full min-h-[56px] font-bold text-[#000000D4] text-[18px]"
                  defaultValue={profile?.description || ''}
                />
              </div>
            </div>
            <div className="flex flex-col gap-[16px] w-full">
              <label htmlFor="phone" className="font-bold text-[18px]">
                კომპანიის ზომა
              </label>
              <div className="flex items-center gap-[10px] w-full">
                <Image
                  src={'/images/businessProfileIcon/svg/users.svg'}
                  alt="email"
                  width={24}
                  height={24}
                />
                <input
                  type="email"
                  id="phone"
                  readOnly={!changeProfile}
                  className="bg-[rgba(255,255,255,0.14)] shadow-[4px_5px_6px_0_rgba(255,255,255,0.4)_inset,-1px_-3px_4px_0_rgba(255,255,255,0.4)_inset,0_8px_13px_0_rgba(0,0,0,0.04)] backdrop-blur-[7.5px] p-2rounded px-[18px] border border-[#E3E8EF] rounded-[8px] w-full min-h-[56px] font-bold text-[#000000D4] text-[18px]"
                  defaultValue={profile?.description || ''}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
      {changeProfile && (
        <div className="flex justify-end m-auto mt-[48px] w-full max-w-[1225px]">
          <div className="flex gap-[22px]">
            <button
              onClick={() =>
                setChangeProfile((changeProfile) => !changeProfile)
              }
              className="shadow-[4px_5px_6px_0px_rgba(255,255,255,0.4)_inset,-1px_-3px_4px_0px_rgba(255,255,255,0.4)_inset,0px_8px_13px_0px_rgba(0,0,0,0.04)] backdrop-blur-[7.5px] px-[77px] py-[16px] border border-[#0866FF] rounded-[8px] font-bold text-[#0061FF] text-[14px] cursor-pointer"
            >
              გაუქმება
            </button>
            <button
              className="backdrop-blur-[7.5px] px-[60px] py-[16px] border border-white rounded-[8px] font-bold text-[#FFFFFF]"
              style={{
                background: '#0866FFE0',
                borderWidth: '0.5px',
                boxShadow: `
      4px 5px 6px 0px #FFFFFF66 inset,
      -1px -3px 4px 0px #FFFFFF66 inset,
      0px 8px 13px 0px #0000000A
    `,
              }}
            >
              დადასტურება
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyInformation;
