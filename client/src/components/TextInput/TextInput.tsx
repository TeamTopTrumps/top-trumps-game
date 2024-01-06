import classnames from "classnames";

import ErrorMessage from "../ErrorMessage/ErrorMessage";

interface TextInputProps {
  className?: string;
  label: string;
  isHiddenLabel?: boolean;
  name: string;
  id: string;
  value: string;
  onChange: (id: string, value: string) => void;
  validate?: (value: string) => string[];
}

const TextInput: React.FC<TextInputProps> = (props) => {
  const {
    className,
    label,
    isHiddenLabel = false,
    name,
    id,
    value,
    onChange,
    validate,
  } = props;

  const errorMessages = validate && validate(value);

  return (
    <label
      className={classnames(
        "text-input__label",
        errorMessages && "text-input__label--error",
        className
      )}
    >
      <span
        className={classnames({ "visually-hidden": isHiddenLabel })}
      >{`${label}: `}</span>
      <input
        className="text-input"
        type="text"
        name={name}
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.id, e.target.value)}
      />
      {errorMessages && errorMessages.length > 0 && (
        <ErrorMessage
          className={"text-input__error"}
          messages={errorMessages}
        />
      )}
    </label>
  );
};

export default TextInput;
