const baseURL: string | undefined = process.env.NEXT_PUBLIC_API_BASE_URL;

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

/**
 * Authenticated JSON request against the Nest backend. Unwraps the
 * `{ success, data }` envelope added by the backend TransformInterceptor.
 */
export async function authRequest<T>(
  path: string,
  init: { method?: string; body?: unknown } = {}
): Promise<T> {
  if (!baseURL) throw new ApiError('API URL is not defined', 0);

  const token = localStorage.getItem('access_token');
  if (!token) throw new ApiError('ავტორიზაცია არ არის გავლილი', 401);

  const res = await fetch(`${baseURL}${path}`, {
    method: init.method ?? 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      ...(init.body !== undefined ? { 'Content-Type': 'application/json' } : {}),
    },
    body: init.body !== undefined ? JSON.stringify(init.body) : undefined,
  });

  const json = await res.json().catch(() => null);

  if (!res.ok) {
    const raw = json?.message;
    const message = Array.isArray(raw) ? raw.join(', ') : raw;
    throw new ApiError(message || `Request failed (${res.status})`, res.status);
  }

  return (json?.data ?? json) as T;
}
