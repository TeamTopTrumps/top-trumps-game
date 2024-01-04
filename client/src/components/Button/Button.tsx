interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  classNames: string;
  text: string;
}

const Button: React.FC<ButtonProps> = ({ type, value, name, text }) => (
  <button type={type} value={value} name={name}>
    {text}
  </button>
);

export default Button;
