import { CreatorRegisterBody, registrationUser } from '@/types/api';

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function loginUser(value: registrationUser) {
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

export async function registerUser(value: CreatorRegisterBody) {
  const res = await fetch(`${baseURL}/auth/register`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(value),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(
      errorData.message
        ? Array.isArray(errorData.message)
          ? errorData.message.join(', ')
          : errorData.message
        : 'Registration failed'
    );
  }

  const data = await res.json();

  if (typeof window !== 'undefined') {
    const { access_token, refresh_token, user } = data.data || data;

    if (access_token) localStorage.setItem('access_token', access_token);
    if (refresh_token) localStorage.setItem('refresh_token', refresh_token);
    if (user) localStorage.setItem('user', JSON.stringify(user));
  }

  return data;
}
