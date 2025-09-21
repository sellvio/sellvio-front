import { ButtonSliderProps } from '../../type';

const ButtonSlider = ({ active, setActive }: ButtonSliderProps) => {
  return (
    <div className="flex justify-between bg-[#00000014] px-[14px] py-[12px] rounded-[12px] w-full max-w-[1325px] min-h-[72px]">
      <button
        className={`flex justify-center items-center rounded-[12px] w-1/2 font-bold py-3 cursor-pointer transition-colors duration-300 ${
          active === 'business'
            ? 'bg-gradient-to-r from-[#3012B3] to-[#7B62E8] text-white'
            : 'text-[#3012B3CC] bg-transparent'
        }`}
        onClick={() => setActive('business')}
      >
        ბიზნესი
      </button>
      <button
        className={`flex justify-center items-center rounded-[12px] w-1/2 font-bold py-3 cursor-pointer transition-colors duration-300 ${
          active === 'creator'
            ? 'bg-gradient-to-r from-[#3012B3] to-[#7B62E8] text-white'
            : 'text-[#3012B3CC] bg-transparent'
        }`}
        onClick={() => setActive('creator')}
      >
        შემქმნელი
      </button>
    </div>
  );
};

export default ButtonSlider;
