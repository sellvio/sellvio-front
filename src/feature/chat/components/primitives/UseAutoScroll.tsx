import { useEffect, useRef } from 'react';

export const UseAutoScroll = (messages: any[], isLoadingChannel: boolean) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isAutoScrolling = useRef<boolean>(true);

  useEffect(() => {
    if (scrollRef.current && isAutoScrolling.current && !isLoadingChannel) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoadingChannel]);

  const handleScroll = () => {
    if (!scrollRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;

    isAutoScrolling.current = isNearBottom;
  };

  const scrollToBottom = () => {
    isAutoScrolling.current = true;
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  return { scrollRef, handleScroll, scrollToBottom };
};
