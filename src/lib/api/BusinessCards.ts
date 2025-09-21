import { CompanyCardProps } from '@/feature/landing/type';
import axios from 'axios';

const baseURL: string | undefined = process.env.NEXT_PUBLIC_API_URL;

export const fetchCompanyCards = async (): Promise<CompanyCardProps[]> => {
  if (!baseURL) {
    throw new Error('API URL is not defined');
  }

  try {
    const response = await axios.get<CompanyCardProps[]>(`${baseURL}/login`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch Cards');
  }
};
