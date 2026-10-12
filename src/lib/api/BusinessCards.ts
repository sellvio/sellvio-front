import axios, { isAxiosError } from 'axios';
import {
  BusinessCampaign,
  Campaign,
  CampaignDetails,
} from '@/feature/landing/type';

const baseURL: string | undefined = process.env.NEXT_PUBLIC_API_BASE_URL;

const getToken = () =>
  typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;

const getErrorMessage = (error: unknown, fallback: string) => {
  if (isAxiosError(error)) {
    const message = error.response?.data?.message;
    if (Array.isArray(message)) return message.join(', ');
    if (typeof message === 'string') return message;
  }
  return error instanceof Error ? error.message : fallback;
};

export const fetchCompanyCards = async (): Promise<Campaign[]> => {
  if (!baseURL) throw new Error('API URL is not defined');

  const token = getToken();
  if (!token) throw new Error('No token found');

  const response = await axios.get<{ data: { data: Campaign[] } }>(
    `${baseURL}/campaigns`,
    {
      params: { status: 'active', limit: 3 },
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return response.data.data.data;
};

export const fetchCampaignById = async (
  id: number
): Promise<CampaignDetails> => {
  if (!baseURL) throw new Error('API URL is not defined');

  const token = getToken();
  if (!token) throw new Error('No token found');

  try {
    const response = await axios.get<{ data: CampaignDetails }>(
      `${baseURL}/campaigns/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data.data;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'Failed to fetch campaign'));
  }
};

export const participateInCampaign = async (id: number) => {
  if (!baseURL) throw new Error('API URL is not defined');

  const token = getToken();
  if (!token) throw new Error('No token found');

  try {
    const response = await axios.post(
      `${baseURL}/campaigns/${id}/participate`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data.data;
  } catch (error) {
    throw new Error(getErrorMessage(error, 'Failed to join campaign'));
  }
};

export const fetchMyCampaigns = async (): Promise<BusinessCampaign[]> => {
  if (!baseURL) throw new Error('API URL is not defined');

  const token = getToken();
  if (!token) throw new Error('No token found');

  const user = JSON.parse(localStorage.getItem('user') ?? 'null');
  if (!user?.id) throw new Error('No user found');

  const response = await axios.get<{ data: { data: BusinessCampaign[] } }>(
    `${baseURL}/campaigns`,
    {
      params: { business_id: user.id, limit: 100 },
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return response.data.data.data;
};
