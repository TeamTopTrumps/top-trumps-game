import "./TextInput.scss";

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
    <div
      className={classnames(
        "text-input",
        { "text-input--error": errorMessages?.length },
        className
      )}
    >
      <label className="text-input__label">
        <span
          className={classnames({ "visually-hidden": isHiddenLabel })}
        >{`${label}: `}</span>
        <input
          className="text-input__field"
          type="textarea"
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
    </div>
  );
};

export default TextInput;
