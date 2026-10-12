import Link from 'next/link';
import Image from 'next/image';
import { CampaignDetails, JoinableCampaign } from '../../type';

type CampaignDetailHeaderProps = {
  campaign: CampaignDetails;
  onClose: () => void;
  onJoin: (campaign: JoinableCampaign) => void;
};

const CampaignDetailHeader = ({
  campaign,
  onClose,
  onJoin,
}: CampaignDetailHeaderProps) => {
  const logoUrl = campaign.business_profiles?.logo_url;

  return (
    <div>
      <div className="flex justify-between items-center gap-[16px]">
        <div className="flex items-center gap-[12px] min-w-0">
          {logoUrl && (
            <Image
              src={logoUrl}
              alt={campaign.business_profiles.company_name}
              width={48}
              height={48}
              unoptimized
              className="rounded-[8px] w-[48px] h-[48px] object-cover shrink-0"
            />
          )}
          <div className="min-w-0">
            <p className="font-semibold text-[20px] break-words">
              კამპანია: <span>{campaign.name}</span>
            </p>
            <p className="text-[#000000AD] text-[14px]">
              {campaign.business_profiles?.company_name}
            </p>
          </div>
        </div>
        <div className="flex gap-[16px] shrink-0">
          <Link
            href={`/chat?campaignId=${campaign.id}`}
            className="flex items-center bg-[#0866FF14] px-[22px] py-[6px] border border-[#0866FF1A] rounded-[8px] font-semibold text-[#0866FF] text-[13px] cursor-pointer"
          >
            გახსენი ჩატი
          </Link>
          <button
            type="button"
            onClick={() =>
              onJoin({ id: campaign.id, chat_type: campaign.chat_type })
            }
            className="bg-[#0866FFDB] px-[22px] border border-[#C13D3F36] rounded-[8px] min-h-[30px] font-semibold text-[#FFFFFF] text-[13px] cursor-pointer"
          >
            გაწევრიანება
          </button>
          <button
            type="button"
            onClick={onClose}
            aria-label="დახურვა"
            className="px-[8px] font-semibold text-[#000000AD] text-[20px] cursor-pointer"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetailHeader;
