'use client';

import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { ChatMember } from '../../api/chatApi';
import { User } from '../../types';
import InviteMemberView from './InviteMemberView';

const InviteMember = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['member'],
    queryFn: ChatMember,
  });

  const users: User[] = data?.data ?? [];

  const filteredUsers = useMemo(() => {
    if (!searchTerm.trim()) return users;
    return users.filter((u) =>
      u.user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  const toggleUser = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const selectedUsers = users.filter((u) => selectedIds.includes(u.user.id));

  return (
    <InviteMemberView
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      filteredUsers={filteredUsers}
      selectedUsers={selectedUsers}
      selectedIds={selectedIds}
      toggleUser={toggleUser}
      isLoading={isLoading}
      isError={isError}
    />
  );
};

export default InviteMember;
