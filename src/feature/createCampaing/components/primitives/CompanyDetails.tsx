'use client';

import Image from 'next/image';
import { useState } from 'react';
import { CompanyBasicsProps } from '../../type';
import FormError from './FormError';
import ToggleSwitch from './ToggleSwitch';

const CompanyDetails = ({
  register,
  errors,
  setValue,
  watch,
}: CompanyBasicsProps) => {
  const chatType = watch('chat_type') ?? 'public';
  const isChatPrivate = chatType === 'private';

  const [tagInput, setTagInput] = useState('');
  const tags: string[] = watch('tags') ?? [];

  const addTag = () => {
    const newTag = tagInput.trim();

    if (!newTag || tags.includes(newTag)) return;

    setValue('tags', [...tags, newTag], {
      shouldValidate: true,
      shouldDirty: true,
    });

    setTagInput('');
  };

  const removeTag = (tagToRemove: string) => {
    setValue(
      'tags',
      tags.filter((tag) => tag !== tagToRemove),
      {
        shouldValidate: true,
        shouldDirty: true,
      }
    );
  };

  return (
    <section className="bg-white shadow-[0px_12px_32px_-4px_rgba(0,19,86,0.06)] p-10 rounded-[1.5rem]">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-1">
        <div className="flex justify-center items-center bg-[#0040e0]/10 rounded-xl w-9 h-9 shrink-0">
          <Image
            src="/images/svg/companyDetails.svg"
            width={20}
            height={20}
            alt="logo"
          />
        </div>
        <h2 className="font-bold text-[#171c20] text-2xl">
          კამპანიის დეტალები
        </h2>
      </div>
      <p className="mb-8 ml-12 text-[#434656] text-sm">
        კამპანიის მოთხოვნები და დამატებითი კონფიგურაცია
      </p>

      <div className="space-y-8">
        {/* Duration + Target Audience */}
        <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
          <div>
            <label className="block mb-2 px-1 font-semibold text-[#0040e0] text-xs uppercase tracking-wide">
              კამპანიის ხანგრძლივობა (დღეები)
            </label>
            <div className="flex gap-3">
              <input
                {...register('duration_days')}
                className="bg-[#eff4f9] px-5 py-4 border-none rounded-xl outline-none focus:ring-[#0040e0] focus:ring-2 w-full font-bold text-[#171c20] transition-all appearance-none"
              />
            </div>
            <FormError message={errors.duration_days?.message} />
          </div>

          <div>
            <label className="block mb-2 px-1 font-semibold text-[#0040e0] text-xs uppercase tracking-wide">
              სამიზნე აუდიტორია
            </label>
            <input
              placeholder="მაგ: ტექნოლოგიების მოყვარული, 18-35 წლის"
              type="text"
              {...register('target_audience')}
              className="bg-[#eff4f9] px-5 py-4 border-none rounded-xl outline-none focus:ring-[#0040e0] focus:ring-2 w-full font-bold text-[#171c20] transition-all"
            />
            <FormError message={errors.target_audience?.message} />
          </div>
        </div>

        {/* Chat Type Toggle */}
        <div className="flex justify-between items-center bg-[#eff4f9] p-6 rounded-xl">
          <p className="font-bold text-[#171c20]">ჩატში გაწევრიანების ტიპი</p>
          <div className="flex items-center gap-3">
            <span className="font-bold text-[#171c20] text-sm">
              {chatType === 'private' ? 'დახურული' : 'საჯარო'}
            </span>
            <ToggleSwitch
              value={isChatPrivate}
              onToggle={(newValue) =>
                setValue('chat_type', newValue ? 'private' : 'public', {
                  shouldValidate: true,
                  shouldDirty: true,
                })
              }
            />
          </div>
        </div>

        {/* Requirements */}
        <div>
          <label className="block mb-2 px-1 font-semibold text-[#0040e0] text-xs uppercase tracking-wide">
            კამპანიის მოთხოვნები
          </label>
          <textarea
            placeholder="მიუთითეთ ამ კამპანიისთვის სავალდებულო მოთხოვნები (კონტენტის სახელმძღვანელო მითითებები, შედეგები და ა.შ.)"
            {...register('requirements')}
            className="bg-[#eff4f9] px-5 py-4 border-none rounded-xl outline-none focus:ring-[#0040e0] focus:ring-2 w-full font-bold text-[#171c20] transition-all resize-none"
            rows={4}
          />
          <p className="mt-2 px-1 text-[#434656]/80 text-sm">
            ეს მოთხოვნები გაზიარდება შექმნელებთან{' '}
            <span className="font-bold text-[#171c20]">
              &quot;#მოთხოვნების არხი&quot;
            </span>
          </p>
          <FormError message={errors.requirements?.message} />
        </div>

        {/* Additional Requirements */}
        <div>
          <label className="block mb-2 px-1 font-semibold text-[#0040e0] text-xs uppercase tracking-wide">
            შემქმნელის დამატებითი მოთხოვნები
          </label>
          <textarea
            placeholder="არასავალდებულო: შემქმნელისთვის ნებისმიერი დამატებითი მოთხოვნა (მინიმალური გამომწერები, კომტენტის სტილი და ა.შ.)"
            {...register('additional_requirements')}
            className="bg-[#eff4f9] px-5 py-4 border-none rounded-xl outline-none focus:ring-[#0040e0] focus:ring-2 w-full font-bold text-[#171c20] transition-all resize-none"
            rows={4}
          />
          <FormError message={errors.additional_requirements?.message} />
        </div>

        {/* Tags */}
        <div>
          <label className="block mb-3 px-1 font-semibold text-[#0040e0] text-xs uppercase tracking-wide">
            კამპანიის თეგები
          </label>

          <div className="flex gap-3 mb-4">
            <input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addTag();
                }
              }}
              placeholder="თეგის დამატება"
              className="bg-[#eff4f9] px-5 py-4 border-none rounded-xl outline-none focus:ring-[#0040e0] focus:ring-2 w-full font-bold text-[#171c20] transition-all"
            />
            <button
              type="button"
              onClick={addTag}
              className="flex justify-center items-center bg-[#0040e0] rounded-xl w-14 h-14 hover:scale-105 active:scale-95 transition-all shrink-0"
            >
              <Image
                src="/images/svg/blackPlus.svg"
                width={20}
                height={20}
                alt="add tag"
                className="brightness-0 invert"
              />
            </button>
          </div>

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 bg-[#eff4f9] p-4 border-2 border-transparent focus-within:border-[#0040e0]/20 rounded-xl transition-all">
              {tags.map((tag, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-[#0040e0] px-4 py-1.5 rounded-full font-bold text-white text-sm"
                >
                  <span>{tag}</span>
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="hover:opacity-70 text-[14px] leading-none transition-opacity cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}

          <FormError message={errors.tags?.message} />
        </div>
      </div>
    </section>
  );
};

export default CompanyDetails;
