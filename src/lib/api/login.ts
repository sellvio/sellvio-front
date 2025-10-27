const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function loginUser(value) {
  console.log('Login payload:', value);
  const res = await fetch(`${baseURL}/auth/login`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(value),
  });

  if (!res.ok) {
    throw new Error('Invalid credentials');
  }

  const data = await res.json();
  console.log('Login response:', data);

  if (typeof window !== 'undefined') {
    const { access_token, refresh_token, user } = data.data;

    if (access_token) localStorage.setItem('access_token', access_token);
    if (refresh_token) localStorage.setItem('refresh_token', refresh_token);
    if (user) localStorage.setItem('user', JSON.stringify(user));
  }

  return data.data;
}
