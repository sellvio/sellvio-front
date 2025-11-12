export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface ApiError {
  message: string;
  status: number;
  errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export type UserType = 'creator' | 'business';

export type CreatorRegisterBody = {
  email: string;
  password: string;
  user_type: 'creator';
  first_name: string;
  last_name: string;
  nickname?: string;
  date_of_birth: string;
};

export type BusinessRegisterBody = {
  email: string;
  password: string;
  user_type: 'business';
  company_name: string;
  company_nickName?: string;
  legal_status?: string;
  website_url?: string;
  business_email: string;
  phone?: string;
  business_tags?: string[];
};

export type RegisterBody = CreatorRegisterBody | BusinessRegisterBody;

export type RegisterResponse = {
  access_token: string;
  refresh_token: string;
  user: {
    id: number;
    email: string;
    user_type: UserType;
    email_verified: boolean;
    created_at: string;
  };
};
