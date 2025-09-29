import { CompanyCardProps } from '@/feature/landing/type';
import axios from 'axios';

const baseURL: string | undefined = process.env.NEXT_PUBLIC_API_BASE_URL;

export const businessProfileData = async () => {
  if (!baseURL) {
    throw new Error('API URL is not defined');
  }

  try {
    const response = await axios.get<CompanyCardProps[]>(
      `${baseURL}/auth/profile`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error('Failed to fetch Cards');
  }
};
