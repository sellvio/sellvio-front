import Image from 'next/image';
import { CompanyCardProps } from '../../type';

const CardHeader = ({ task, setPopupOpen }: CompanyCardProps) => {
  return (
    <div className="flex justify-between w-full">
      <div className="flex items-center gap-[7px]">
        <div className="bg-[var(--lending-card-bg)] border rounded-[8px] w-[28px] h-[28px]" />
        <p className="font-bold text-[22px]">
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
        onClick={() => setPopupOpen((prev) => !prev)}
        className="cursor-pointer"
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
