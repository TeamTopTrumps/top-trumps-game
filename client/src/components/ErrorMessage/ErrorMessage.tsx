import classnames from "classnames";

interface ErrorMessageProps {
  className?: string;
  messages: string[];
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ className, messages }) => {
  return (
    <>
      {messages.map((message, i) => (
        <span
          key={i}
          className={classnames("error", className)}
          aria-live="polite"
        >
          {message}
        </span>
      ))}
    </>
  );
};

export default ErrorMessage;
