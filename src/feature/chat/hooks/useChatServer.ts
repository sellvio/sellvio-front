import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ChatFromCampaing } from '@/feature/chat/api/chatApi';
import { ChatChannel } from '@/feature/chat/types';
import { useChatStore } from '@/feature/common/stores/useChatStore';

export const CHAT_SERVER_QUERY_KEY = 'channelName';

export const useChatServer = (campaignId: number | null) => {
  const setServerId = useChatStore((state) => state.setServerId);

  const query = useQuery({
    queryKey: [CHAT_SERVER_QUERY_KEY, campaignId],
    queryFn: () => ChatFromCampaing(campaignId!),
    enabled: !!campaignId,
    retry: false,
  });

  const server = query.data?.data;

  useEffect(() => {
    if (server?.id) setServerId(server.id, server.name ?? null);
  }, [server?.id, server?.name, setServerId]);

  const channels: ChatChannel[] = server?.chat_channels ?? [];

  return {
    ...query,
    server,
    channels,
  };
};
