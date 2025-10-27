'use client';
import {
  businessProfileData,
  updateBusinessProfile,
} from '@/lib/api/businessProfileData';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  businessProfileSchema,
  BusinessProfileSchema,
} from '@/feature/schema/businessUpdateProfileSchema';

import CompanyInformationSkeleton from './CompanyInformationSkeleton';
import CompanyDescription from './CompanyDescription';
import CompanyContacts from './CompanyContacts';
import CompanyTags from './CompanyTags';
import CompanyLocation from './CompanyLocation';
import CompanyActions from './CompanyActions';
import CompanyHeader from './CompanyHeader';

const CompanyInformation = ({ changeProfile, setChangeProfile }) => {
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
    onError: (error: Error) => alert(`შეცდომა: ${error.message}`),
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
        <CompanyHeader
          profile={profile}
          changeProfile={changeProfile}
          register={register}
          errors={errors}
        />

        <CompanyDescription
          profile={profile}
          changeProfile={changeProfile}
          register={register}
        />

        <CompanyContacts
          profile={profile}
          changeProfile={changeProfile}
          register={register}
          errors={errors}
        />

        <CompanyTags
          profile={profile}
          changeProfile={changeProfile}
          register={register}
          setValue={setValue}
          watch={watch}
        />
        <CompanyLocation
          profile={profile}
          changeProfile={changeProfile}
          register={register}
        />

        {changeProfile && (
          <CompanyActions
            isPending={isPending}
            setChangeProfile={setChangeProfile}
          />
        )}
      </form>
    </div>
  );
};

export default CompanyInformation;
