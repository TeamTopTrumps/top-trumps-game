//import "./Popup.css";
import React, { useEffect, useState } from "react";
import { Rules } from "../Rules/Rules";
import PopUp from "../PopUp/PopUp";

export const Header: React.FC = () => {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [timedPopup, setTimedPopup] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setTimedPopup(true);
    }, 3000);
  }, []);
  const updateBtnPopUp = (value: boolean) => {
    setButtonPopup(value);
  };
  return (
    <>
      <button onClick={() => updateBtnPopUp(true)}> Game Rules </button>
      <PopUp trigger={buttonPopup} setTrigger={updateBtnPopUp}>
        <Rules />
      </PopUp>
      <h2>Gotta Catch 'Em All!</h2>
    </>
  );
};
