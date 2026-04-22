'use client';

import Image from 'next/image';
import { useState } from 'react';

const ExtraMedia = () => {
  const [activeTab, setActiveTab] = useState<'file' | 'link'>('file');

  return (
    <section className="bg-white shadow-[0px_12px_32px_-4px_rgba(0,19,86,0.06)] p-10 rounded-[1.5rem]">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-1">
        <div className="flex justify-center items-center bg-[#0040e0]/10 rounded-xl w-9 h-9 shrink-0">
          <Image
            src="/images/svg/upload.svg"
            width={20}
            height={20}
            alt="logo"
          />
        </div>
        <h2 className="font-bold text-[#171c20] text-2xl">
          ატვირთეთ მედიის აქტივები
        </h2>
      </div>
      <p className="mb-8 ml-12 text-[#434656] text-sm">
        იმ შემთხვევაში, თუ კონტენტის შექმნისთვის საჭიროა თქვენი ფოტოებისა და
        ვიდეოების გამოყენება, გთხოვთ ატვირთოთ, რათა შეძლონ გამოყენება
      </p>

      <div className="space-y-6">
        {/* Tab Switcher */}
        <div className="flex bg-[#eff4f9] p-1 rounded-full w-fit">
          <button
            type="button"
            onClick={() => setActiveTab('file')}
            className={`px-8 py-2 rounded-full text-sm font-bold transition-all ${
              activeTab === 'file'
                ? 'bg-[#0040e0] text-white shadow-md'
                : 'text-[#434656] hover:text-[#0040e0]'
            }`}
          >
            ფაილის ატვირთვა
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('link')}
            className={`px-8 py-2 rounded-full text-sm font-bold transition-all ${
              activeTab === 'link'
                ? 'bg-[#0040e0] text-white shadow-md'
                : 'text-[#434656] hover:text-[#0040e0]'
            }`}
          >
            ბმულის დამატება
          </button>
        </div>

        {/* File Upload Panel */}
        {activeTab === 'file' && (
          <div className="group flex flex-col justify-center items-center bg-[#eff4f9]/30 hover:bg-[#0040e0]/5 p-10 border-[#c4c5d9] border-2 border-dashed rounded-2xl transition-all">
            <div className="flex justify-center items-center bg-[#0040e0]/10 mb-4 rounded-full w-14 h-14 group-hover:scale-110 transition-transform">
              <Image
                src="/images/svg/gallery.svg"
                width={28}
                height={28}
                alt="ატვირთე ფაილი"
              />
            </div>
            <p className="mb-1 font-bold text-[#171c20] text-center">
              გადმოათრიეთ ფაილები აქ
            </p>
            <p className="mb-6 text-[#434656] text-xs text-center">
              მაქსიმალური ზომა: 50MB (JPG, PNG, MP4)
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                className="flex items-center gap-2 bg-[#0040e0] px-6 py-2.5 rounded-full font-bold text-white text-sm hover:scale-105 active:scale-95 transition-all"
              >
                <span className="text-lg leading-none">+</span>
                დამატება
              </button>
              <button
                type="button"
                className="flex items-center gap-2 bg-[#e9eef3] hover:bg-red-50 px-6 py-2.5 rounded-full font-bold text-[#434656] hover:text-red-500 text-sm active:scale-95 transition-all"
              >
                წაშლა
              </button>
            </div>
          </div>
        )}

        {/* Link Panel */}
        {activeTab === 'link' && (
          <div className="bg-[#eff4f9] p-6 rounded-2xl">
            <label className="block mb-3 px-1 font-semibold text-[#0040e0] text-xs uppercase tracking-wide">
              ჩასვით ბმული
            </label>
            <div className="flex gap-3">
              <div className="relative flex-grow">
                <Image
                  src="/images/svg/upload.svg"
                  width={18}
                  height={18}
                  alt="link icon"
                  className="top-1/2 left-4 absolute opacity-40 -translate-y-1/2"
                />
                <input
                  type="url"
                  className="bg-white shadow-sm px-12 py-3.5 border-none rounded-xl focus:outline-none focus:ring-[#0040e0] focus:ring-2 w-full text-[#171c20] placeholder:text-[#747688]/50 transition-all"
                  placeholder="https://..."
                />
              </div>
              <button
                type="button"
                className="bg-[#0040e0] shadow-md px-8 py-3.5 rounded-xl font-bold text-white text-sm hover:scale-[1.02] active:scale-95 transition-all"
              >
                დამატება
              </button>
            </div>
            <p className="mt-3 px-1 text-[#434656] text-xs italic">
              მაგ: YouTube, Vimeo ან ფაილის პირდაპირი ბმული
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ExtraMedia;
