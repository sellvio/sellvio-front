import Image from 'next/image';

const HeaderNotificationButton = () => {
  return (
    <div className="flex justify-between bg-[var(--header-icon-bg)] border border-[var(--header-icon-border)] rounded-[16px] overflow-hidden">
      <button className="flex justify-center items-center w-[50px] h-[50px] cursor-pointer">
        <Image
          src="/images/headerIcons/svg/notification.svg"
          alt="search icon"
          width={20}
          height={20}
        />
      </button>
    </div>
  );
};

export default HeaderNotificationButton;
