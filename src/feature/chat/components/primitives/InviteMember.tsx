'use client';

import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { ChatInvitableMembers } from '../../api/chatApi';
import { User } from '../../types';
import InviteMemberView from './InviteMemberView';
import { useChatStore } from '@/feature/common/stores/useChatStore';
import { getUserDisplayName } from '../../utils/getUserDisplayName';

type InviteMemberProps = {
  channelId: number;
  backHref: string;
};

const InviteMember = ({ channelId, backHref }: InviteMemberProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const serverId = useChatStore((state) => state.serverId);

  // მხოლოდ ის წევრები, ვინც ამ არხში ჯერ არ არიან
  const { data, isLoading, isError } = useQuery({
    queryKey: ['invitableMembers', serverId, channelId],
    queryFn: () => ChatInvitableMembers(serverId!, channelId),
    enabled: !!serverId && !!channelId,
  });

  const users: User[] = useMemo(() => data?.data ?? [], [data]);

  const filteredUsers = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return users;
    return users.filter(
      (u) =>
        getUserDisplayName(u).toLowerCase().includes(term) ||
        (u.user.email ?? '').toLowerCase().includes(term)
    );
  }, [users, searchTerm]);

  const toggleUser = (id: number) => {
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
      channelId={channelId}
      backHref={backHref}
      onInvited={() => setSelectedIds([])}
    />
  );
};

export default InviteMember;
