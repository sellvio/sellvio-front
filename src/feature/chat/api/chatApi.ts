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

export const ChatMember = async () => {
  const token = localStorage.getItem('access_token');
  const res = await fetch(`${baseUrl}/chat-servers/7/channels/get/members`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  return res.json();
};

export async function addChanel(data) {
  const token = localStorage.getItem('access_token');
  const res = await fetch(`${baseUrl}/chat-servers/7/channels`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json();
    console.error('Profile fetch error:', errorData);
    throw new Error('Failed to fetch profile');
  }

  return res.json();
}

export async function addMember(data, channelId) {
  const token = localStorage.getItem('access_token');
  const res = await fetch(
    `${baseUrl}/chat-servers/7/channels/${channelId}/members/bulk`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  );

  if (!res.ok) {
    const errorData = await res.json();
    console.error('Profile fetch error:', errorData);
    throw new Error('Failed to fetch profile');
  }

  return res.json();
}

export async function updateChamel(data, channelId) {
  const token = localStorage.getItem('access_token');

  const res = await fetch(`${baseUrl}/chat-servers/7/channels/${channelId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json();
    console.error('Channel patch error:', errorData);
    throw new Error('Failed to patch channel');
  }

  return res.json();
}

export async function deleteChannel(channelId) {
  const token = localStorage.getItem('access_token');

  const res = await fetch(`${baseUrl}/chat-servers/7/channels/${channelId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const errorData = await res.json();
    console.error('Channel delete error:', errorData);
    throw new Error('Failed to delete channel');
  }

  return true;
}
