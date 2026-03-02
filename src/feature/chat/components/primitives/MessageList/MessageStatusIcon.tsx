import { Loader2, Check, CheckCheck, AlertTriangle } from 'lucide-react';

interface Props {
  status?: string;
}

export const MessageStatusIcon = ({ status }: Props) => {
  switch (status) {
    case 'sending':
      return <Loader2 className="w-3 h-3 text-white/30 animate-spin" />;
    case 'sent':
      return <Check className="w-4 h-4 text-white/50" />;
    case 'delivered':
      return <CheckCheck className="w-4 h-4 text-blue-400" />;
    case 'failed':
      return <AlertTriangle className="w-4 h-4 text-red-400" />;
    default:
      return null;
  }
};
