import Image from 'next/image';
import { useState } from 'react';

const HeaderSearch = () => {
  const [search, setSearch] = useState(false);
  return (
    <div
      className={`flex justify-between bg-[var(--header-icon-bg)] ease-in-out transition-all duration-300 ${
        search
          ? 'max-w-[485px] w-full min-h-[50px]'
          : 'max-w-[50px] min-h-[50px] w-full'
      } border border-[var(--header-icon-border)] rounded-[16px]`}
    >
      <input
        type="search"
        className={`${
          search
            ? 'max-w-[433px] w-full min-h-[50px] p-[14px]'
            : 'max-w-[0px] min-h-[0px]'
        } transition-all duration-600 ease-in-out outline-none no-clear`}
      />
      <button
        onClick={() => setSearch(!search)}
        className="flex justify-center items-center w-[50px] h-[50px] cursor-pointer"
      >
        <Image
          src="/images/svg/search.svg"
          alt="search icon"
          width={20}
          height={20}
        />
      </button>
    </div>
  );
};

export default HeaderSearch;
