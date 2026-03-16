import { VideoStatus } from '@/feature/chat/types';

const STATUS_CONFIG: Record<VideoStatus, { label: string; className: string }> =
  {
    under_review: {
      label: 'განხილვაშია',
      className: 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30',
    },
    approved: {
      label: 'დამტკიცებულია',
      className: 'bg-green-500/20 text-green-300 border border-green-500/30',
    },
    rejected: {
      label: 'უარყოფილია',
      className: 'bg-red-500/20 text-red-300 border border-red-500/30',
    },
  };

interface Props {
  status?: string;
  isSubmitting?: boolean;
}

export const VideoStatusBadge = ({ status, isSubmitting = false }: Props) => {
  if (isSubmitting) {
    return (
      <span className="inline-block bg-[#0866FF26] px-2 py-0.5 border border-[#0866FF55] rounded-full font-medium text-[#8BB8FF] text-[11px]">
        იგზავნება...
      </span>
    );
  }

  const config = STATUS_CONFIG[status as VideoStatus];
  if (!config) return null;

  return (
    <span
      className={`inline-block px-2 py-0.5 rounded-full text-[11px] font-medium ${config.className}`}
    >
      {config.label}
    </span>
  );
};
