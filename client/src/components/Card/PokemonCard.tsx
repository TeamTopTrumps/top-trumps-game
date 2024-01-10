import classnames from "classnames";

import "./PokemonCard.scss";
import { Card, Stat } from "../../types/card/card.types";
import { StatsList } from "../StatsList/StatsList";

type PokemonCardProps = {
  pokemon: Card;
  isShown: boolean;
  playerId: string;
  handleStatChosen: (stat: Stat) => void;
  isEnabled: boolean;
};

export const PokemonCard: React.FC<PokemonCardProps> = ({
  pokemon,
  isShown,
  handleStatChosen,
  isEnabled,
}) => {
  const { name, imageUrl, type, stats } = pokemon;
  const classNames = classnames("card", { "card--show": isShown });

  return (
    <div className={classNames}>
      <div className="card__inner">
        <div className="card__front">
          <h2 className="card__title">{name}</h2>
          <p>{type.replaceAll(",", "/")}</p>
          <img className="card__img" src={imageUrl} alt={`Image for ${name}`} />
          <StatsList
            className="card_stats"
            stats={stats}
            handleStatChosen={handleStatChosen}
            isEnabled={isEnabled}
          />
        </div>
        <div className="card__back">
          <img src="./Poke_Ball.png" alt="" />
        </div>
      </div>
    </div>
  );
};
