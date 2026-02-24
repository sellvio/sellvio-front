const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const getHeaders = () => {
  const token =
    typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
};

export const ChatFromCampaing = async (campaignId: number) => {
  const res = await fetch(`${baseUrl}/campaigns/${campaignId}/chat-server`, {
    headers: getHeaders(),
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  return res.json();
};

export const ChatMember = async (serverId: number) => {
  const res = await fetch(
    `${baseUrl}/chat-servers/${serverId}/channels/get/members`,
    {
      headers: getHeaders(),
      cache: 'no-store',
    }
  );
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  return res.json();
};

export async function addChanel(serverId: number, data: any) {
  const res = await fetch(`${baseUrl}/chat-servers/${serverId}/channels`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function addMember(
  serverId: number,
  channelId: number,
  data: any
) {
  const res = await fetch(
    `${baseUrl}/chat-servers/${serverId}/channels/${channelId}/members/bulk`,
    {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data),
    }
  );
  return res.json();
}

export async function updateChannel(
  serverId: number,
  channelId: number,
  data: any
) {
  const res = await fetch(
    `${baseUrl}/chat-servers/${serverId}/channels/${channelId}`,
    {
      method: 'PATCH',
      headers: getHeaders(),
      body: JSON.stringify(data),
    }
  );
  return res.json();
}

export async function deleteChannel(serverId: number, channelId: number) {
  const res = await fetch(
    `${baseUrl}/chat-servers/${serverId}/channels/${channelId}`,
    {
      method: 'DELETE',
      headers: getHeaders(),
    }
  );
  return res.ok;
}
