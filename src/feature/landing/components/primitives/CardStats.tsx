import Image from 'next/image';
import { Campaign } from '../../type';
import ProgressBar from './ProgressBar';
import {
  formatQuantity,
  getBudgetInfo,
  paymentUnitLabels,
} from '../../data/campaignLabels';

const CardStats = ({ task }: { task: Campaign }) => {
  const { total, spent } = getBudgetInfo(task);

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
              <span>{Number(task.payment_amount)}</span>
              <span>/{formatQuantity(task.payment_per_quantity)}</span>
            </p>
          </div>
          <p className="font-bold text-[12px]">
            ყოველ {formatQuantity(task.payment_per_quantity)}{' '}
            {paymentUnitLabels[task.payment_type] ?? 'ნახვაზე'}
          </p>
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
              <span>{task._count?.campaign_participants ?? 0}</span>
            </p>
          </div>
          <p className="font-bold text-[12px]">შემქმნელები</p>
        </div>
      </div>
      {task.budget_hidden ? (
        <p className="font-medium text-[12px]">ბიუჯეტი დამალულია</p>
      ) : (
        <ProgressBar currentAmount={spent} goalAmount={total} />
      )}
    </div>
  );
};

export default CardStats;
