import Image from 'next/image';
import { CampaignDetails } from '../../type';
import { creatorTypeLabels } from '../../data/campaignLabels';

const sectionClass =
  'flex flex-col gap-[12px] px-[32px] py-[28px] border border-[#0000001F] rounded-[8px] w-full';

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between items-start gap-[16px] w-full">
    <p className="text-[#000000AD] text-[14px] shrink-0">{label}</p>
    <p className="font-semibold text-[#111827] text-[14px] text-end break-words">
      {value}
    </p>
  </div>
);

const EmptyState = ({ text }: { text: string }) => (
  <p className="text-[#000000AD] text-[14px]">{text}</p>
);

const formatDate = (date: string | null | undefined) =>
  date ? new Date(date).toLocaleDateString('ka-GE') : 'არ არის მითითებული';

export const CampaignOverview = ({
  campaign,
}: {
  campaign: CampaignDetails;
}) => (
  <div className="flex flex-col gap-[17px] w-full">
    <div className={sectionClass}>
      <p className="font-semibold">აღწერა</p>
      <p className="text-[#000000AD] text-[14px] whitespace-pre-line">
        {campaign.description || 'აღწერა არ არის მითითებული'}
      </p>
    </div>
    <div className={sectionClass}>
      <InfoRow
        label="პლატფორმები"
        value={
          campaign.campaign_platforms?.length
            ? campaign.campaign_platforms.map((p) => p.platform).join(', ')
            : 'არ არის მითითებული'
        }
      />
      <InfoRow
        label="თეგები"
        value={
          campaign.campaign_tags?.length
            ? campaign.campaign_tags.map((t) => t.tags.name).join(', ')
            : 'არ არის მითითებული'
        }
      />
      <InfoRow
        label="ჩატის ტიპი"
        value={campaign.chat_type === 'private' ? 'დახურული' : 'ღია'}
      />
      <InfoRow label="ბოლო ვადა" value={formatDate(campaign.finish_date)} />
      <InfoRow
        label="ხანგრძლივობა"
        value={`${campaign.duration_days} დღე`}
      />
    </div>
  </div>
);

export const CampaignRequirements = ({
  campaign,
}: {
  campaign: CampaignDetails;
}) => (
  <div className={sectionClass}>
    <p className="font-semibold">მოთხოვნები</p>
    <p className="text-[#000000AD] text-[14px] whitespace-pre-line">
      {campaign.requirements || 'მოთხოვნები არ არის მითითებული'}
    </p>
    {campaign.additional_requirements && (
      <>
        <p className="mt-[8px] font-semibold">დამატებითი მოთხოვნები</p>
        <p className="text-[#000000AD] text-[14px] whitespace-pre-line">
          {campaign.additional_requirements}
        </p>
      </>
    )}
    <InfoRow
      label="სამიზნე აუდიტორია"
      value={campaign.target_audience || 'არ არის მითითებული'}
    />
    <InfoRow
      label="შემქმნელის ტიპი"
      value={
        campaign.target_creator_types?.length
          ? campaign.target_creator_types
              .map((type) => creatorTypeLabels[type] ?? type)
              .join(', ')
          : 'სპეციალური მოთხოვნები არ არის'
      }
    />
  </div>
);

export const CampaignAssets = ({
  campaign,
}: {
  campaign: CampaignDetails;
}) => (
  <div className={sectionClass}>
    <p className="font-semibold">კამპანიის მასალები</p>
    {campaign.campaign_assets?.length ? (
      campaign.campaign_assets.map((asset, index) => (
        <a
          key={`${asset.asset_url}-${index}`}
          href={asset.asset_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex justify-between items-center bg-[#11182714] p-[10px] border border-[#0866FF14] rounded-[4px] w-full font-semibold text-[#0866FF] text-[14px]"
        >
          <span className="truncate">
            {asset.asset_name || `მასალა ${index + 1}`}
          </span>
          <span className="text-[#000000AD]">{asset.asset_type}</span>
        </a>
      ))
    ) : (
      <EmptyState text="მასალები არ არის ატვირთული" />
    )}
  </div>
);

export const CampaignVideos = ({
  campaign,
}: {
  campaign: CampaignDetails;
}) => (
  <div className={sectionClass}>
    <p className="font-semibold">დადასტურებული ვიდეოები</p>
    {campaign.campaign_videos?.length ? (
      campaign.campaign_videos.map((video) => (
        <div
          key={video.id}
          className="flex justify-between items-center bg-[#11182714] p-[10px] border border-[#0866FF14] rounded-[4px] w-full min-h-[61px]"
        >
          <div>
            <p className="font-semibold text-[#111827] text-[14px]">
              {video.title || 'ვიდეო'}
            </p>
            <p className="text-[#000000AD] text-[14px]">
              {formatDate(video.created_at)}
            </p>
          </div>
          {video.cover_url ? (
            <Image
              src={video.cover_url}
              alt={video.title || 'video cover'}
              width={40}
              height={40}
              unoptimized
              className="rounded-[8px] w-[40px] h-[40px] object-cover"
            />
          ) : (
            <div className="flex justify-center items-center bg-[#5E5E5E] rounded-[8px] w-[40px] min-h-[40px]">
              <Image
                src="/images/CampaingPopupImages/svg/video-play-button.svg"
                alt="video"
                width={16}
                height={16}
              />
            </div>
          )}
        </div>
      ))
    ) : (
      <EmptyState text="დადასტურებული ვიდეოები ჯერ არ არის" />
    )}
  </div>
);
