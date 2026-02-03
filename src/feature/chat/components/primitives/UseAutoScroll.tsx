import { useEffect, useRef } from 'react';

export const UseAutoScroll = (messages: any[], isLoadingChannel: boolean) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isAutoScrolling = useRef<boolean>(true);

  useEffect(() => {
    if (!isLoadingChannel && isAutoScrolling.current && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoadingChannel]);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    isAutoScrolling.current = scrollHeight - scrollTop - clientHeight < 100;
  };

  const scrollToBottom = () => {
    isAutoScrolling.current = true;
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  return { scrollRef, handleScroll, scrollToBottom };
};
