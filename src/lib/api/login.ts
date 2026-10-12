import { CreatorRegisterBody, registrationUser } from '@/types/api';
import { BusinessRegisterBody } from '@/feature/registrationSocials/type';

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

type UserType = 'business' | 'creator';

// Backend error shape: { statusCode, message: string | string[], error, ... }
async function getErrorMessage(res: Response, fallback: string) {
  try {
    const errorData = await res.json();
    if (Array.isArray(errorData?.message)) return errorData.message.join(', ');
    if (typeof errorData?.message === 'string') return errorData.message;
  } catch {
    // response body is not JSON
  }
  return fallback;
}

function storeSession(
  access_token?: string,
  refresh_token?: string,
  user?: Record<string, unknown>
) {
  if (typeof window === 'undefined') return;
  if (access_token) localStorage.setItem('access_token', access_token);
  if (refresh_token) localStorage.setItem('refresh_token', refresh_token);
  if (user) localStorage.setItem('user', JSON.stringify(user));
}

export function logoutUser() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('user');
}

export async function loginUser(value: registrationUser) {
  const res = await fetch(`${baseURL}/auth/login`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(value),
  });

  if (!res.ok) {
    if (res.status === 401) {
      throw new Error('არასწორი ემაილი ან პაროლი');
    }
    throw new Error(await getErrorMessage(res, 'ავტორიზაცია ვერ მოხერხდა'));
  }

  const data = await res.json();
  const { access_token, refresh_token, user } = data.data;

  // Login response only has user_type_id, so resolve business/creator from the profile
  const user_type = await getUserType(access_token);

  storeSession(access_token, refresh_token, { ...user, user_type });

  return { ...data.data, user: { ...user, user_type } };
}

async function getUserType(accessToken: string): Promise<UserType> {
  const res = await fetch(`${baseURL}/auth/profile`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) {
    throw new Error('პროფილის ჩატვირთვა ვერ მოხერხდა');
  }

  const profile = await res.json();
  return profile.data?.business_profiles ? 'business' : 'creator';
}

export async function registerUser(
  value: CreatorRegisterBody | BusinessRegisterBody
) {
  const res = await fetch(`${baseURL}/auth/register`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(value),
  });

  if (!res.ok) {
    if (res.status === 409) {
      throw new Error('ეს ემაილი უკვე რეგისტრირებულია');
    }
    throw new Error(await getErrorMessage(res, 'რეგისტრაციის შეცდომა'));
  }

  const data = await res.json();
  const { access_token, refresh_token, user } = data.data || data;
  // Register response only has user_type_id; the type is known from the request
  const userWithType = user ? { ...user, user_type: value.user_type } : user;

  storeSession(access_token, refresh_token, userWithType);

  return { ...(data.data || data), user: userWithType };
}

export async function verifyEmail(token: string) {
  const res = await fetch(`${baseURL}/auth/verify-email`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token }),
  });

  if (!res.ok) {
    throw new Error(
      await getErrorMessage(res, 'ემაილის ვერიფიკაცია ვერ მოხერხდა')
    );
  }

  const data = await res.json();
  return data.data;
}

export async function resendVerification(email: string) {
  const res = await fetch(`${baseURL}/auth/resend-verification`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });

  if (!res.ok) {
    throw new Error(await getErrorMessage(res, 'წერილის გაგზავნა ვერ მოხერხდა'));
  }

  const data = await res.json();
  return data.data;
}

export async function getEnums() {
  const response = await fetch(`${baseURL}/enums/legal-statuses/all`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('Network response was not ok: ' + response.status);
  }
  return response.json();
}

export async function getIndustryTags() {
  const response = await fetch(`${baseURL}/enums/tags/all`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('Network response was not ok: ' + response.status);
  }
  return response.json();
}
