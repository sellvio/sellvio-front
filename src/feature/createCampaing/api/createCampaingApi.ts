import { CreateCampaignFormOutput } from '../components/schema/createCampaignSchema';

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function createCampaign(data: CreateCampaignFormOutput) {
  const token = localStorage.getItem('access_token');

  if (!token) {
    throw new Error('ავტორიზაცია არ არის გავლილი');
  }

  const formData = new FormData();

  formData.append('name', data.name);
  formData.append('budget', String(data.budget));
  formData.append('duration_days', String(data.duration_days));
  formData.append('payment_type', data.payment_type);
  formData.append('payment_amount', String(data.payment_amount));
  formData.append('payment_per_quantity', String(data.payment_per_quantity));
  formData.append('requirements', data.requirements);
  formData.append('budget_hidden', String(data.budget_hidden));
  formData.append('status', data.status);
  formData.append('chat_type', data.chat_type);

  if (data.description?.trim()) {
    formData.append('description', data.description);
  }

  if (data.additional_requirements?.trim()) {
    formData.append('additional_requirements', data.additional_requirements);
  }

  if (data.target_audience?.trim()) {
    formData.append('target_audience', data.target_audience);
  }

  if (data.campaign_image_url?.trim()) {
    formData.append('campaign_image_url', data.campaign_image_url);
  }

  if (data.target_creator_types?.length) {
    data.target_creator_types.forEach((type) => {
      formData.append('target_creator_types', type);
    });
  }

  if (data.platforms?.length) {
    data.platforms.forEach((platform) => {
      formData.append('platforms', platform);
    });
  }

  if (data.tags?.length) {
    data.tags.forEach((tag) => {
      formData.append('tags', tag);
    });
  }

  if (data.media?.length) {
    formData.append('media', JSON.stringify(data.media));
  }

  console.log('📦 FormData contents:');
  for (const [key, value] of formData.entries()) {
    console.log(`${key}:`, value);
  }

  const res = await fetch(`${baseUrl}/campaigns`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const text = await res.text();

  console.log('📥 Response status:', res.status);
  console.log('📥 Response body:', text);

  if (!res.ok) {
    throw new Error(text || 'კამპანიის შექმნა ვერ მოხერხდა');
  }

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}
