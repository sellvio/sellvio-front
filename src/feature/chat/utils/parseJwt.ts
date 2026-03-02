export const parseJwt = (token: string): Record<string, unknown> | null => {
  try {
    return JSON.parse(window.atob(token.split('.')[1]));
  } catch {
    return null;
  }
};
