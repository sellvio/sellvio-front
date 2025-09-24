"use client";

const ContentCategory = () => {
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
    </div>
  );
};

export default ContentCategory;
