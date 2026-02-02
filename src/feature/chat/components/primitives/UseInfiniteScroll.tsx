import { useEffect, useRef, useState } from 'react';
import { UseInfiniteScrollProps } from '../type';

export const UseInfiniteScroll = ({
  hasMore,
  isLoadingMessages,
  isLoadingChannel,
  selectedChannelId,
  loadMoreMessages,
  scrollRef,
}: UseInfiniteScrollProps) => {
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
          prevScrollHeight.current = scrollRef.current?.scrollHeight || 0;
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
  ]);

  useEffect(() => {
    if (scrollRef.current && isLoadingMore && !isLoadingMessages) {
      const currentScrollHeight = scrollRef.current.scrollHeight;
      const scrollDiff = currentScrollHeight - prevScrollHeight.current;
      scrollRef.current.scrollTop += scrollDiff;
      setIsLoadingMore(false);
    }
  }, [isLoadingMessages, isLoadingMore]);

  return { loadMoreTriggerRef, isLoadingMore };
};
