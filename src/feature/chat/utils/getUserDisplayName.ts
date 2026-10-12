import { User } from '../types';

export const getUserDisplayName = ({ user }: User) => {
  const fullName = [user.first_name, user.last_name].filter(Boolean).join(' ');
  return fullName || user.company_name || user.email || `User ${user.id}`;
};
