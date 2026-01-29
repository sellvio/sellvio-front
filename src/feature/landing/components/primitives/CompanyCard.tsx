import Image from 'next/image';
import { CompanyCardProps } from '../../type';
import CardHeader from './CardHeader';
import CardStats from './CardStats';
import { useState } from 'react';
import JoinCompanyPopup from './JoinCompanyPopup';

const CompanyCard = ({ task }: CompanyCardProps) => {
  const [JoinCompany, setJoinCompany] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  return (
    <div className="flex flex-col justify-between px-[25px] py-[23px] border-[2px] border-[var(--auth-border)] rounded-[8px] w-full max-w-[445px] min-h-[417px]">
      <div>
        <CardHeader task={task} />

        <div className="mt-[19px]">
          <div className="flex flex-wrap gap-[9px] mt-[8px] mb-[6px]">
            {task.campaign_tags.map((tag) => (
              <span
                key={tag.tag_id}
                className="bg-[var(--auth-button-text)] px-[10px] py-[6px] border border-[var(--auth-gradient-start)] rounded-[60px] font-medium text-[10px] text-[var(--auth-gradient-start)]"
              >
                {tag.tags.name}
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
            <p className="font-bold text-[12px]">
              {task.target_creator_types.length
                ? task.target_creator_types.join(', ')
                : 'სპეციალური მოთხოვნები არ არის'}
            </p>
          </div>

          <div className="flex gap-[8px]">
            <Image
              src="/images/landingPageIcons/svg/calendar.svg"
              alt="calendar"
              width={18}
              height={18}
            />
            <p className="font-bold text-[12px]">
              ბოლო ვადა:{' '}
              {task.finish_date
                ? new Date(task.finish_date).toLocaleDateString()
                : 'არ არის მითითებული'}
            </p>
          </div>
        </div>
      </div>
      <JoinCompanyPopup
        popupVisible={visible}
        setPopupVisible={setVisible}
        setChangeProfile={setJoinCompany}
      />
      <button
        onClick={() => setVisible((prev) => !prev)}
        className="bg-gradient-to-r from-[#3012B3] to-[#7B62E8] mt-[17px] rounded-[8px] w-full min-h-[39px] font-medium text-[12px] text-white"
      >
        გაწევრიანება
      </button>
    </div>
  );
};

export default CompanyCard;
