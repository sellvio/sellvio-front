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
    <div className="flex flex-col justify-center gap-[37px] bg-[#0866FF33] px-[30px] py-[30px] border border-[#00000038] rounded-[8px] w-full">
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <Image
            src="/images/svg/companyDetails.svg"
            width={22}
            height={22}
            alt="logo"
          />
          <h2 className="font-[600] text-[27px]">კამპანიის დეტალები</h2>
        </div>
        <p className="text-[14px] text-[var(--campaing-form-paragraphs)]">
          კამპანიის მოთხოვნები და დამატებითი კონფიგურაცია
        </p>
      </div>

      <div className="flex gap-[75px] w-full">
        <div className="flex flex-col gap-[16px] w-1/2">
          <p className="font-bold text-[18px]">
            კამპანიის ხანგრძლივობა (დღეები)
          </p>
          <div className="flex flex-col gap-2">
            <div className="flex gap-[16px]">
              <input
                {...register('duration_days')}
                className="bg-[#FFFFFF1A] shadow-[4px_5px_6px_0px_#FFFFFF66_inset] backdrop-blur-[7.5px] px-3 py-2 border border-[#FFFFFF] rounded-[8px] outline-none w-full min-h-[56px] font-[700] text-[var(--black-color)] appearance-none"
              />
              <div className="flex justify-center items-center bg-[#DBDBDB59] border border-[#E3E8EF] rounded-[8px] w-[58px] h-[58px] shrink-0">
                <Image
                  src="/images/svg/calendar.svg"
                  width={22}
                  height={22}
                  alt="calendar"
                />
              </div>
            </div>
            <FormError message={errors.duration_days?.message} />
          </div>
        </div>

        <div className="flex flex-col gap-[16px] w-1/2">
          <p className="font-bold text-[18px]">სამიზნე აუდიტორია</p>
          <div className="flex flex-col gap-2">
            <input
              placeholder="მაგ: ტექნოლოგიების მოყვარული, 18-35 წლის"
              type="text"
              {...register('target_audience')}
              className="bg-[#FFFFFF1A] shadow-[4px_5px_6px_0px_#FFFFFF66_inset] backdrop-blur-[7.5px] px-3 py-2 border border-[#FFFFFF] rounded-[8px] outline-none w-full min-h-[56px] font-[700] text-[var(--black-color)]"
            />
            <FormError message={errors.target_audience?.message} />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center bg-[#FFFFFF1A] shadow-[4px_5px_6px_0px_#FFFFFF66_inset] backdrop-blur-[7.5px] px-3 py-2 border border-[#FFFFFF] rounded-[8px] outline-none w-full min-h-[56px] font-[700] text-[var(--black-color)] appearance-none">
          <p>ჩატში გაწევრიანების ტიპი</p>
          <div className="flex items-center gap-[10px]">
            <p className="font-bold text-[18px]">
              {chatType === 'private' ? 'დახურული' : 'საჯარო'}
            </p>
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
      </div>
      <div className="w-full">
        <h3 className="mb-4 font-[700] text-[18px] text-[var(--black-color)]">
          კამპანიის მოთხოვნები
        </h3>
        <textarea
          placeholder="მიუთითეთ ამ კამპანიისთვის სავალდებულო მოთხოვნები (კონტენტის სახელმძღვანელო მითითებები, შედეგები და ა.შ.)"
          {...register('requirements')}
          className="bg-[#FFFFFF1A] shadow-[4px_5px_6px_0px_#FFFFFF66_inset] backdrop-blur-[7.5px] px-3 py-2 border border-[#FFFFFF] rounded-[8px] outline-none w-full min-h-[218px] font-[700] text-[var(--black-color)] resize-none"
        />
        <p className="font-bold text-[#00000063] text-[18px]">
          ეს მოთხოვნები გაზიარდება შექმნელებთან{' '}
          <span className="font-bold text-black">“#მოთხოვნების არხი”</span>
        </p>
        <FormError message={errors.requirements?.message} />
      </div>
      <div className="w-full">
        <h3 className="mb-4 font-[700] text-[18px] text-[var(--black-color)]">
          შემქმნელის დამატებითი მოთხოვნები
        </h3>
        <textarea
          placeholder="არასავალდებულო: შემქმნელისთვის ნებისმიერი დამატებითი მოთხოვნა (მინიმალური გამომწერები, კომტენტის სტილი და ა.შ.)"
          {...register('additional_requirements')}
          className="bg-[#FFFFFF1A] shadow-[4px_5px_6px_0px_#FFFFFF66_inset] backdrop-blur-[7.5px] px-3 py-2 border border-[#FFFFFF] rounded-[8px] outline-none w-full min-h-[218px] font-[700] text-[var(--black-color)] resize-none"
        />
        <FormError message={errors.additional_requirements?.message} />
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="mb-4 font-[700] text-[18px] text-[var(--black-color)]">
          კამპანიის თეგები
        </h3>

        <div className="flex gap-[16px]">
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
            className="bg-[#FFFFFF1A] shadow-[4px_5px_6px_0px_#FFFFFF66_inset] backdrop-blur-[7.5px] px-3 py-2 border border-[#FFFFFF] rounded-[8px] outline-none w-full min-h-[56px] font-[700] text-[var(--black-color)] appearance-none"
          />

          <button
            type="button"
            onClick={addTag}
            className="flex justify-center items-center bg-[#FFFFFF1A] shadow-[4px_5px_6px_0px_#FFFFFF66_inset] border border-[#FFFFFF] rounded-[8px] w-[58px] h-[58px] cursor-pointer shrink-0"
          >
            <Image
              src="/images/svg/blackPlus.svg"
              width={22}
              height={22}
              alt="add tag"
            />
          </button>
        </div>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag, index) => (
              <div
                key={index}
                className="flex items-center gap-[16px] bg-[#3012B31F] shadow-[4px_5px_6px_0px_#FFFFFF66_inset] backdrop-blur-[7.5px] px-[22px] py-[10px] border border-[#3012B3] rounded-[8px]"
              >
                <span>{tag}</span>
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="font-bold text-[14px] hover:text-red-500 cursor-pointer"
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
  );
};

export default CompanyDetails;
