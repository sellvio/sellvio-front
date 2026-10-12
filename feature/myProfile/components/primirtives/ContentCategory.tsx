"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchAllTags } from "@/lib/api/creator";

type ContentCategoryProps = {
  selectedIds: number[];
  isEditing: boolean;
  onChange: (ids: number[]) => void;
};

const ContentCategory = ({
  selectedIds,
  isEditing,
  onChange,
}: ContentCategoryProps) => {
  const { data: tags = [], isLoading, isError } = useQuery({
    queryKey: ["allTags"],
    queryFn: fetchAllTags,
    staleTime: 5 * 60 * 1000,
  });

  const visibleTags = isEditing
    ? tags
    : tags.filter((tag) => selectedIds.includes(tag.id));

  const handleTagClick = (id: number) => {
    if (!isEditing) return;
    onChange(
      selectedIds.includes(id)
        ? selectedIds.filter((tagId) => tagId !== id)
        : [...selectedIds, id]
    );
  };

  return (
    <div className="max-w-[1222px] w-full bg-transparent mx-auto border-[var(--component-border-color)] rounded-[8px] px-[30px] py-[30px] flex flex-col border">
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <h2 className="text-[22px] font-[600] text-[var(--black-color)]">
            კონტენტის კატეგორია
          </h2>
        </div>
        <p className="text-[var(--campaing-form-paragraphs)] text-[19px]">
          აირჩიეთ კატეგორიები რომლებიც შეესაბამება თქვენი კონტენტის სტილს
        </p>
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        {isLoading && <p>იტვირთება...</p>}
        {isError && (
          <p className="text-[#E53935]">კატეგორიების ჩატვირთვა ვერ მოხერხდა</p>
        )}
        {!isLoading && !isError && visibleTags.length === 0 && (
          <p className="text-[var(--campaing-form-paragraphs)]">
            კატეგორიები არ არის არჩეული
          </p>
        )}
        {visibleTags.map((tag) => {
          const isSelected = selectedIds.includes(tag.id);

          return (
            <button
              type="button"
              key={tag.id}
              disabled={!isEditing}
              className={`relative px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 border ${
                isSelected
                  ? "bg-[var(--tags-bg)] border-[var(--auth-social-input-border)] font-[600]"
                  : "bg-[var(--white-color)]"
              } ${isEditing ? "cursor-pointer" : "cursor-default"}`}
              onClick={() => handleTagClick(tag.id)}
            >
              <span>{tag.name}</span>
              {isEditing && isSelected && (
                <svg
                  className="w-4 h-4 text-[var(--black-color)] ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ContentCategory;
