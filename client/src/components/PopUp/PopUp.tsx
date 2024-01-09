import "./Popup.scss";
import classnames from "classnames";

interface PopUpProps {
  className?: string;
  isShown: boolean;
  handleIsShown?: (value: boolean) => void;
  hasClose: boolean;
  children?: React.ReactNode;
}
const PopUp: React.FC<PopUpProps> = (props) => {
  const { className, isShown, handleIsShown, hasClose, children } = props;

  const classNames = classnames("popup", className);

  return (
    <>
      {isShown && (
        <div className={classNames}>
          <div className="popup__inner">
            {hasClose && handleIsShown && (
              <button
                className="popup__close-btn"
                onClick={() => handleIsShown(false)}
              >
                X<span className="visually-hidden">Close</span>
              </button>
            )}
            {children}
          </div>
        </div>
      )}
    </>
  );
};
export default PopUp;
