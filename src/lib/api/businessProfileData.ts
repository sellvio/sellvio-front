import { BusinessProfileSchema } from '@/feature/schema/businessUpdateProfileSchema';

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function businessProfileData() {
  const token = localStorage.getItem('access_token');
  const res = await fetch(`${baseURL}/auth/profile`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const errorData = await res.json();
    console.error('Profile fetch error:', errorData);
    throw new Error('Failed to fetch profile');
  }

  return res.json();
}

export async function updateBusinessProfile(
  updatedData: BusinessProfileSchema
) {
  const token = localStorage.getItem('access_token');

  try {
    const res = await fetch(`${baseURL}/auth/profile`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedData),
    });

    console.log('Response status:', res.status);

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(
        errorData.message || `Failed to update profile (${res.status})`
      );
    }

    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
}
