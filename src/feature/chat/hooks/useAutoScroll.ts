import { useEffect, useRef } from 'react';
import { Message } from '@/feature/chat/types';

export const useAutoScroll = (
  messages: Message[],
  isLoadingChannel: boolean
) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isAutoScrolling = useRef(true);

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
    if (scrollRef.current)
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  };

  return { scrollRef, handleScroll, scrollToBottom };
};
