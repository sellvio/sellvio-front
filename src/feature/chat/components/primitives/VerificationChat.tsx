'use client';

import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useChatStore } from '@/feature/common/stores/useChatStore';
import { useSocketStore } from '@/feature/common/stores/useSocketStore';
import VerificationReviewActions from './VerificationReviewActions';

type VerificationChatProps = {
  chatFull: boolean;
};

const VerificationChat = ({ chatFull }: VerificationChatProps) => {
  const selectedChannelId = useChatStore((s) => s.selectedChannelId);
  const isAdmin = useChatStore((s) => s.isAdmin);
  const socket = useSocketStore((s) => s.socket);
  const messages = useSocketStore((s) => s.messages);
  const isLoadingMessages = useSocketStore((s) => s.isLoadingMessages);

  const [loadingPostId, setLoadingPostId] = useState<number | null>(null);
  const [loadingAction, setLoadingAction] = useState<
    'verified' | 'rejected' | null
  >(null);

  const verificationVideos = messages.filter(
    (m) => m.messageType === 'verification_video'
  );

  useEffect(() => {
    if (socket && selectedChannelId) {
      socket.emit('verification:videos', { channelId: selectedChannelId });
    }
  }, [socket, selectedChannelId]);

  const handleVerify = (socialPostId: number) => {
    if (!socket || !selectedChannelId) return;

    setLoadingPostId(socialPostId);
    setLoadingAction('verified');

    socket.emit('verification:review', {
      channelId: selectedChannelId,
      socialPostId,
      verified: true,
    });

    setTimeout(() => {
      setLoadingPostId(null);
      setLoadingAction(null);
    }, 800);
  };

  const handleReject = (socialPostId: number) => {
    if (!socket || !selectedChannelId) return;

    setLoadingPostId(socialPostId);
    setLoadingAction('rejected');

    socket.emit('verification:review', {
      channelId: selectedChannelId,
      socialPostId,
      verified: false,
    });

    setTimeout(() => {
      setLoadingPostId(null);
      setLoadingAction(null);
    }, 800);
  };

  return (
    <div
      className={`flex flex-col bg-[#001541D6] w-full ${
        chatFull ? '' : 'max-w-[1440px]'
      } h-screen`}
    >
      <div className="flex-1 p-4 overflow-y-auto custom-scrollbar">
        {isLoadingMessages && verificationVideos.length === 0 ? (
          <div className="flex flex-col justify-center items-center gap-3 h-full">
            <Loader2 className="w-8 h-8 text-white animate-spin" />
            <span className="text-white/50 text-sm">
              იტვირთება ვერიფიკაციის ვიდეოები...
            </span>
          </div>
        ) : verificationVideos.length === 0 ? (
          <div className="flex justify-center items-center h-full text-white/50 text-center">
            ვიდეო გამოჩნდება აქ მხოლოდ მას შემდეგ, რაც ის დადასტურდება და
            სოციალური პოსტები დაემატება
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {verificationVideos.map((video) => (
              <div
                key={video.id}
                className="bg-[#FFFFFF1A] p-4 border border-white/10 rounded-xl"
              >
                <div className="flex gap-4">
                  <div className="relative flex-shrink-0 rounded-[8px] w-[112px] h-[126px] overflow-hidden">
                    <video
                      src={video.videoUrl ?? ''}
                      poster={video.videoCoverUrl ?? ''}
                      controls
                      className="rounded-lg w-[112px] h-[126px] object-cover"
                    />
                  </div>

                  <div className="flex flex-col flex-1 justify-between min-w-0">
                    <div>
                      <p className="font-bold text-[#FFFFFFAD] text-[15px]">
                        {video.videoTitle || 'უსათაურო ვიდეო'}
                      </p>
                      <p className="mt-1 text-[#FFFFFF80] text-sm">
                        შემქმნელი: {video.senderFirstName || 'უცნობი'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mt-4">
                  <p className="font-bold text-[#FFFFFFAD] text-[15px]">
                    სოციალური პოსტები
                  </p>

                  {video.socialPosts && video.socialPosts.length > 0 ? (
                    video.socialPosts.map((post) => {
                      const isCurrentLoading = loadingPostId === post.id;

                      return (
                        <div
                          key={post.id}
                          className="bg-[#FFFFFF0D] p-3 border border-white/10 rounded-[8px]"
                        >
                          <div className="flex flex-col gap-2">
                            <p className="text-white capitalize">
                              {post.platform}
                            </p>

                            <a
                              href={post.postUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#9CC2FF] text-sm hover:underline break-all"
                            >
                              {post.postUrl}
                            </a>

                            {post.postedAt && (
                              <p className="text-white/50 text-xs">
                                გამოქვეყნდა:{' '}
                                {new Date(post.postedAt).toLocaleDateString()}
                              </p>
                            )}

                            {isAdmin ? (
                              <VerificationReviewActions
                                isLoading={isCurrentLoading}
                                loadingAction={loadingAction}
                                onVerify={() => handleVerify(post.id)}
                                onReject={() => handleReject(post.id)}
                              />
                            ) : (
                              <div className="mt-1">
                                {post.isVerified ? (
                                  <span className="text-green-400 text-sm">
                                    ✓ ვერიფიცირებული
                                  </span>
                                ) : (
                                  <span className="text-yellow-400 text-sm">
                                    მომლოდინე
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-white/50 text-sm">
                      სოციალური პოსტები არ არის
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VerificationChat;
