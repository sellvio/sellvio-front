import { ButtonProps } from "../../types";

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
      className={`rounded-[8px] ${color} ${size} ${
        img ? "flex items-center justify-center gap-2" : ""
      }`}
    >
      {img && <img src={img} alt="icon" className="w-5 h-5" />}
      <span>{text}</span>
    </button>
  );
};

export default Button;
