const PrimaryInformation = () => {
  "use client";

  return (
    <div className="max-w-[1222px] w-full bg-transparent mx-auto  rounded-[8px] px-[30px] py-[30px] flex flex-col border">
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <h2 className="text-[22px] font-[600]  text-[#000000]">
            ძირითადი ინფორმაცია
          </h2>
        </div>
        <p className="text-[#00000068] text-[19px]">
          განაახლეთ თქვენი პირადი მონაცემები და საკონტაქტო ინფორმაცია
        </p>
      </div>

      <form className="flex-col gap-[75px] mx-auto">
        <div className="flex gap-[75px] mt-[26px]">
          <div>
            <h3 className="text-[#000000] font-[700] text-[18px] mb-4">
              სრული სახელი
            </h3>
            <div className="max-w-[543px]">
              <label className="block mb-1  font-medium"></label>
              <input
                type="text"
                placeholder="სალომე შავიანიძე"
                className="w-[543px]  border border-[#E3E8EF] rounded-[8px] px-3 py-2 text-[18px] text-[#00000083]  font-[700] outline-none"
              />
            </div>
          </div>

          <div>
            <div>
              <h3 className="font-[700] text-[18px] text-[#000000] mb-4 ">
                იმეილი
              </h3>
              <div>
                <label className="block mb-1 text-sm font-medium"></label>
                <input
                  type="text"
                  placeholder="noza@example.com"
                  className="w-[543px] border border-[#E3E8EF] rounded-[8px] px-3 py-2 text-[18px] text-[#00000083]  font-[700] outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-[37px]">
          <h3 className="font-[700] text-[18px] text-[#000000] mb-4">bio</h3>
          <div>
            <label className="block mb-1 text-sm font-medium"></label>
            <input
              placeholder="კონტეტის შემქმნელი, სპეციალიზირებული ტექნოლოგიურ მიმოხილვებსა და ცხოვრების წესის კონტენტში. გატაცებული მიმზიდველი ვიდეოების შექმნით, რომლებიც ეხმარება ადამიანებს ინფორმირებული გადაწყვეტილებების მიღებაში "
              className="w-full border border-[#E3E8EF] rounded-[8px] px-3 h-[78px]  text-[#00000083]  font-[700]  outline-none  text-[18px] "
            />
          </div>
        </div>
        <div className="mt-[37px]">
          <h3 className="font-[700] text-[18px] text-[#000000] mb-4">
            ლოკაცია
          </h3>
          <div>
            <label className="block mb-1 text-sm font-medium"></label>
            <input
              placeholder="Georgia, Tbilisi"
              className="w-full border border-[#E3E8EF] rounded-[8px] px-3 py-2  text-[#00000083]  font-[700]   outline-none  text-[18px]  "
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default PrimaryInformation;
