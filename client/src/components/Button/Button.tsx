import classnames from "classnames";

interface ButtonProps {
  className?: string;
  id?: string;
  text: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ className, id, text, onClick }) => {
  const classNames = classnames("btn", className);

  return (
    <button
      className={classNames}
      id={id}
      type="button"
      onClick={() => onClick()}
    >
      {text}
    </button>
  );
};

export default Button;
