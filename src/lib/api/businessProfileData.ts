import { BusinessProfileSchema } from '@/feature/schema/businessUpdateProfileSchema';

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export type BusinessProfileUpdatePayload = Partial<
  Omit<BusinessProfileSchema, 'business_tags'>
> & {
  business_tags?: number[];
  clear_fields?: string[];
};

const getErrorMessage = async (res: Response, fallback: string) => {
  try {
    const errorData = await res.json();
    const message = errorData?.message;
    if (Array.isArray(message)) return message.join(', ');
    if (typeof message === 'string' && message) return message;
  } catch {
    // response body is not JSON
  }
  return `${fallback} (${res.status})`;
};

const getToken = () => {
  const token = localStorage.getItem('access_token');
  if (!token) throw new Error('No token found');
  return token;
};

export async function businessProfileData() {
  const token = getToken();
  const res = await fetch(`${baseURL}/auth/profile`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error(await getErrorMessage(res, 'Failed to fetch profile'));
  }

  return res.json();
}

export async function updateBusinessProfile(
  updatedData: BusinessProfileUpdatePayload
) {
  const token = getToken();

  const res = await fetch(`${baseURL}/auth/profile`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updatedData),
  });

  if (!res.ok) {
    throw new Error(await getErrorMessage(res, 'Failed to update profile'));
  }

  return res.json();
}

// PATCH /auth/profile accepts multipart/form-data; for business users the
// files must be sent under the DB field names logo_url / business_cover_image_url.
export async function uploadProfileImages(data: {
  logo?: File;
  coverImage?: File;
}) {
  const token = getToken();

  const formData = new FormData();

  if (data.logo) {
    formData.append('logo_url', data.logo);
  }

  if (data.coverImage) {
    formData.append('business_cover_image_url', data.coverImage);
  }

  const res = await fetch(`${baseURL}/auth/profile`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!res.ok) {
    throw new Error(await getErrorMessage(res, 'Failed to upload images'));
  }

  return res.json();
}
