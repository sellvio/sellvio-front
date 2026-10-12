"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchCreatorOverview } from "@/lib/api/creator";
import StateMessage from "../../../components/StateMessage";
import { creatorAnalytic } from "../../data/data";

const formatNumber = (value: number) => value.toLocaleString("en-US");

const CreatorAnalityc = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["creatorOverview"],
    queryFn: fetchCreatorOverview,
  });

  const values: Record<number, string> = data
    ? {
        1: `₾${formatNumber(Number(data.earnings.total ?? 0))}`,
        2: formatNumber(data.campaigns.approved),
        3: formatNumber(data.videos.underReview),
        4: formatNumber(data.analytics.totals.views),
      }
    : {};

  return (
    <div className="flex flex-col max-w-[1387px] w-full mx-auto border rounded-[8px] py-[22px] px-[15px]">
      <h3 className="font-[600] text-[22px] mb-[26px]">ანალიტიკა</h3>
      {isError && (
        <StateMessage tone="error">
          ანალიტიკის ჩატვირთვა ვერ მოხერხდა
        </StateMessage>
      )}
      <div className="max-w-[1440px] w-full flex flex-wrap gap-[17px]">
        {creatorAnalytic.map((eachElement) => (
          <div
            key={eachElement.id}
            className={`
              w-[325px] h-[107px] 
              rounded-[8px] 
              border border-[var(--lending-border)] 
              flex flex-col justify-center items-center px-6 gap-[6px] 
              ${eachElement.bg} ${eachElement.text}
            `}
          >
            <p className="font-[600] text-[28px]">
              {isLoading ? "..." : values[eachElement.id] ?? "—"}
            </p>
            <p className="text-[14px] font-[500]">{eachElement.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreatorAnalityc;
