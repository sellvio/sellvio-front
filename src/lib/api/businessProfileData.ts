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

  const data = await res.json();
  console.log('Fetched profile data:', data);
  return data;
}
