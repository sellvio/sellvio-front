import { Dispatch, SetStateAction } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { BusinessProfileSchema } from '../schema/businessUpdateProfileSchema';

export type BusinessTag = {
  tag_id: number;
  tags: { name: string };
};

export type BusinessProfileInfo = {
  company_name: string;
  business_email: string | null;
  phone: string | null;
  website_url: string | null;
  logo_url: string | null;
  description: string | null;
  business_employee_range: string | null;
  business_cover_image_url: string | null;
  legal_status: {
    id: number;
    code: string;
    name_en: string;
    name_ka: string;
  } | null;
  location: string | null;
  business_industry_name: string | null;
  business_tags: BusinessTag[];
};

export type BusinessProfileResponse = {
  success: boolean;
  data: {
    id: number;
    email: string;
    user_type_id: number;
    email_verified: boolean;
    created_at: string | null;
    business_profiles: BusinessProfileInfo | null;
  };
};

export type BusinessProfilePictureProps = {
  changeProfile: boolean;
  setChangeProfile: Dispatch<SetStateAction<boolean>>;
};

export type CompanyInformationProps = {
  changeProfile: boolean;
  setChangeProfile: Dispatch<SetStateAction<boolean>>;
  setPopupVisible: Dispatch<SetStateAction<boolean>>;
  setSuccsessUpdate: Dispatch<SetStateAction<boolean>>;
};

export type CompanyFieldsProps = {
  changeProfile: boolean;
  register: UseFormRegister<BusinessProfileSchema>;
  errors: FieldErrors<BusinessProfileSchema>;
};
