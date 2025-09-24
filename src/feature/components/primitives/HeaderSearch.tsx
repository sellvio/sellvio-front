import Image from 'next/image';
import { useState } from 'react';

const HeaderSearch = () => {
  const [search, setSearch] = useState(false);
  return (
    <div className="flex justify-end bg-[var(--header-icon-bg)] border border-[var(--header-icon-border)] rounded-[16px]">
      <input
        type="search"
        className={`${
          search
            ? 'max-w-[485px] min-h-[50px] p-[14px]'
            : 'max-w-[0px] min-h-[0px]'
        } transition-all duration-600 ease-in-out outline-none no-clear`}
      />
      <button
        onClick={() => setSearch(!search)}
        className="flex justify-center items-center w-[50px] h-[50px]"
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
