'use client';

import { useEffect, useState } from 'react';
import { Loader2, X } from 'lucide-react';
import { useChatStore } from '@/feature/common/stores/useChatStore';
import { useSocketStore } from '@/feature/common/stores/useSocketStore';
import VerificationReviewActions from './VerificationReviewActions';
import Image from 'next/image';

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

  const [openVideoId, setOpenVideoId] = useState<number | null>(null);

  const verificationVideos = messages.filter(
    (m) => m.messageType === 'verification_video'
  );

  useEffect(() => {
    if (socket && selectedChannelId) {
      socket.emit('verification:videos', { channelId: selectedChannelId });
    }
  }, [socket, selectedChannelId]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenVideoId(null);
      }
    };

    if (openVideoId !== null) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [openVideoId]);

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

  const handleOpenVideo = (videoId: number) => {
    setOpenVideoId(videoId);
  };

  const handleCloseVideo = () => {
    setOpenVideoId(null);
  };

  const openedVideo = verificationVideos.find((v) => v.id === openVideoId);

  return (
    <>
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
                  className="flex gap-[14px] bg-[#FFFFFF36] p-4 border border-white/10 rounded-xl max-w-[529px]"
                >
                  <div className="flex gap-4">
                    <div className="relative flex-shrink-0 rounded-[8px] w-[112px] h-[126px] overflow-hidden">
                      <button
                        type="button"
                        onClick={() => handleOpenVideo(video.id)}
                        className="relative rounded-[8px] w-full h-full overflow-hidden"
                      >
                        <div className="top-1/2 left-1/2 absolute flex justify-center items-center bg-[#FFFFFF68] rounded-full w-[46px] h-[46px] -translate-x-1/2 -translate-y-1/2">
                          <Image
                            src={'/images/svg/playButton.svg'}
                            alt="playButton"
                            width={15}
                            height={17}
                          />
                        </div>
                        <video
                          src={video.videoUrl ?? ''}
                          poster={video.videoCoverUrl ?? ''}
                          controls={false}
                          className="bg-black rounded-[8px] w-[112px] h-[126px] object-cover cursor-pointer"
                        />
                      </button>
                    </div>
                  </div>

                  <div className="w-full">
                    {video.socialPosts && video.socialPosts.length > 0 ? (
                      video.socialPosts.map((post) => {
                        const isCurrentLoading = loadingPostId === post.id;

                        return (
                          <div key={post.id}>
                            <div className="flex flex-col gap-2 w-full">
                              <div className="bg-[#3012B31A] px-[4px] py-[3px] font-semibold text-[#FFFFFFB0] text-[18px]">
                                {video.videoTitle && (
                                  <p className="font-semibold text-[16px] text-white leading-[20px]">
                                    {video.videoTitle}
                                  </p>
                                )}

                                {video.videoDescription && (
                                  <p className="text-[14px] text-white/60 leading-[18px]">
                                    {video.videoDescription}
                                  </p>
                                )}
                              </div>

                              <a
                                href={post.postUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-[#3012B31A] px-[9px] py-[2px] font-semibold text-[#FFFFFFB0] text-[18px]"
                              >
                                Link
                              </a>

                              {isAdmin ? (
                                <div className="w-full">
                                  <VerificationReviewActions
                                    isLoading={isCurrentLoading}
                                    loadingAction={loadingAction}
                                    onVerify={() => handleVerify(post.id)}
                                    onReject={() => handleReject(post.id)}
                                  />
                                </div>
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

      {openedVideo && (
        <div
          className="z-50 fixed inset-0 flex justify-center items-center bg-[#00000063] p-4"
          onClick={handleCloseVideo}
        >
          <button
            type="button"
            onClick={handleCloseVideo}
            className="top-[23px] right-[32px] z-10 absolute flex justify-center items-center bg-[#313A51C2] rounded-[16px] w-[65px] h-[65px] text-white cursor-pointer"
          >
            <X className="w-[35px] h-[35px]" />
          </button>
          <div
            className="bg-[url('/images/png/iPhoneFrame.png')] bg-cover bg-center px-[15px] py-[16px] rounded-[12px] w-full max-w-[442px] h-[910px] overflow-hidden relativ"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              src={openedVideo.videoUrl ?? undefined}
              poster={openedVideo.videoCoverUrl ?? undefined}
              controls
              autoPlay
              className="rounded-[60px] w-full h-full object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default VerificationChat;
