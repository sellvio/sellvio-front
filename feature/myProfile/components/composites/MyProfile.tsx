"use client";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  CreatorProfileData,
  fetchCreatorProfile,
  updateCreatorProfile,
} from "@/lib/api/creator";
import StateMessage from "../../../components/StateMessage";
import MyProfileHeader from "../primirtives/MyProfileHeader";
import PrimaryInformation from "../primirtives/PrimaryInformation";
import CreatorType from "../primirtives/CreatorType";
import CreatorProfile from "../primirtives/CreatorProfile";
import SocmediaPlatform from "../primirtives/SocmediaPlatform";
import ContentCategory from "../primirtives/ContentCategory";
import { ProfileFormState } from "../../types";

const toFormState = (profile: CreatorProfileData): ProfileFormState => {
  const creator = profile.creator_profiles;
  return {
    fullName: [creator?.first_name, creator?.last_name]
      .filter(Boolean)
      .join(" "),
    bio: creator?.bio ?? "",
    location: creator?.location ?? "",
    creatorType: creator?.creator_type ?? null,
    tagIds: creator?.creator_tags.map((t) => t.tag_id) ?? [],
  };
};

const MyProfile = () => {
  const queryClient = useQueryClient();
  const [isEditing, setEditing] = useState(false);
  const [form, setForm] = useState<ProfileFormState | null>(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["creatorProfile"],
    queryFn: fetchCreatorProfile,
  });

  useEffect(() => {
    if (data && !isEditing) setForm(toFormState(data));
  }, [data, isEditing]);

  const { mutate, isPending } = useMutation({
    mutationFn: updateCreatorProfile,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["creatorProfile"] });
      toast.success("პროფილი განახლდა");
      setEditing(false);
    },
    onError: () => {
      toast.error("პროფილის განახლება ვერ მოხერხდა");
    },
  });

  const updateForm = (patch: Partial<ProfileFormState>) =>
    setForm((prev) => (prev ? { ...prev, ...patch } : prev));

  const handleSave = () => {
    if (!form || isPending) return;
    const [firstName, ...rest] = form.fullName.trim().split(/\s+/);
    if (!firstName) {
      toast.error("სახელი სავალდებულოა");
      return;
    }
    mutate({
      first_name: firstName,
      last_name: rest.join(" "),
      bio: form.bio.trim(),
      location: form.location.trim(),
      ...(form.creatorType ? { creator_type: form.creatorType } : {}),
      tags: form.tagIds,
    });
  };

  const handleCancel = () => {
    if (data) setForm(toFormState(data));
    setEditing(false);
  };

  return (
    <div className="flex flex-col mx-auto">
      <MyProfileHeader
        isEditing={isEditing}
        isSaving={isPending}
        canEdit={!!form}
        onEdit={() => setEditing(true)}
        onSave={handleSave}
        onCancel={handleCancel}
      />
      {isLoading && <StateMessage>იტვირთება...</StateMessage>}
      {isError && (
        <StateMessage tone="error">პროფილის ჩატვირთვა ვერ მოხერხდა</StateMessage>
      )}
      {data && form && (
        <div className="flex flex-col mt-[58px] gap-10 pb-10">
          <CreatorProfile profile={data} />
          <PrimaryInformation
            form={form}
            email={data.email}
            isEditing={isEditing}
            onChange={updateForm}
          />
          <CreatorType
            value={form.creatorType}
            isEditing={isEditing}
            onChange={(creatorType) => updateForm({ creatorType })}
          />
          <ContentCategory
            selectedIds={form.tagIds}
            isEditing={isEditing}
            onChange={(tagIds) => updateForm({ tagIds })}
          />
          <SocmediaPlatform
            accounts={data.creator_profiles?.social_media_accounts ?? []}
          />
        </div>
      )}
    </div>
  );
};

export default MyProfile;
