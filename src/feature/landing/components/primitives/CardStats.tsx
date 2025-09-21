import Image from 'next/image';
import { CompanyCardsProps } from '../../type';
import ProgressBar from './ProgressBar';

const CardStats = ({ task }: CompanyCardsProps) => {
  return (
    <div className="flex flex-col justify-between bg-[#3012B30F] mt-[13px] p-[15px] rounded-[10px] w-full max-w-[391px] min-h-[113px]">
      <div className="flex justify-between w-full max-w-[289px]">
        <div className="flex flex-col">
          <div className="flex gap-[2px]">
            <Image
              src="/images/svg/dollar.svg"
              alt="dollar"
              width={18}
              height={18}
            />
            <p className="font-bold text-[#00B737]">
              <span>{task.compensation}</span>
              <span>/1k</span>
            </p>
          </div>
          <p className="font-bold text-[#000000D4] text-[12px]">
            ყოველ 1მ ნახვაზე
          </p>
        </div>
        <div>
          <div className="flex gap-[2px]">
            <Image
              src="/images/svg/users.svg"
              alt="users"
              width={18}
              height={18}
            />
            <p className="font-bold text-[#3012B3]">
              <span>{task.currentlyCreator}</span>/
              <span>{task.totalCreator}</span>
            </p>
          </div>
          <p className="font-bold text-[#000000D4] text-[12px]">შემქმნელები</p>
        </div>
      </div>
      <ProgressBar currentAmount={task.budget} goalAmount={10000} />
    </div>
  );
};

export default CardStats;
