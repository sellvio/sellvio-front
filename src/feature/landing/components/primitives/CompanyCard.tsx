import Image from 'next/image';
import { CompanyCardsProps } from '../../type';
import CardHeader from './CardHeader';
import CardStats from './CardStats';

const CompanyCard = ({ task }: CompanyCardsProps) => {
  return (
    <div className="flex flex-col justify-between px-[25px] py-[23px] border-[2px] border-[var(--auth-border)] rounded-[8px] w-full max-w-[445px] h-full min-h-[417px]">
      <div>
        <CardHeader task={task} />

        <div className="mt-[19px]">
          <p className="font-medium text-[14px]">
            პოპულარული კვირის ჰაილაითები
          </p>
          <div className="flex flex-wrap gap-[9px] mt-[8px] mb-[6px]">
            {task.categories.map((category, index) => (
              <span
                key={index}
                className="bg-[var(--auth-button-text)] px-[10px] py-[6px] border border-[var(--auth-gradient-start)] rounded-[60px] font-medium text-[10px] text-[var(--auth-gradient-start)] cursor-default"
              >
                {category ? (
                  category
                ) : (
                  <p>კვირის ჰაილაითები არ არის ხელმისაწვდომი</p>
                )}
              </span>
            ))}
          </div>
          <p className="font-medium text-[14px]">{task.description}</p>
        </div>

        <CardStats task={task} />

        <div className="space-y-[11px] mt-[6px]">
          <div className="flex gap-[8px]">
            <Image
              src="/images/landingPageIcons/svg/filter.svg"
              alt="filter"
              width={18}
              height={18}
            />
            <div className="flex font-bold text-[12px] text-[var(--auth-text-dark)]">
              <p className="flex gap-[2px]">
                {task.filters?.length ? (
                  task.filters.map((category, index) => (
                    <span key={index}>
                      {category}
                      {index !== task.filters!.length - 1 && ','}
                    </span>
                  ))
                ) : (
                  <span>სპეციალური მოთხოვნები არ არის</span>
                )}
              </p>
            </div>
          </div>
          <div className="flex gap-[8px]">
            <Image
              src="/images/landingPageIcons/svg/calendar.svg"
              alt="calendar"
              width={18}
              height={18}
            />
            <div className="flex gap-[4px] font-bold text-[12px] text-[var(--auth-text-dark)]">
              <p>ბოლო ვადა:</p>
              <p>{task.deadline}</p>
            </div>
          </div>
        </div>
      </div>
      <button
        className="mt-[17px] rounded-[8px] w-full min-h-[39px] font-medium text-[12px] text-[var(--auth-button-text)] cursor-pointer"
        style={{
          background:
            'linear-gradient(90deg, rgba(48,18,179,1) 0%, rgba(123,98,232,1) 100%)',
        }}
      >
        გაწევრიანება
      </button>
    </div>
  );
};

export default CompanyCard;
