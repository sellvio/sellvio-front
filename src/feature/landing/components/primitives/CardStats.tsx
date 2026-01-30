import Image from 'next/image';
import { Campaign } from '../../type';
import ProgressBar from './ProgressBar';

const CardStats = ({ task }: { task: Campaign }) => {
  return (
    <div className="flex flex-col justify-between bg-[var(--budget-stats-bg)] mt-[13px] p-[15px] rounded-[10px] w-full max-w-[391px] min-h-[113px]">
      <div className="flex justify-between w-full max-w-[289px]">
        <div className="flex flex-col">
          <div className="flex gap-[2px]">
            <Image
              src="/images/landingPageIcons/svg/dollar.svg"
              alt="dollar"
              width={18}
              height={18}
            />
            <p className="font-bold text-[var(--dolar-icon-color)]">
              <span>{task.payment_amount}</span>
              <span>/{task.payment_per_quantity / 1000}k</span>
            </p>
          </div>
          <p className="font-bold text-[12px]">ყოველ 1მ ნახვაზე</p>
        </div>

        <div>
          <div className="flex gap-[2px]">
            <Image
              src="/images/landingPageIcons/svg/users.svg"
              alt="users"
              width={18}
              height={18}
            />
            <p className="font-bold">
              <span>{task._count.campaign_participants}</span>/
              <span>{task.duration_days}</span>
            </p>
          </div>
          <p className="font-bold text-[12px]">შემქმნელები</p>
        </div>
      </div>
      <ProgressBar currentAmount={Number(task.budget)} goalAmount={10000} />
    </div>
  );
};

export default CardStats;
