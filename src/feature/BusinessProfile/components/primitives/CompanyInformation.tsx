'use client';
import { useEffect, useMemo } from 'react';
import {
  businessProfileData,
  BusinessProfileUpdatePayload,
  updateBusinessProfile,
} from '@/lib/api/businessProfileData';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
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
import {
  BusinessProfileInfo,
  BusinessProfileResponse,
  CompanyInformationProps,
} from '../../type';

// Optional fields the backend allows clearing through `clear_fields`
const CLEARABLE_FIELDS = [
  'business_email',
  'phone',
  'website_url',
  'description',
  'location',
  'business_industry_name',
  'business_employee_range',
] as const;

const toFormValues = (
  profile: BusinessProfileInfo | null | undefined
): BusinessProfileSchema => ({
  company_name: profile?.company_name ?? '',
  business_email: profile?.business_email ?? '',
  phone: profile?.phone ?? '',
  website_url: profile?.website_url ?? '',
  description: profile?.description ?? '',
  business_employee_range: profile?.business_employee_range ?? '',
  location: profile?.location ?? '',
  business_industry_name: profile?.business_industry_name ?? '',
  business_tags: profile?.business_tags?.map((tag) => tag.tag_id) ?? [],
});

const CompanyInformation = ({
  changeProfile,
  setChangeProfile,
  setPopupVisible,
  setSuccsessUpdate,
}: CompanyInformationProps) => {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery<BusinessProfileResponse>({
    queryKey: ['businessProfile'],
    queryFn: businessProfileData,
  });

  const profile = data?.data?.business_profiles;
  const defaultValues = useMemo(() => toFormValues(profile), [profile]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<BusinessProfileSchema>({
    resolver: zodResolver(businessProfileSchema),
    defaultValues,
  });

  // Keep the form in sync with the server data and discard edits on cancel
  useEffect(() => {
    if (!changeProfile) reset(defaultValues);
  }, [changeProfile, defaultValues, reset]);

  const { mutate, isPending } = useMutation({
    mutationFn: updateBusinessProfile,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['businessProfile'] });
      setChangeProfile(false);
      setSuccsessUpdate(true);
    },
    onError: (error: Error) =>
      toast.error(`პროფილის განახლება ვერ მოხერხდა: ${error.message}`),
  });

  const submitForm = (formData: BusinessProfileSchema) => {
    const payload: BusinessProfileUpdatePayload = {
      company_name: formData.company_name.trim(),
    };
    const clearFields: string[] = [];

    CLEARABLE_FIELDS.forEach((field) => {
      const value = (formData[field] ?? '').trim();
      const initial = (defaultValues[field] ?? '').trim();
      if (value === initial) return;
      if (value) {
        payload[field] = value;
      } else {
        clearFields.push(field);
      }
    });

    const tags = formData.business_tags ?? [];
    const initialTags = defaultValues.business_tags ?? [];
    if (
      tags.length !== initialTags.length ||
      tags.some((id) => !initialTags.includes(id))
    ) {
      payload.business_tags = tags;
    }

    if (clearFields.length) payload.clear_fields = clearFields;

    mutate(payload);
  };

  if (isError) {
    return (
      <p className="mt-[72px] text-center">პროფილის ჩატვირთვა ვერ მოხერხდა</p>
    );
  }

  return isLoading ? (
    <CompanyInformationSkeleton />
  ) : (
    <div className="flex flex-col items-center mt-[72px] w-full">
      <form
        onSubmit={handleSubmit(submitForm)}
        className="flex flex-col gap-[31px] w-full max-w-[1225px]"
      >
        <CompanyHeader
          changeProfile={changeProfile}
          register={register}
          errors={errors}
        />

        <CompanyDescription
          changeProfile={changeProfile}
          register={register}
          errors={errors}
        />

        <CompanyContacts
          changeProfile={changeProfile}
          register={register}
          errors={errors}
        />

        <CompanyTags
          profile={profile}
          changeProfile={changeProfile}
          selectedTagIds={watch('business_tags') ?? []}
          onChange={(ids) =>
            setValue('business_tags', ids, { shouldDirty: true })
          }
        />

        <CompanyLocation
          changeProfile={changeProfile}
          register={register}
          errors={errors}
        />

        {changeProfile && (
          <CompanyActions
            isPending={isPending}
            setPopupVisible={setPopupVisible}
          />
        )}
      </form>
    </div>
  );
};

export default CompanyInformation;
