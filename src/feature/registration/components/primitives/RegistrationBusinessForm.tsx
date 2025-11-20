'use client';
import { Button } from '@/components/ui/button';
import ReUsableInput from '@/feature/Authorization/components/primitives/ReusableInput';
import TagInput from '@/feature/registration/components/primitives/TagInput';
import { CompanyFormProps } from '@/feature/registrationSocials/type';
import EnumSelectInput from './CompanyLegalStatus';
import { useQuery } from '@tanstack/react-query';
import { getEnums } from '@/lib/api/login';

const RegistrationBusinessForm: React.FC<CompanyFormProps> = ({
  onSubmit,
  register,
  errors,
  setValue,
}) => {
  const { data } = useQuery({
    queryKey: ['industryEnums'],
    queryFn: getEnums,
  });
  const legalStatusOptions = data?.data?.map((items) => items.name_ka) || [];
  return (
    <form onSubmit={onSubmit} className="space-y-[22px] mt-[39px]">
      <div className="space-y-[30px]">
        <ReUsableInput
          label="კომპანიის სამართლებრივი სახელი"
          id="company_name"
          type="text"
          placeholder="შეიყვანე სახელი"
          register={register}
          errors={errors}
        />

        <EnumSelectInput
          label="კომპანიის სამართლებრივი სტატუსი"
          name="legal_status_id"
          enumOptions={legalStatusOptions}
          register={register}
          errors={errors}
          setValue={setValue}
        />
        <TagInput
          name="business_tags"
          register={register}
          errors={errors}
          setValue={setValue}
        />
        {errors.business_tags && (
          <p className="text-[10px] text-red-500">
            {errors.business_tags.message as string}
          </p>
        )}
        <ReUsableInput
          label="კომპანიის ვებსაიტი"
          id="website"
          type="url"
          placeholder="შეიყვანე საიტი"
          register={register}
          errors={errors}
        />
      </div>
      <Button variant="auth" type="submit">
        შემდეგი
      </Button>
    </form>
  );
};

export default RegistrationBusinessForm;
