import Image from 'next/image';

type ToggleButtonsProps = {
  active: 'analytic' | 'campaing';
  setActive: (value: 'analytic' | 'campaing') => void;
  firstLabel: string;
  secondLabel: string;
  firstImage?: string;
  secondImage?: string;
  className?: string;
};

const ToggleButtons = ({
  active,
  setActive,
  firstLabel,
  secondLabel,
  firstImage,
  secondImage,
  className = '',
}: ToggleButtonsProps) => {
  return (
    <div
      className={`flex justify-between bg-[var(--leding-dark-button)]
                  px-[14px] rounded-[12px]  overflow-hidden py-[7px]
                  ${className}`}
    >
      <button
        type="button"
        className={`flex justify-center items-center gap-2 rounded-[12px] py-[12px]
                    text-[var(--adding-tags-color)] w-1/2 font-[700] cursor-pointer
                    transition-all duration-200 ${
                      active === 'analytic' && 'bg-[var(--white-color)] '
                    }`}
        onClick={() => setActive('analytic')}
      >
        {firstImage && (
          <Image
            src={firstImage}
            alt={firstLabel}
            width={20}
            height={20}
            className="object-contain"
          />
        )}
        {firstLabel}
      </button>

      <button
        type="button"
        className={`flex justify-center items-center gap-2 rounded-[12px]
                    text-[var(--adding-tags-color)] w-1/2 font-[700] cursor-pointer
                    transition-all duration-200 ${
                      active === 'campaing' && 'bg-[var(--white-color)]'
                    }`}
        onClick={() => setActive('campaing')}
      >
        {secondImage && (
          <Image
            src={secondImage}
            alt={secondLabel}
            width={20}
            height={20}
            className="object-contain"
          />
        )}
        {secondLabel}
      </button>
    </div>
  );
};

export default ToggleButtons;
