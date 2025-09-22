const PrimaryInformation = () => {
  "use client";

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

      <form className="flex-col max-w-[1222px] w-full gap-[75px] mx-auto">
        <div className="flex lg:flex-row flex-col gap-[75px] max-w-[1162px] w-full mt-[26px]">
          <div className="w-full">
            <h3 className="text-[var(--black-color)] font-[700] text-[18px] mb-4">
              სრული სახელი
            </h3>
            <div className="max-w-[543px] w-full">
              <input
                type="text"
                placeholder="სალომე შავიანიძე"
                className="max-w-[543px] w-full  border border-[var(--auth-input-border)] rounded-[8px] px-3 py-2 text-[18px] text-[var(--adding-tags-color)]  font-[700] outline-none"
              />
            </div>
          </div>

          <div className="w-full">
            <div>
              <h3 className="font-[700] text-[18px] text-[var(--black-color)] mb-4 ">
                იმეილი
              </h3>
              <div>
                <input
                  type="text"
                  placeholder="noza@example.com"
                  className="max-w-[543px] w-full border border-[var(--auth-input-border)] rounded-[8px] px-3 py-2 text-[18px] text-[var(--adding-tags-color)]  font-[700] outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-[37px]">
          <h3 className="font-[700] text-[18px] text-[var(--black-color)] mb-4">
            bio
          </h3>
          <div>
            <input
              placeholder="კონტეტის შემქმნელი, სპეციალიზირებული ტექნოლოგიურ მიმოხილვებსა და ცხოვრების წესის კონტენტში. გატაცებული მიმზიდველი ვიდეოების შექმნით, რომლებიც ეხმარება ადამიანებს ინფორმირებული გადაწყვეტილებების მიღებაში "
              className=" max-w-[1440px] w-full border border-[var(--auth-input-border)] rounded-[8px] px-3 h-[78px]  text-[var(--adding-tags-color)]   font-[700]  outline-none  text-[18px]"
            />
          </div>
        </div>
        <div className="mt-[37px]">
          <h3 className="font-[700] text-[18px] text-[var(--adding-tags-color)]  mb-4">
            ლოკაცია
          </h3>
          <div>
            <input
              placeholder="Georgia, Tbilisi"
              className="w-full border border-[var(--auth-input-border)]  rounded-[8px] px-3 py-2  text-[var(--adding-tags-color)]  font-[700] outline-none  text-[18px]"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default PrimaryInformation;
