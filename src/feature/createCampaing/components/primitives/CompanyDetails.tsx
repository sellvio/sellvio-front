import Image from 'next/image';

const CompanyDetails = () => {
  return (
    <div className="flex flex-col justify-center gap-[26px] bg-[#0866FF33] px-[30px] py-[30px] border border-[#00000038] rounded-[8px] w-full">
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <Image
            src="/images/svg/companyDetails.svg"
            width={22}
            height={22}
            alt="logo"
          />
          <h2 className="font-[600] text-[27px] text-[var(--)]">
            კამპანიის დეტალები
          </h2>
        </div>
        <p className="text-[14px] text-[var(--campaing-form-paragraphs)]">
          კამპანიის მოთხოვნები და დამატებითი კონფიგურაცია
        </p>
      </div>
    </div>
  );
};

export default CompanyDetails;
