export type StoredUserType = 'business' | 'creator';

// user_type_id values from the backend lookup table (GET /enums)
const USER_TYPE_BY_ID: Record<number, StoredUserType> = {
  1: 'creator',
  2: 'business',
};

export const getStoredUserType = (): StoredUserType | null => {
  try {
    const user = JSON.parse(localStorage.getItem('user') ?? 'null');
    if (user?.user_type === 'business' || user?.user_type === 'creator') {
      return user.user_type;
    }
    return USER_TYPE_BY_ID[Number(user?.user_type_id)] ?? null;
  } catch {
    return null;
  }
};
