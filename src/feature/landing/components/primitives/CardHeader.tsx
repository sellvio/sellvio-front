import Image from 'next/image';
import { CompanyCardProps } from '../../type';

type CardHeaderProps = Pick<CompanyCardProps, 'task' | 'onOpenDetails'>;

const CardHeader = ({ task, onOpenDetails }: CardHeaderProps) => {
  const logoUrl = task.business_profiles?.logo_url;

  return (
    <div className="flex justify-between w-full">
      <div className="flex items-center gap-[7px]">
        {logoUrl ? (
          <Image
            src={logoUrl}
            alt={task.business_profiles?.company_name ?? 'logo'}
            width={28}
            height={28}
            unoptimized
            className="border rounded-[8px] w-[28px] h-[28px] object-cover"
          />
        ) : (
          <div className="bg-[var(--lending-card-bg)] border rounded-[8px] w-[28px] h-[28px]" />
        )}
        <p className="font-bold text-[22px]" title={task.name}>
          {task.name.length > 20 ? task.name.slice(0, 20) + '…' : task.name}
        </p>
        {task.chat_type === 'public' && (
          <Image
            src="/images/landingPageIcons/svg/verified.svg"
            alt="verified"
            width={20}
            height={20}
          />
        )}
      </div>
      <button
        type="button"
        onClick={() => onOpenDetails(task.id)}
        className="cursor-pointer"
        aria-label="კამპანიის დეტალები"
      >
        <Image
          src="/images/landingPageIcons/svg/chevron-right.svg"
          alt="arrow"
          width={21}
          height={21}
        />
      </button>
    </div>
  );
};

export default CardHeader;
