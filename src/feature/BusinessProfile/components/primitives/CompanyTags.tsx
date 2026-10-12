'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { getIndustryTags } from '@/lib/api/login';
import { BusinessProfileInfo } from '../../type';

type Tag = { id: number; name: string };

type Props = {
  profile: BusinessProfileInfo | null | undefined;
  changeProfile: boolean;
  selectedTagIds: number[];
  onChange: (ids: number[]) => void;
};

const CompanyTags: React.FC<Props> = ({
  profile,
  changeProfile,
  selectedTagIds,
  onChange,
}) => {
  const [inputValue, setInputValue] = useState('');

  const { data } = useQuery({
    queryKey: ['businessTag'],
    queryFn: getIndustryTags,
    enabled: changeProfile,
  });

  const allTags: Tag[] = Array.isArray(data?.data) ? data.data : [];

  // Resolve names for the selected ids (profile tags are known before the
  // full tag list loads)
  const tagNames = new Map<number, string>();
  profile?.business_tags?.forEach((tag) =>
    tagNames.set(tag.tag_id, tag.tags?.name)
  );
  allTags.forEach((tag) => tagNames.set(tag.id, tag.name));

  const availableOptions = allTags.filter(
    (tag) =>
      !selectedTagIds.includes(tag.id) &&
      tag.name.toLowerCase().includes(inputValue.trim().toLowerCase())
  );

  const addTag = () => {
    const value = inputValue.trim().toLowerCase();
    if (!value) return;
    const found = allTags.find((tag) => tag.name.toLowerCase() === value);
    if (!found) return;
    if (!selectedTagIds.includes(found.id)) {
      onChange([...selectedTagIds, found.id]);
    }
    setInputValue('');
  };

  const removeTag = (id: number) =>
    onChange(selectedTagIds.filter((tagId) => tagId !== id));

  return (
    <div className="flex flex-col gap-[30px] bg-[rgba(88,60,207,0.02)] shadow-[0_8px_13px_0_rgba(0,0,0,0.04),4px_5px_6px_0_rgba(255,255,255,0.4)_inset,-1px_-3px_4px_0_rgba(255,255,255,0.4)_inset] backdrop-blur-[7.5px] p-[30px] border border-[rgba(0,0,0,0.22)] rounded-[8px] w-full max-w-[1225px]">
      <div>
        <p className="font-semibold text-[20px]">კონტენტის კატეგორია</p>
        <p className="text-[#000000AD] text-[14px]">
          აირჩიეთ კატეგორიები რომლებიც შეესაბამება თქვენი კონტენტის სტილს
        </p>
      </div>
      <div className="flex flex-wrap gap-[8px]">
        {changeProfile && (
          <div className="flex justify-between items-center bg-[#FFFFFF24] pr-[18px] border border-[#E3E8EF] rounded-[8px] w-full max-w-[463px] min-h-[42px]">
            <input
              placeholder="შეიყვანეთ კონტენტის კატეგორია..."
              type="text"
              list="business-tag-options"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addTag();
                }
              }}
              className="px-[18px] outline-none w-full h-full min-h-[42px] font-bold text-[#111827] text-[18px]"
            />
            <datalist id="business-tag-options">
              {availableOptions.map((tag) => (
                <option key={tag.id} value={tag.name} />
              ))}
            </datalist>
            <button className="cursor-pointer" type="button" onClick={addTag}>
              <Image
                src={'/images/businessProfileIcon/svg/categoryPlus.svg'}
                alt="pluse"
                width={22}
                height={22}
              />
            </button>
          </div>
        )}
        <div className="flex flex-wrap gap-[8px]">
          {selectedTagIds.length === 0 && !changeProfile && (
            <p className="text-[#000000AD] text-[14px]">
              კატეგორიები არ არის მითითებული
            </p>
          )}
          {selectedTagIds.map((id) => (
            <div
              key={id}
              className="flex items-center gap-[8px] bg-[#3012B31F] px-[22px] py-[10px] border border-[#3012B3] rounded-[8px] font-semibold text-[#111827]"
            >
              {tagNames.get(id) ?? id}
              {changeProfile && (
                <button
                  type="button"
                  onClick={() => removeTag(id)}
                  className="text-[#3012B3] cursor-pointer"
                  aria-label="წაშლა"
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompanyTags;
