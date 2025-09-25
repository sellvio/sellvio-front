import { ButtonSliderProps } from "../../types";

const ToggleButtons = ({ active, setActive }: ButtonSliderProps) => {
  return (
    <div className=" mx-auto mb-[28px] mt-[65px] flex justify-between bg-[var(--auth-buttonSlider-bg)] px-[14px] py-[12px] rounded-[12px] w-full max-w-[1387px] min-h-[72px] overflow-hidden">
      <button
        className={`flex ${
          active === "analytic" && "bg-[var(--white-color)]"
        } justify-center items-center rounded-[12px] text-[var(--adding-tags-color)] w-1/2 font-[700]  cursor-pointer`}
        onClick={() => setActive("analytic")}
      >
        ანალიტიკა
      </button>
      <button
        className={`flex justify-center ${
          active === "campaing" && "bg-[var(--white-color)]"
        }  items-center rounded-[12px] text-[var(--adding-tags-color)] w-1/2 font-[700]  cursor-pointer`}
        onClick={() => setActive("campaing")}
      >
        კამპინგი
      </button>
    </div>
  );
};

export default ToggleButtons;
