"use client";

import React, { useState } from "react";
import { initialTags } from "../../data/data";

// პირველი ვარიანტი - მარტივი სტრინგების მასივი

const ContentCategory = () => {
  const [tags, setTags] = useState(initialTags);
  const [selectedTags, setSelectedTags] = useState(new Set());

  const handleTagClick = (categoryIndex: number, tagIndex: number) => {
    const tagKey = `${categoryIndex}-${tagIndex}`;
    const newSelectedTags = new Set(selectedTags);

    if (selectedTags.has(tagKey)) {
      newSelectedTags.delete(tagKey);
    } else {
      newSelectedTags.add(tagKey);
    }

    setSelectedTags(newSelectedTags);
  };

  const handleRemoveTag = (
    e: React.MouseEvent<SVGSVGElement>,
    categoryIndex: number,
    tagIndex: number
  ) => {
    e.stopPropagation();
    const updatedTags = tags.map((category, catIdx) => {
      if (catIdx === categoryIndex) {
        return {
          ...category,
          tags: category.tags.filter((_, idx) => idx !== tagIndex),
        };
      }
      return category;
    });
    setTags(updatedTags);

    const tagKey = `${categoryIndex}-${tagIndex}`;
    const newSelectedTags = new Set(selectedTags);
    newSelectedTags.delete(tagKey);
    setSelectedTags(newSelectedTags);
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
      <div className="mt-6">
        {tags.map((eachElement, categoryId) => (
          <div key={categoryId} className="flex flex-wrap gap-3">
            {eachElement.tags.map((tag, tagIndex) => {
              const tagKey = `${categoryId}-${tagIndex}`;
              const isSelected = selectedTags.has(tagKey);

              return (
                <div
                  key={tagIndex}
                  className={`relative px-4 py-2 rounded-lg cursor-pointer transition-all duration-200 flex items-center gap-2 ${
                    isSelected
                      ? "bg-[var(--tags-bg)] px-[12px] py-[6px] rounded-[6px]   border-[var(--auth-social-input-border)] border text-[var( --auth-social-input-border)] font-[600] flex items-center gap-2"
                      : "bg-[var(--white-color)] border  text-gray-700"
                  }`}
                  onClick={() => handleTagClick(categoryId, tagIndex)}
                >
                  <span>{tag}</span>

                  {isSelected && (
                    <svg
                      className="w-4 h-4 text-[var(--black-color)] cursor-pointer ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      onClick={(e) => handleRemoveTag(e, categoryId, tagIndex)}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentCategory;
