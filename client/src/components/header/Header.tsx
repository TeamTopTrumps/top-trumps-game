import { useState } from "react";
import { Rules } from "../Rules/Rules";
import PopUp from "../PopUp/PopUp";

export const Header: React.FC = () => {
  const [buttonPopup, setButtonPopup] = useState(false);

  const updateBtnPopUp = (value: boolean) => {
    setButtonPopup(value);
  };
  return (
    <>
      <button onClick={() => updateBtnPopUp(true)}> Game Rules </button>
      <PopUp isShown={buttonPopup} handleIsShown={updateBtnPopUp}>
        <Rules />
      </PopUp>
      <h2>Gotta Catch 'Em All!</h2>
    </>
  );
};
