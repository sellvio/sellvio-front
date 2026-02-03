import { useEffect, useRef, useState } from 'react';
import { UseInfiniteScrollProps } from '../type';

export const UseInfiniteScroll = ({
  hasMore,
  isLoadingMessages,
  isLoadingChannel,
  selectedChannelId,
  loadMoreMessages,
  scrollRef,
  messages = [],
}: UseInfiniteScrollProps & { messages: any[] }) => {
  const loadMoreTriggerRef = useRef<HTMLDivElement>(null);
  const prevScrollHeight = useRef<number>(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    if (!loadMoreTriggerRef.current || !scrollRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (
          target.isIntersecting &&
          hasMore &&
          !isLoadingMessages &&
          !isLoadingChannel &&
          selectedChannelId
        ) {
          setIsLoadingMore(true);
          prevScrollHeight.current = scrollRef.current.scrollHeight;
          const oldestMessageId = messages[0]?.id;
          loadMoreMessages(selectedChannelId, oldestMessageId);
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
      const diff = scrollRef.current.scrollHeight - prevScrollHeight.current;
      scrollRef.current.scrollTop += diff;
      setIsLoadingMore(false);
    }
  }, [isLoadingMessages, isLoadingMore, scrollRef]);

  return { loadMoreTriggerRef, isLoadingMore };
};
