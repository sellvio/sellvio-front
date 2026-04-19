import { CreateCampaignFormOutput } from '../components/schema/createCampaignSchema';

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function createCampaign(data: CreateCampaignFormOutput) {
  const token = localStorage.getItem('access_token');

  if (!token) {
    throw new Error('ავტორიზაცია არ არის გავლილი');
  }
  const formData = new FormData();

  formData.append('name', data.name);
  formData.append('budget', data.budget.toString());
  formData.append('duration_days', data.duration_days.toString());
  formData.append('payment_type', data.payment_type);
  formData.append('payment_amount', data.payment_amount.toString());
  formData.append('requirements', data.requirements);

  data.target_creator_types.forEach((type) => {
    formData.append('target_creator_types[]', type);
  });

  if (data.platforms) {
    data.platforms.forEach((platform) => {
      formData.append('platforms[]', platform);
    });
  }

  if (data.description) formData.append('description', data.description);
  if (data.budget_hidden !== undefined)
    formData.append('budget_hidden', data.budget_hidden.toString());
  if (data.status) formData.append('status', data.status);
  if (data.chat_type) formData.append('chat_type', data.chat_type);
  if (data.additional_requirements)
    formData.append('additional_requirements', data.additional_requirements);
  if (data.payment_per_quantity)
    formData.append(
      'payment_per_quantity',
      data.payment_per_quantity.toString()
    );
  if (data.target_audience)
    formData.append('target_audience', data.target_audience);

  if (data.media) {
    formData.append('media', JSON.stringify(data.media));
  }

  if (data.asset_files) {
    data.asset_files.forEach((file) => {
      formData.append('asset_files', file);
    });
  }

  const res = await fetch(`${baseUrl}/campaigns`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || 'კამპანიის შექმნა ვერ მოხერხდა');
  }

  return res.json();
}
