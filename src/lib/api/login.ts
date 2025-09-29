import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface LoginData {
  email: string;
  password: string;
}

export const loginUser = async (data: LoginData) => {
  if (!baseURL) throw new Error('API URL is not defined');

  try {
    const response = await axios.post(`${baseURL}/auth/login`, data);

    const { access_token, refresh_token, user } = response.data.data;

    if (typeof window !== 'undefined') {
      if (access_token) {
        localStorage.setItem('access_token', access_token);
      }
      if (refresh_token) {
        localStorage.setItem('refresh_token', refresh_token);
      }
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      }
    }

    return response.data.data;
  } catch (error) {
    throw new Error(`Server Error ${error}`);
  }
};
