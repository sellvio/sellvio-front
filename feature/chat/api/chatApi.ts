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
