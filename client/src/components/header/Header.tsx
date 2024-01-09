import "./Header.scss";

import { useState } from "react";
import { Rules } from "../Rules/Rules";
import PopUp from "../PopUp/PopUp";
import Button from "../Button/Button";

export const Header: React.FC = () => {
  const [buttonPopup, setButtonPopup] = useState(false);

  const updateBtnPopUp = () => {
    setButtonPopup(!buttonPopup);
  };
  return (
    <header className="header">
      <Button
        className={"header__rules-btn"}
        text="Game Rules"
        onClick={updateBtnPopUp}
      />
      <PopUp isShown={buttonPopup} handleIsShown={updateBtnPopUp}>
        <Rules />
      </PopUp>
      <h2 className="header__title">
        Pokémon Top Trumps - Gotta Catch 'Em All!
      </h2>
    </header>
  );
};
