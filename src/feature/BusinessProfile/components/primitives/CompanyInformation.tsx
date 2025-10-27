'use client';
import {
  businessProfileData,
  updateBusinessProfile,
} from '@/lib/api/businessProfileData';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { BusinessProfilePictureProps } from '../../type';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  businessProfileSchema,
  BusinessProfileSchema,
} from '@/feature/schema/businessUpdateProfileSchema';
import CompanyInformationSkeleton from './CompanyInformationSkeleton';

const CompanyInformation = ({
  changeProfile,
  setChangeProfile,
}: BusinessProfilePictureProps) => {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['businessProfile'],
    queryFn: businessProfileData,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: updateBusinessProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['businessProfile'] });
      setChangeProfile(false);
    },
    onError: (error: Error) => {
      alert(`შეცდომა: ${error.message}`);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BusinessProfileSchema>({
    resolver: zodResolver(businessProfileSchema),
  });

  const submitForm = (formData: BusinessProfileSchema) => {
    const cleanedData = Object.fromEntries(
      Object.entries(formData).filter(
        ([_, value]) => value !== undefined && value !== null && value !== ''
      )
    );

    mutate(cleanedData as BusinessProfileSchema);
  };

  if (isError) return <p>Failed to fetch profile</p>;

  const profile = data?.data?.business_profiles;

  return isLoading ? (
    <CompanyInformationSkeleton />
  ) : (
    <div className="flex flex-col items-center mt-[72px] w-full">
      <form
        onSubmit={handleSubmit(submitForm)}
        className="flex flex-col gap-[31px] w-full max-w-[1225px]"
      >
        <div className="flex flex-col gap-[30px] bg-[rgba(88,60,207,0.02)] shadow-[0_8px_13px_0_rgba(0,0,0,0.04),4px_5px_6px_0_rgba(255,255,255,0.4)_inset,-1px_-3px_4px_0_rgba(255,255,255,0.4)_inset] backdrop-blur-[7.5px] p-[30px] border border-[rgba(0,0,0,0.22)] rounded-[8px] w-full max-w-[1225px] min-h-[231px]">
          <div>
            <p className="font-semibold text-[20px]">კომპანიის ინფორმაცია</p>
            <p className="text-[#000000AD] text-[14px]">
              განაახლე თქვენი კომპანიის ინფორმაცია
            </p>
          </div>
          <div className="flex justify-between gap-[30px]">
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
                className="bg-[rgba(255,255,255,0.14)] shadow-[4px_5px_6px_0_rgba(255,255,255,0.4)_inset,-1px_-3px_4px_0_rgba(255,255,255,0.4)_inset,0_8px_13px_0_rgba(0,0,0,0.04)] backdrop-blur-[7.5px] px-[18px] border border-[#E3E8EF] rounded-[8px] w-full min-h-[56px] font-bold text-[#000000D4] text-[18px]"
                {...register('company_name')}
              />
              {errors.company_name && (
                <p className="text-red-500 text-sm">
                  {errors.company_name.message}
                </p>
              )}
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
                defaultValue={profile?.business_industry_name || ''}
                readOnly={!changeProfile}
                className="bg-[rgba(255,255,255,0.14)] shadow-[4px_5px_6px_0_rgba(255,255,255,0.4)_inset,-1px_-3px_4px_0_rgba(255,255,255,0.4)_inset,0_8px_13px_0_rgba(0,0,0,0.04)] backdrop-blur-[7.5px] px-[18px] border border-[#E3E8EF] rounded-[8px] w-full min-h-[56px] font-bold text-[#000000D4] text-[18px]"
                {...register('business_industry_name')}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-[16px] bg-[rgba(88,60,207,0.02)] shadow-[0_8px_13px_0_rgba(0,0,0,0.04),4px_5px_6px_0_rgba(255,255,255,0.4)_inset,-1px_-3px_4px_0_rgba(255,255,255,0.4)_inset] backdrop-blur-[7.5px] p-[30px] border border-[rgba(0,0,0,0.22)] rounded-[8px] w-full max-w-[1225px]">
          <label htmlFor="description" className="font-bold text-[18px]">
            კომპანიის დახასიათება
          </label>
          <textarea
            id="description"
            readOnly={!changeProfile}
            defaultValue={profile?.description || ''}
            rows={3}
            className="bg-[rgba(255,255,255,0.14)] shadow-[4px_5px_6px_0_rgba(255,255,255,0.4)_inset,-1px_-3px_4px_0_rgba(255,255,255,0.4)_inset,0_8px_13px_0_rgba(0,0,0,0.04)] backdrop-blur-[7.5px] px-[18px] py-[16px] border border-[#E3E8EF] rounded-[8px] w-full font-bold text-[#000000D4] text-[18px] resize-none"
            {...register('description')}
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
                  readOnly={!changeProfile}
                  className="bg-[rgba(255,255,255,0.14)] shadow-[4px_5px_6px_0_rgba(255,255,255,0.4)_inset,-1px_-3px_4px_0_rgba(255,255,255,0.4)_inset,0_8px_13px_0_rgba(0,0,0,0.04)] backdrop-blur-[7.5px] px-[18px] border border-[#E3E8EF] rounded-[8px] w-full min-h-[56px] font-bold text-[#000000D4] text-[18px]"
                  defaultValue={profile?.business_email || ''}
                  {...register('business_email')}
                />
              </div>
              {errors.business_email && (
                <p className="text-red-500 text-sm">
                  {errors.business_email.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-[16px] w-full">
              <label htmlFor="phone" className="font-bold text-[18px]">
                ტელეფონი
              </label>
              <div className="flex items-center gap-[10px] w-full">
                <Image
                  src={'/images/businessProfileIcon/svg/phoneIcon.svg'}
                  alt="profileIcon"
                  width={24}
                  height={24}
                />
                <input
                  type="text"
                  id="phone"
                  readOnly={!changeProfile}
                  className="bg-[rgba(255,255,255,0.14)] shadow-[4px_5px_6px_0_rgba(255,255,255,0.4)_inset,-1px_-3px_4px_0_rgba(255,255,255,0.4)_inset,0_8px_13px_0_rgba(0,0,0,0.04)] backdrop-blur-[7.5px] px-[18px] border border-[#E3E8EF] rounded-[8px] w-full min-h-[56px] font-bold text-[#000000D4] text-[18px]"
                  defaultValue={profile?.phone || ''}
                  {...register('phone')}
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
                type="text"
                id="web"
                readOnly={!changeProfile}
                className="bg-[rgba(255,255,255,0.14)] shadow-[4px_5px_6px_0_rgba(255,255,255,0.4)_inset,-1px_-3px_4px_0_rgba(255,255,255,0.4)_inset,0_8px_13px_0_rgba(0,0,0,0.04)] backdrop-blur-[7.5px] px-[18px] border border-[#E3E8EF] rounded-[8px] w-full min-h-[56px] font-bold text-[#000000D4] text-[18px]"
                defaultValue={profile?.website_url || ''}
                {...register('website_url')}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-[30px] bg-[rgba(88,60,207,0.02)] shadow-[0_8px_13px_0_rgba(0,0,0,0.04),4px_5px_6px_0_rgba(255,255,255,0.4)_inset,-1px_-3px_4px_0_rgba(255,255,255,0.4)_inset] backdrop-blur-[7.5px] p-[30px] border border-[rgba(0,0,0,0.22)] rounded-[8px] w-full max-w-[1225px]">
          <div>
            <p className="font-semibold text-[20px] text-[600]">
              კონტენტის კატეგორია
            </p>
            <p className="text-[#000000AD] text-[14px]">
              აირჩიეთ კატეგორიები რომლებიც შეესაბამება თქვენი კონტენტის სტილს
            </p>
          </div>
          <div className="flex gap-[8px]">
            <div className="flex justify-between items-center bg-[#FFFFFF24] pr-[18px] border border-[#E3E8EF] rounded-[8px] w-full max-w-[463px] min-h-[42px]">
              <input
                placeholder="შეიყვანეთ კონტენტის კატეგორია..."
                type="text"
                className="px-[18px] outline-none w-full h-full min-h-[42px] font-bold text-[#111827] text-[18px]"
              />
              <button className="cursor-pointer">
                <Image
                  src={'/images/businessProfileIcon/svg/categoryPlus.svg'}
                  alt="pluse"
                  width={22}
                  height={22}
                />
              </button>
            </div>
            <div className="flex gap-[8px]">
              {profile?.business_tags.map((tag) => (
                <div
                  key={tag.tag_id}
                  className="bg-[#3012B31F] px-[22px] py-[10px] border border-[#3012B3] rounded-[8px] font-semibold text-[#111827]"
                >
                  {tag.tags.name}
                </div>
              ))}
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
                  className="bg-[rgba(255,255,255,0.14)] shadow-[4px_5px_6px_0_rgba(255,255,255,0.4)_inset,-1px_-3px_4px_0_rgba(255,255,255,0.4)_inset,0_8px_13px_0_rgba(0,0,0,0.04)] backdrop-blur-[7.5px] px-[18px] border border-[#E3E8EF] rounded-[8px] w-full min-h-[56px] font-bold text-[#000000D4] text-[18px]"
                  defaultValue={profile?.location || ''}
                  {...register('location')}
                />
              </div>
            </div>
            <div className="flex flex-col gap-[16px] w-full">
              <label htmlFor="employeeRange" className="font-bold text-[18px]">
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
                  type="text"
                  id="employeeRange"
                  readOnly={!changeProfile}
                  className="bg-[rgba(255,255,255,0.14)] opacity-60 shadow-[4px_5px_6px_0_rgba(255,255,255,0.4)_inset,-1px_-3px_4px_0_rgba(255,255,255,0.4)_inset,0_8px_13px_0_rgba(0,0,0,0.04)] backdrop-blur-[7.5px] px-[18px] border border-[#E3E8EF] rounded-[8px] w-full min-h-[56px] font-bold text-[#000000D4] text-[18px]"
                  defaultValue={profile?.business_employee_range || ''}
                />
              </div>
            </div>
          </div>
        </div>

        {changeProfile && (
          <div className="flex justify-end m-auto mt-[48px] w-full max-w-[1225px]">
            <div className="flex gap-[22px]">
              <button
                type="button"
                onClick={() => setChangeProfile(false)}
                className="shadow-[4px_5px_6px_0px_rgba(255,255,255,0.4)_inset,-1px_-3px_4px_0px_rgba(255,255,255,0.4)_inset,0px_8px_13px_0px_rgba(0,0,0,0.04)] backdrop-blur-[7.5px] px-[77px] py-[16px] border border-[#0866FF] rounded-[8px] font-bold text-[#0061FF] text-[14px] cursor-pointer"
                disabled={isPending}
              >
                გაუქმება
              </button>
              <button
                type="submit"
                className="disabled:opacity-50 backdrop-blur-[7.5px] px-[60px] py-[16px] border border-white rounded-[8px] font-bold text-[#FFFFFF]"
                disabled={isPending}
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
                {isPending ? 'მიმდინარეობს...' : 'დადასტურება'}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default CompanyInformation;
