import { Campaign, CompanyCardProps } from '@/feature/landing/type';
import axios from 'axios';

const baseURL: string | undefined = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchCompanyCards = async (): Promise<Campaign[]> => {
  if (!baseURL) throw new Error('API URL is not defined');

  const token = localStorage.getItem('access_token');
  if (!token) throw new Error('No token found');

  const response = await axios.get<{ data: { data: Campaign[] } }>(
    `${baseURL}/campaigns`,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return response.data.data.data;
};
