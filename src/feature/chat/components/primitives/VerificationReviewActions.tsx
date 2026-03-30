'use client';

import { Loader2 } from 'lucide-react';

interface Props {
  isLoading: boolean;
  loadingAction: 'verified' | 'rejected' | null;
  onVerify: () => void;
  onReject: () => void;
}

const VerificationReviewActions = ({
  isLoading,
  loadingAction,
  onVerify,
  onReject,
}: Props) => {
  const isRejectLoading = isLoading && loadingAction === 'rejected';
  const isVerifyLoading = isLoading && loadingAction === 'verified';

  return (
    <div className="flex gap-2 mt-1">
      <button
        type="button"
        onClick={onReject}
        disabled={isLoading}
        className="flex flex-1 justify-center items-center gap-2 hover:bg-[#ff00004a] disabled:opacity-70 py-[10px] border border-[#0866FF] rounded-[6px] font-medium text-white text-xs transition-colors cursor-pointer disabled:cursor-not-allowed"
      >
        {isRejectLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            იტვირთება...
          </>
        ) : (
          'გაუქმება'
        )}
      </button>

      <button
        type="button"
        onClick={onVerify}
        disabled={isLoading}
        className="flex flex-1 justify-center items-center gap-2 bg-[#0866FF] hover:bg-[#0867ffc1] disabled:opacity-70 py-[10px] rounded-[6px] font-medium text-white text-xs transition-colors cursor-pointer disabled:cursor-not-allowed"
      >
        {isVerifyLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            იტვირთება...
          </>
        ) : (
          'ვერიფიკაცია'
        )}
      </button>
    </div>
  );
};

export default VerificationReviewActions;
