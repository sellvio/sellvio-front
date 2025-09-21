"use client";
import Image from "next/image";
import { Socmedia } from "../../data/data";

const Platforms = () => {
  return (
    <div className="max-w-[1222px] w-full bg-transparent mx-auto rounded-[8px] px-[30px] py-[30px] flex flex-col border">
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <Image
            src="/images/svg/platforms.svg"
            width={22}
            height={22}
            alt="logo"
          />
          <h2 className="text-[27px] font-[600] text-[var(--black-color)]">
            აირჩიე პლატფორმები
          </h2>
        </div>
        <p className="text-[var(--campaing-form-paragraphs)] text-[14px]">
          აირჩიე რომელ პლატფორმებზე გსურთ ამ კამპანიის მიზნობრივი გამოყენება
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full mt-[26px]">
        {Socmedia?.map((eachelement) => (
          <button
            key={eachelement.id}
            type="button"
            className="lg:w-[264px] h-[111px] bg-transparent border lg:mx-auto rounded-[8px] 
              flex flex-col items-center justify-center gap-4 cursor-pointer 
              hover:bg-[var(--card-hovers)] focus:bg-[var(--selected-cards)] transition-colors outline-none"
          >
            <Image
              src={eachelement.img}
              width={36}
              height={36}
              alt={eachelement.title}
            />
            <span className="font-[600] text-[var(--black-color)]">
              {eachelement.title}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Platforms;
