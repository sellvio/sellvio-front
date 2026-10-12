"use client";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { addVideoSocialPost } from "@/lib/api/creator";
import { PlatformName } from "@/lib/api/analytics";

type AddSocialPostFormProps = {
  videoId: number;
  onDone: () => void;
};

const platforms: { value: PlatformName; label: string }[] = [
  { value: "tiktok", label: "TikTok" },
  { value: "instagram", label: "Instagram" },
  { value: "facebook", label: "Facebook" },
];

const AddSocialPostForm = ({ videoId, onDone }: AddSocialPostFormProps) => {
  const queryClient = useQueryClient();
  const [platform, setPlatform] = useState<PlatformName>("tiktok");
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      addVideoSocialPost(videoId, { platform, post_url: url.trim() }),
    onSuccess: () => {
      toast.success("ბმული დაემატა");
      queryClient.invalidateQueries({ queryKey: ["creatorVideos"] });
      onDone();
    },
    onError: (err) => {
      const message = err instanceof Error ? err.message : "";
      setError(
        /approved/i.test(message)
          ? "ბმულის დამატება შესაძლებელია მხოლოდ დადასტურებულ ვიდეოზე"
          : "ბმულის დამატება ვერ მოხერხდა"
      );
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isPending) return;
    try {
      const parsed = new URL(url.trim());
      if (!/^https?:$/.test(parsed.protocol)) throw new Error();
    } catch {
      setError("შეიყვანეთ სწორი ბმული (https://...)");
      return;
    }
    setError("");
    mutate();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-wrap items-center gap-2 px-[20px] pb-[16px]"
    >
      <select
        value={platform}
        onChange={(e) => setPlatform(e.target.value as PlatformName)}
        className="border border-[#E3E3E3] rounded-[8px] px-2 py-[6px] text-[13px]"
      >
        {platforms.map((p) => (
          <option key={p.value} value={p.value}>
            {p.label}
          </option>
        ))}
      </select>
      <input
        type="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="https://..."
        className="flex-1 min-w-[180px] border border-[#E3E3E3] rounded-[8px] px-3 py-[6px] text-[13px] outline-none"
      />
      <button
        type="submit"
        disabled={isPending}
        className="w-[100px] py-[6px] bg-[#0866FFDB] text-[#ffffff] rounded-[8px] text-[13px] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isPending ? "..." : "შენახვა"}
      </button>
      <button
        type="button"
        onClick={onDone}
        className="text-[13px] text-[#4A4A4A] cursor-pointer"
      >
        გაუქმება
      </button>
      {error && <p className="w-full text-[12px] text-[#EB1654]">{error}</p>}
    </form>
  );
};

export default AddSocialPostForm;
