import { useRef, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { UploadVideoApi } from '@/feature/chat/api/chatApi';

interface UseVideoUploadParams {
  serverId: number | null;
  channelId: number | null;
}

export const useVideoUpload = ({
  serverId,
  channelId,
}: UseVideoUploadParams) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedVideoUrl, setUploadedVideoUrl] = useState<string | null>(null);

  const { mutate, isPending } = useMutation({
    mutationFn: (file: File) => {
      if (!serverId || !channelId) throw new Error('Missing IDs');
      return UploadVideoApi({
        file,
        serverId: String(serverId),
        channelId: String(channelId),
      });
    },
    onSuccess: (res) => {
      if (res?.data?.videoUrl) setUploadedVideoUrl(res.data.videoUrl);
    },
  });

  const handleFile = (file: File | undefined) => {
    if (!file || preview || !file.type.startsWith('video/')) return;
    setPreview(URL.createObjectURL(file));
    mutate(file);
  };

  const handleReset = () => {
    setPreview(null);
    setTitle('');
    setUploadedVideoUrl(null);
    if (fileRef.current) fileRef.current.value = '';
  };

  return {
    fileRef,
    preview,
    title,
    setTitle,
    isDragging,
    setIsDragging,
    uploadedVideoUrl,
    isPending,
    handleFile,
    handleReset,
  };
};
