import Image from 'next/image';
import { useState } from 'react';

const HeaderSearch = () => {
  const [search, setSearch] = useState(false);
  return (
    <div
      className={`flex justify-between relative overflow-hidden bg-[var(--header-icon-bg)] ease-in-out transition-all duration-300 ${
        search
          ? 'max-w-[485px] w-full min-h-[50px]'
          : 'max-w-[50px] min-h-[50px] w-full'
      } border border-[var(--header-icon-border)] rounded-[16px]`}
    >
      <input
        type="search"
        placeholder="მოიძე შემქმნელები,სერვისები ან კატეგორიები..."
        className={`${
          search
            ? 'max-w-[433px] w-full min-h-[50px] p-[14px]'
            : 'max-w-[0px] min-h-[0px]'
        } overflow-hidden outline-none no-clear`}
      />
      <button
        onClick={() => setSearch(!search)}
        className="right-0 absolute flex justify-center items-center w-[50px] h-[50px] cursor-pointer"
      >
        <Image
          src="/images/headerIcons/svg/search.svg"
          alt="search icon"
          width={20}
          height={20}
        />
      </button>
    </div>
  );
};

export default HeaderSearch;
