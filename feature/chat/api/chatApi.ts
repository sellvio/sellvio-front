const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const ChatFromCampaing = async (id: number) => {
  const token = localStorage.getItem('access_token');
  const res = await fetch(`${baseUrl}/campaigns/${id}/chat-server`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  return res.json();
};

export async function addChanel() {
  const token = localStorage.getItem('access_token');
  const res = await fetch(`${baseUrl}/chat-servers/7/channels`, {
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
