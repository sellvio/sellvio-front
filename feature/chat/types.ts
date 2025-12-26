export type ChannelsProps = {
  setChatInfoOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
export type User = {
  user: {
    id: string;
    email: string;
  };
};
export type Props = {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  filteredUsers: User[];
  selectedUsers: User[];
  selectedIds: string[];
  toggleUser: (id: string) => void;
  isLoading: boolean;
  isError: boolean;
};
