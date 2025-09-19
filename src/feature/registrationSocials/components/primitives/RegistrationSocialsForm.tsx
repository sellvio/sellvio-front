'use client';
import { Button } from '@/components/ui/button';
import ReUsableInput from '@/feature/authorization/components/primitives/ReusableInput';
import TagInput from '../primitives/TagInput';
import { RegistrationSocialsFormProps } from '../../type';

const RegistrationSocialsForm: React.FC<RegistrationSocialsFormProps> = ({
  visible,
  register,
  errors,
}) => {
  return (
    <form className="space-y-[22px] mt-[39px]">
      <div className="space-y-[30px]">
        {visible.includes(1) && (
          <ReUsableInput
            label="Facebook URL"
            id="facebook"
            type="text"
            placeholder="მიუთითეთ Facebook URL"
            register={register}
            errors={errors}
            icon="/facebook.svg"
          />
        )}
        {visible.includes(2) && (
          <ReUsableInput
            label="Tik Tok URL"
            id="tiktok"
            type="text"
            placeholder="მიუთითეთ Tik Tok URL"
            register={register}
            errors={errors}
            icon="/tiktok.svg"
          />
        )}
        {visible.includes(3) && (
          <ReUsableInput
            label="Instagram URL"
            id="instagram"
            type="text"
            placeholder="მიუთითეთ Instagram URL"
            register={register}
            errors={errors}
            icon="/instagram.svg"
          />
        )}
        <div>
          <div className="m-auto my-[30px] w-full max-w-[360px] font-bold text-[18px] text-center">
            აირჩიეთ თეგების რომელი სფეროს წარმომადგენელიც ხართ:
          </div>
          <TagInput name="tags" register={register} errors={errors} />
        </div>
      </div>
      <Button variant="auth">შემდეგი</Button>
    </form>
  );
};

export default RegistrationSocialsForm;
