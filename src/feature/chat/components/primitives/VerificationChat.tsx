'use client';

import { useEffect, useState } from 'react';
import {
  Loader2,
  X,
  Link2,
  Instagram,
  Youtube,
  Facebook,
  Globe,
  Video,
} from 'lucide-react';
import { useChatStore } from '@/feature/common/stores/useChatStore';
import { useSocketStore } from '@/feature/common/stores/useSocketStore';
import VerificationReviewActions from './VerificationReviewActions';
import Image from 'next/image';

type VerificationChatProps = {
  chatFull: boolean;
};

type ReviewStatus = 'verified' | 'rejected' | 'pending';

const icons = {
  instagram: Instagram,
  youtube: Youtube,
  facebook: Facebook,
  tiktok: Video,
  twitter: Globe,
  x: Globe,
};

const getPlatformIcon = (platform?: string) => {
  const key = platform?.toLowerCase().trim() as keyof typeof icons;
  const Icon = icons[key] || Link2;

  return <Icon className="w-4 h-4 text-white/80" />;
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
  const [reviewedPosts, setReviewedPosts] = useState<
    Record<number, ReviewStatus>
  >({});

  const verificationVideos = messages.filter(
    (m) => m.messageType === 'verification_video'
  );

  // verification:videos-ს joinChannel უკვე აგზავნის არხის არჩევისას.
  // backend-ი ინახავს მხოლოდ is_verified-ს, ამიტომ "უარყოფილი" მხოლოდ ლოკალურია
  const getReviewStatus = (postId: number, isVerified: boolean) => {
    const localStatus = reviewedPosts[postId];
    if (localStatus === 'pending') return undefined;
    return localStatus ?? (isVerified ? 'verified' : undefined);
  };

  useEffect(() => {
    setReviewedPosts({});
  }, [selectedChannelId]);

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

  const clearLoading = () => {
    setTimeout(() => {
      setLoadingPostId(null);
      setLoadingAction(null);
    }, 800);
  };

  const handleVerify = (socialPostId: number, isVerified: boolean) => {
    if (!socket || !selectedChannelId) return;

    const currentStatus = getReviewStatus(socialPostId, isVerified);

    setLoadingPostId(socialPostId);
    setLoadingAction('verified');

    if (currentStatus === 'verified') {
      // ვერიფიკაციის გაუქმება სერვერზეც უნდა აისახოს
      socket.emit('verification:review', {
        channelId: selectedChannelId,
        socialPostId,
        verified: false,
      });
      setReviewedPosts((prev) => ({ ...prev, [socialPostId]: 'pending' }));
      clearLoading();
      return;
    }

    socket.emit('verification:review', {
      channelId: selectedChannelId,
      socialPostId,
      verified: true,
    });

    setReviewedPosts((prev) => ({
      ...prev,
      [socialPostId]: 'verified',
    }));

    clearLoading();
  };

  const handleReject = (socialPostId: number, isVerified: boolean) => {
    if (!socket || !selectedChannelId) return;

    const currentStatus = getReviewStatus(socialPostId, isVerified);

    setLoadingPostId(socialPostId);
    setLoadingAction('rejected');

    if (currentStatus === 'rejected') {
      setReviewedPosts((prev) => ({ ...prev, [socialPostId]: 'pending' }));
      clearLoading();
      return;
    }

    socket.emit('verification:review', {
      channelId: selectedChannelId,
      socialPostId,
      verified: false,
    });

    setReviewedPosts((prev) => ({
      ...prev,
      [socialPostId]: 'rejected',
    }));

    clearLoading();
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
                        <div className="top-1/2 left-1/2 z-10 absolute flex justify-center items-center bg-[#FFFFFF68] rounded-full w-[46px] h-[46px] -translate-x-1/2 -translate-y-1/2">
                          <Image
                            src="/images/svg/playButton.svg"
                            alt="playButton"
                            width={15}
                            height={17}
                          />
                        </div>

                        <video
                          src={video.videoUrl ?? undefined}
                          poster={video.videoCoverUrl ?? undefined}
                          controls={false}
                          className="bg-black rounded-[8px] w-[112px] h-[126px] object-cover cursor-pointer"
                        />
                      </button>
                    </div>
                  </div>

                  <div className="w-full">
                    {video.socialPosts && video.socialPosts.length > 0 ? (
                      <div className="flex flex-col gap-3">
                        {video.socialPosts.map((post) => {
                          const isCurrentLoading = loadingPostId === post.id;
                          const reviewStatus = getReviewStatus(
                            post.id,
                            post.isVerified
                          );

                          return (
                            <div key={post.id} className="flex flex-col gap-2">
                              <div className="bg-[#3012B31A] px-[8px] py-[6px] rounded-[8px]">
                                {video.videoTitle && (
                                  <p className="font-semibold text-[16px] text-white leading-[20px]">
                                    {video.videoTitle}
                                  </p>
                                )}

                                {video.videoDescription && (
                                  <p className="mt-1 text-[14px] text-white/60 leading-[18px]">
                                    {video.videoDescription}
                                  </p>
                                )}
                              </div>

                              <a
                                href={post.postUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-[#3012B31A] px-[9px] py-[6px] rounded-[8px] w-fit font-semibold text-[#FFFFFFB0] text-[16px]"
                              >
                                {getPlatformIcon(post.platform)}
                                <span className="capitalize">
                                  {post.platform || 'Link'}
                                </span>
                              </a>

                              {isAdmin ? (
                                reviewStatus === 'verified' ? (
                                  <div className="flex items-center gap-3 mt-1">
                                    <button
                                      type="button"
                                      onClick={() =>
                                        handleVerify(post.id, post.isVerified)
                                      }
                                      className="flex flex-1 justify-center items-center gap-2 bg-[#0866FF] hover:bg-[#0867ffc1] disabled:opacity-70 py-[10px] rounded-[6px] font-medium text-white text-xs transition-colors cursor-pointer disabled:cursor-not-allowed"
                                    >
                                      ვერიფიცირებული
                                    </button>
                                  </div>
                                ) : reviewStatus === 'rejected' ? (
                                  <div className="flex items-center gap-3 mt-1">
                                    <button
                                      type="button"
                                      onClick={() =>
                                        handleReject(post.id, post.isVerified)
                                      }
                                      className="flex flex-1 justify-center items-center gap-2 hover:bg-[#ff00004a] disabled:opacity-70 py-[10px] border border-[#0866FF] rounded-[6px] font-medium text-white text-xs transition-colors cursor-pointer disabled:cursor-not-allowed"
                                    >
                                      უარყოფილია
                                    </button>
                                  </div>
                                ) : (
                                  <div className="w-full">
                                    <VerificationReviewActions
                                      isLoading={isCurrentLoading}
                                      loadingAction={loadingAction}
                                      onVerify={() =>
                                        handleVerify(post.id, post.isVerified)
                                      }
                                      onReject={() =>
                                        handleReject(post.id, post.isVerified)
                                      }
                                    />
                                  </div>
                                )
                              ) : (
                                <div className="mt-1">
                                  {reviewStatus === 'verified' ? (
                                    <span className="text-green-400 text-sm">
                                      ✓ ვერიფიცირებული
                                    </span>
                                  ) : reviewStatus === 'rejected' ? (
                                    <span className="text-red-400 text-sm">
                                      ✕ უარყოფილია
                                    </span>
                                  ) : (
                                    <span className="text-yellow-400 text-sm">
                                      მომლოდინე
                                    </span>
                                  )}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
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
            className="relative bg-[url('/images/png/iPhoneFrame.png')] bg-cover bg-center px-[15px] py-[16px] rounded-[12px] w-full max-w-[442px] h-[910px] overflow-hidden"
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
