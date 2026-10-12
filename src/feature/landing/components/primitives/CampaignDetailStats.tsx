import Image from 'next/image';
import { CampaignDetails } from '../../type';
import {
  formatQuantity,
  getBudgetInfo,
  paymentUnitLabels,
} from '../../data/campaignLabels';

const CampaignDetailStats = ({ campaign }: { campaign: CampaignDetails }) => {
  const { total, spent } = getBudgetInfo(campaign);

  return (
    <div className="flex gap-[18px] mt-[16px] w-full">
      <div className="bg-[#00000005] px-[24px] py-[22px] border border-[#0000001F] rounded-[8px] w-full max-w-[212px] min-h-[100px]">
        <div>
          <div className="flex gap-[3px]">
            <Image
              src="/images/CampaingPopupImages/svg/dollar-two.svg"
              alt="dollar"
              width={15}
              height={38}
            />
            <p className="font-semibold text-[#00D540] text-[28px]">
              {campaign.budget_hidden
                ? '—'
                : Math.max(total - spent, 0).toLocaleString()}
            </p>
          </div>
          <p className="font-medium text-[14px]">დარჩენილი ბიუჯეტი</p>
        </div>
      </div>

      <div className="bg-[#00000005] px-[16px] py-[22px] border border-[#0000001F] rounded-[8px] w-full max-w-[212px] min-h-[100px]">
        <div>
          <div>
            <p className="font-semibold text-[#111827] text-[28px]">
              {campaign._count?.campaign_participants ?? 0}
            </p>
          </div>
          <p className="font-medium text-[14px]">შემქმნელები</p>
        </div>
      </div>

      <div className="bg-[#00000005] px-[16px] py-[22px] border border-[#0000001F] rounded-[8px] w-full max-w-[212px] min-h-[100px]">
        <div>
          <div>
            <p className="font-semibold text-[#111827] text-[28px]">
              {campaign.campaign_videos?.length ?? 0}
            </p>
          </div>
          <p className="font-medium text-[14px]">დადასტურებული ვიდეო</p>
        </div>
      </div>

      <div className="bg-[#00000005] px-[16px] py-[22px] border border-[#0000001F] rounded-[8px] w-full max-w-[212px] min-h-[100px]">
        <div>
          <div className="flex gap-[3px]">
            <Image
              src="/images/CampaingPopupImages/svg/dollar-purple.svg"
              alt="dollar"
              width={15}
              height={38}
            />
            <p className="font-semibold text-[#3012B3CC] text-[28px]">
              {Number(campaign.payment_amount).toFixed(2)}
            </p>
          </div>
          <p className="font-medium text-[14px]">
            ყოველ {formatQuantity(campaign.payment_per_quantity)}{' '}
            {paymentUnitLabels[campaign.payment_type] ?? 'ნახვაზე'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetailStats;
