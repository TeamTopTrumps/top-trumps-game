import React from "react";
interface PopUpProps {
  trigger: boolean;
  setTrigger: (value: boolean) => void;
  children?: React.ReactNode;
}
const PopUp: React.FC<PopUpProps> = (props) => {
  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <button className="close-btn" onClick={() => props.setTrigger(false)}>
          Close
        </button>
        {props.children}
      </div>
    </div>
  ) : (
    ""
  );
};
export default PopUp;
