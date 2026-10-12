import { CreateCampaignFormOutput } from '../components/schema/createCampaignSchema';

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const translateBackendMessage = (status: number, message: string) => {
  if (status === 401) return 'სესია ამოიწურა, გთხოვთ თავიდან შეხვიდეთ';
  if (status === 403) {
    if (/verif/i.test(message)) {
      return 'კამპანიის შესაქმნელად საჭიროა ელ-ფოსტის დადასტურება';
    }
    return 'კამპანიის შექმნა შეუძლია მხოლოდ ბიზნეს ანგარიშს';
  }
  if (status === 413) return 'ატვირთული ფაილები ძალიან დიდია';
  if (/payment_type/i.test(message)) {
    return 'არჩეული გადახდის ტიპი სერვერზე ჯერ არ არის მხარდაჭერილი. გამოიყენეთ Cost per View';
  }
  if (/image\/video/i.test(message)) {
    return 'დაშვებულია მხოლოდ სურათები და ვიდეოები';
  }
  return message;
};

const extractErrorMessage = (status: number, text: string) => {
  let message = '';
  try {
    const parsed = JSON.parse(text);
    const raw = parsed?.message;
    message = Array.isArray(raw) ? raw.join(', ') : String(raw ?? '');
  } catch {
    message = text;
  }
  return (
    translateBackendMessage(status, message) || 'კამპანიის შექმნა ვერ მოხერხდა'
  );
};

export async function createCampaign(data: CreateCampaignFormOutput) {
  if (!baseUrl) {
    throw new Error('API მისამართი არ არის განსაზღვრული');
  }

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
  formData.append('status', data.status);
  formData.append('chat_type', data.chat_type);

  // The backend uses implicit conversion, which turns the string "false" into
  // `true`. `budget_hidden` defaults to false, so only send it when enabled.
  if (data.budget_hidden) {
    formData.append('budget_hidden', 'true');
  }

  if (data.description?.trim()) {
    formData.append('description', data.description.trim());
  }

  if (data.additional_requirements?.trim()) {
    formData.append(
      'additional_requirements',
      data.additional_requirements.trim()
    );
  }

  if (data.target_audience?.trim()) {
    formData.append('target_audience', data.target_audience.trim());
  }

  if (data.campaign_image_url) {
    formData.append('campaign_image_url', data.campaign_image_url);
  }

  // Arrays are sent as JSON strings: the backend DTO parses them with
  // JSON.parse, which (unlike comma-splitting) keeps tags containing commas
  // intact and works the same for single-item arrays.
  formData.append(
    'target_creator_types',
    JSON.stringify(data.target_creator_types)
  );

  if (data.platforms?.length) {
    formData.append('platforms', JSON.stringify(data.platforms));
  }

  if (data.tags?.length) {
    formData.append('tags', JSON.stringify(data.tags));
  }

  if (data.media?.length) {
    formData.append('media', JSON.stringify(data.media));
  }

  if (data.asset_files?.length) {
    data.asset_files.forEach((file) => {
      formData.append('asset_files', file);
    });
  }

  let res: Response;
  try {
    res = await fetch(`${baseUrl}/campaigns`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
  } catch {
    throw new Error('სერვერთან დაკავშირება ვერ მოხერხდა');
  }

  const text = await res.text();

  if (!res.ok) {
    throw new Error(extractErrorMessage(res.status, text));
  }

  try {
    const parsed = JSON.parse(text);
    return parsed?.data ?? parsed;
  } catch {
    return text;
  }
}
