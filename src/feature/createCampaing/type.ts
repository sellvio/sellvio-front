import { FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { CreateCampaignFormInput } from './components/schema/createCampaignSchema';

export type CreatorType =
  CreateCampaignFormInput['target_creator_types'][number];

export type GoalCreatoresProps = {
  selected: CreateCampaignFormInput['target_creator_types'];
  setValue: UseFormSetValue<CreateCampaignFormInput>;
  errors: FieldErrors<CreateCampaignFormInput>;
};

export type PlatformsProps = {
  selected: CreateCampaignFormInput['platforms'];
  setValue: UseFormSetValue<CreateCampaignFormInput>;
  errors: FieldErrors<CreateCampaignFormInput>;
};

export type CompanyBasicsProps = {
  register: UseFormRegister<CreateCampaignFormInput>;
  errors: FieldErrors<CreateCampaignFormInput>;
};

export type PaymentType = CreateCampaignFormInput['payment_type'];

export type PaymentStructureProps = {
  register: UseFormRegister<CreateCampaignFormInput>;
  setValue: UseFormSetValue<CreateCampaignFormInput>;
  errors: FieldErrors<CreateCampaignFormInput>;
  selectedPaymentType?: PaymentType;
};
