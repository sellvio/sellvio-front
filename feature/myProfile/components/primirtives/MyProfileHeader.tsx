import Image from "next/image";
import Link from "next/link";

const MyProfileHeader = () => {
  return (
    <div className="flex w-full items-center px-4 py-4px-5 py-6 mx-auto bg-[var(--header-bg)]">
      <div className="max-w-[1222px] w-full flex justify-between items-center mx-auto">
        <h1 className="text-[var(--black-color)] font-[600] text-[22px]">
          ჩემი პროფილი
        </h1>
        <Link href="/">
          <button
            type="button"
            aria-label="შეასწორე პროფილი"
            className="bg-[var(--hero-icon)] text-[var(--white-color)] font-[700] rounded-[8px] text-[19px] shrink-0 border-none py-3 px-2 border cursor-pointer flex items-center gap-2"
          >
            <Image
              src="/images/svg/correctProfile.svg"
              alt="პროფილის შეცვლა"
              width={22}
              height={22}
            />
            <span>შეასწორე პროფილი</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default MyProfileHeader;
