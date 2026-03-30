import { useEffect, useRef, useState } from 'react';
import { UseInfiniteScrollProps } from '@/feature/chat/types';

export const useInfiniteScroll = ({
  hasMore,
  isLoadingMessages,
  isLoadingChannel,
  selectedChannelId,
  loadMoreMessages,
  scrollRef,
  messages,
}: UseInfiniteScrollProps) => {
  const loadMoreTriggerRef = useRef<HTMLDivElement>(null);
  const prevScrollHeight = useRef(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    if (!loadMoreTriggerRef.current || !scrollRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (
          entry.isIntersecting &&
          hasMore &&
          !isLoadingMessages &&
          !isLoadingChannel &&
          selectedChannelId
        ) {
          setIsLoadingMore(true);
          prevScrollHeight.current = scrollRef.current!.scrollHeight;
          loadMoreMessages(selectedChannelId);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(loadMoreTriggerRef.current);
    return () => observer.disconnect();
  }, [
    hasMore,
    isLoadingMessages,
    selectedChannelId,
    loadMoreMessages,
    isLoadingChannel,
    messages,
    scrollRef,
  ]);

  useEffect(() => {
    if (scrollRef.current && isLoadingMore && !isLoadingMessages) {
      scrollRef.current.scrollTop +=
        scrollRef.current.scrollHeight - prevScrollHeight.current;
      setIsLoadingMore(false);
    }
  }, [isLoadingMessages, isLoadingMore, scrollRef]);

  return { loadMoreTriggerRef, isLoadingMore };
};
