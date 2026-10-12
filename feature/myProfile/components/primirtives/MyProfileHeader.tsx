import Image from "next/image";

type MyProfileHeaderProps = {
  isEditing: boolean;
  isSaving: boolean;
  canEdit: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
};

const MyProfileHeader = ({
  isEditing,
  isSaving,
  canEdit,
  onEdit,
  onSave,
  onCancel,
}: MyProfileHeaderProps) => {
  return (
    <div className="flex w-full items-center px-5 py-6 mx-auto bg-[var(--header-bg)]">
      <div className="max-w-[1222px] w-full flex justify-between items-center mx-auto">
        <h1 className="text-[var(--black-color)] font-[600] text-[22px]">
          ჩემი პროფილი
        </h1>
        {isEditing ? (
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onCancel}
              disabled={isSaving}
              className="rounded-[8px] text-[19px] font-[700] py-3 px-4 border border-[var(--component-border-color)] cursor-pointer disabled:opacity-60"
            >
              გაუქმება
            </button>
            <button
              type="button"
              onClick={onSave}
              disabled={isSaving}
              className="bg-[var(--hero-icon)] text-[var(--white-color)] font-[700] rounded-[8px] text-[19px] shrink-0 border-none py-3 px-4 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSaving ? "ინახება..." : "შენახვა"}
            </button>
          </div>
        ) : (
          <button
            type="button"
            aria-label="შეასწორე პროფილი"
            onClick={onEdit}
            disabled={!canEdit}
            className="bg-[var(--hero-icon)] text-[var(--white-color)] font-[700] rounded-[8px] text-[19px] shrink-0 border-none py-3 px-2 cursor-pointer flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <Image
              src="/images/svg/correctProfile.svg"
              alt="პროფილის შეცვლა"
              width={22}
              height={22}
            />
            <span>შეასწორე პროფილი</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default MyProfileHeader;
