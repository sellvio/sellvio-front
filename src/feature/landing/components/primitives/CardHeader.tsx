import Image from 'next/image';
import { CompanyCardsProps } from '../../type';

const CardHeader = ({ task }: CompanyCardsProps) => {
  return (
    <div className="flex justify-between w-full">
      <div className="flex items-center gap-[7px]">
        <div className="bg-[#D9D9D9] border border-[#0000007A] rounded-[8px] w-[28px] h-[28px]"></div>
        <p className="font-bold text-[22px]">{task.title}</p>
        {task.verified && (
          <Image
            src="/images/svg/verified.svg"
            alt="verified"
            width={20}
            height={20}
          />
        )}
      </div>
      <div className="flex items-center gap-[4px]">
        <Image src="/images/svg/star.svg" alt="rating" width={18} height={18} />
        <p className="font-bold text-[14px]">{task.rating}</p>
      </div>
    </div>
  );
};

export default CardHeader;
