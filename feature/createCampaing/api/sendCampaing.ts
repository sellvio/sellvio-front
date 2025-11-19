import { CampaignSchema } from "../schema/schema";

export const sendCampaign = async (data: CampaignSchema) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_UR}/campaigns`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Campaign create failed");
  }

  return res.json();
};
