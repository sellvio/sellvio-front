import { CampaignSchema } from "../schema/schema";

export const sendCampaign = async (data: CampaignSchema) => {
  const formData = new FormData();

  // ლინკები (თუ არის)
  const linkMedia = (data.media || [])
    .filter((m: any) => m.source === "link")
    .map(({ name, url, type }) => ({ name, url, type }));

  if (linkMedia.length > 0) {
    formData.append("media", JSON.stringify(linkMedia));
  }

  const fileMedia = (data.media || [])
    .filter((m: any) => m.source === "file" && m.file instanceof File)
    .map((m: any) => m.file as File);

  fileMedia.forEach((file) => {
    formData.append("asset_files", file, file.name);
  });

  // დანარჩენი ველები
  formData.append("name", data.name);
  formData.append("description", data.description || "");
  formData.append("budget", String(data.budget));
  formData.append("budget_hidden", String(data.budget_hidden));
  formData.append("duration_days", String(data.duration_days));
  formData.append("status", data.status);

  if (data.chat_type) {
    formData.append("chat_type", data.chat_type);
  }

  data.target_creator_types.forEach((type) => {
    formData.append("target_creator_types[]", type);
  });

  if (data.additional_requirements) {
    formData.append("additional_requirements", data.additional_requirements);
  }

  formData.append("payment_type", data.payment_type);
  formData.append("payment_amount", String(data.payment_amount));
  formData.append("payment_per_quantity", String(data.payment_per_quantity));
  formData.append("requirements", data.requirements);

  if (data.target_audience) {
    formData.append("target_audience", data.target_audience);
  }

  data.platforms.forEach((platform) => {
    formData.append("platforms[]", platform);
  });

  (data.tags || []).forEach((tag) => {
    formData.append("tags[]", tag);
  });

  try {
    const response = await fetch("https://sellvio-back.vercel.app/campaigns", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `კამპანიის შექმნა ჩაიშალა: ${response.status} — ${errorText}`
      );
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("sendCampaign შეცდომა:", error);
    throw error;
  }
};
