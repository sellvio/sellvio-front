import React from 'react';

type Props = {
  isPending: boolean;
  setChangeProfile: (v: boolean) => void;
};

const CompanyActions: React.FC<Props> = ({ isPending, setPopupVisible }) => {
  return (
    <div className="flex justify-end m-auto mt-[48px] w-full max-w-[1225px]">
      <div className="flex gap-[22px]">
        <button
          type="button"
          onClick={() => setPopupVisible(true)}
          className="shadow-[4px_5px_6px_0px_rgba(255,255,255,0.4)_inset,-1px_-3px_4px_0px_rgba(255,255,255,0.4)_inset,0px_8px_13px_0px_rgba(0,0,0,0.04)] backdrop-blur-[7.5px] px-[77px] py-[16px] border border-[#0866FF] rounded-[8px] font-bold text-[#0061FF] text-[14px] cursor-pointer"
          disabled={isPending}
        >
          გაუქმება
        </button>
        <button
          type="submit"
          className="disabled:opacity-50 backdrop-blur-[7.5px] px-[60px] py-[16px] border border-white rounded-[8px] font-bold text-[#FFFFFF]"
          disabled={isPending}
          style={{
            background: '#0866FFE0',
            borderWidth: '0.5px',
            boxShadow: `
      4px 5px 6px 0px #FFFFFF66 inset,
      -1px -3px 4px 0px #FFFFFF66 inset,
      0px 8px 13px 0px #0000000A
    `,
          }}
        >
          {isPending ? 'მიმდინარეობს...' : 'დადასტურება'}
        </button>
      </div>
    </div>
  );
};

export default CompanyActions;
