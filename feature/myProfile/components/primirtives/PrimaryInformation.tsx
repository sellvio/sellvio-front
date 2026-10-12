import { ProfileFormState } from "../../types";

type PrimaryInformationProps = {
  form: ProfileFormState;
  email: string;
  isEditing: boolean;
  onChange: (patch: Partial<ProfileFormState>) => void;
};

const inputClass =
  "w-full border border-[var(--auth-input-border)] rounded-[8px] px-3 py-2 text-[18px] text-[var(--adding-tags-color)] font-[700] outline-none read-only:bg-[#F7F7F7]";

const PrimaryInformation = ({
  form,
  email,
  isEditing,
  onChange,
}: PrimaryInformationProps) => {
  return (
    <div className="max-w-[1222px] w-full bg-transparent mx-auto border-[var(--component-border-color)]   rounded-[8px] px-[30px] py-[30px] flex flex-col border">
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <h2 className="text-[22px] font-[600]  text-[var(--black-color)]">
            ძირითადი ინფორმაცია
          </h2>
        </div>
        <p className="text-[var(--campaing-form-paragraphs)] text-[19px]">
          განაახლეთ თქვენი პირადი მონაცემები და საკონტაქტო ინფორმაცია
        </p>
      </div>

      <form
        className="flex-col max-w-[1222px] w-full gap-[75px] mx-auto"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="flex lg:flex-row flex-col gap-[75px] max-w-[1162px] w-full mt-[26px]">
          <div className="w-full">
            <h3 className="text-[var(--black-color)] font-[700] text-[18px] mb-4">
              სრული სახელი
            </h3>
            <div className="max-w-[543px] w-full">
              <input
                type="text"
                value={form.fullName}
                readOnly={!isEditing}
                onChange={(e) => onChange({ fullName: e.target.value })}
                placeholder="სახელი გვარი"
                className={inputClass}
              />
            </div>
          </div>

          <div className="w-full">
            <h3 className="font-[700] text-[18px] text-[var(--black-color)] mb-4 ">
              იმეილი
            </h3>
            <div className="max-w-[543px] w-full">
              <input type="email" value={email} readOnly className={inputClass} />
            </div>
          </div>
        </div>

        <div className="mt-[37px]">
          <h3 className="font-[700] text-[18px] text-[var(--black-color)] mb-4">
            ბიო
          </h3>
          <textarea
            value={form.bio}
            readOnly={!isEditing}
            onChange={(e) => onChange({ bio: e.target.value })}
            placeholder="მოკლედ აღწერეთ თქვენი კონტენტი"
            rows={3}
            className={`${inputClass} resize-none`}
          />
        </div>
        <div className="mt-[37px]">
          <h3 className="font-[700] text-[18px] text-[var(--black-color)]  mb-4">
            ლოკაცია
          </h3>
          <input
            value={form.location}
            readOnly={!isEditing}
            onChange={(e) => onChange({ location: e.target.value })}
            placeholder="Georgia, Tbilisi"
            className={inputClass}
          />
        </div>
      </form>
    </div>
  );
};

export default PrimaryInformation;
