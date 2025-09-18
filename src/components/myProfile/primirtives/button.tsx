import { ButtonProps } from "../types";

const Button: React.FC<ButtonProps> = ({
  text,
  color,
  size,
  img,
  onClick,
  type = "button",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`rounded-[8px] text-center ${color} ${size} ${
        img ? "flex items-center gap-2" : ""
      }`}
    >
      {img && <img src={img} alt="icon" className="w-5 h-5" />}
      {text}
    </button>
  );
};

export default Button;
