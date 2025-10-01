import { revenueOverview } from "../../data/data";

const RevenueOverview = () => {
  return (
    <div className="max-w-[1440px] w-full flex flex-col gap-[26px] px-[15px] mx-auto border rounded-[8px] py-[22px]">
      <div className="flex flex-col pl-[11px]">
        <h3 className="font-[600] text-[22px]">შემოსავლების მიმოხილვა</h3>
        <p className="text-[var(--campaing-form-paragraphs)] text-[14px]">
          ყველა კამპანიის მიმოხილვა
        </p>
      </div>
      <div className="max-w-[1440px] w-full flex flex-wrap gap-[26px] px-[15px] mx-auto">
        {revenueOverview.map((eachElement) => (
          <div
            key={eachElement.id}
            className="w-full  flex lg:max-w-[427px] lg:w-full  flex-wrap gap-[26px]"
          >
            <div
              className={`${eachElement.bg}  max-w-[427px] flex flex-col w-full justify-center items-center py-4 rounded-[8px] mt-[26px]`}
            >
              <p className={`${eachElement.text} font-[700]`}>
                {eachElement.quantity}
              </p>
              <p className="text-[var(--campaing-form-paragraphs)] font-[500]">
                {eachElement.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RevenueOverview;
