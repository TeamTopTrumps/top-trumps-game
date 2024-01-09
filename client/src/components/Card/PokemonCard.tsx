import { Card } from "../../types/card/card.types";
import { StatsList } from "../StatsList/StatsList";

type PokemonCardProps = {
  pokemon: Card;
  isFlipped: boolean;
  playerId: string;
  handleStatChosen: () => void;
  isEnabled: boolean;
};

export const PokemonCard: React.FC<PokemonCardProps> = ({
  pokemon,
  isFlipped,
  playerId,
  handleStatChosen,
  isEnabled,
}) => {
  return (
    <div key={pokemon.id}>
      {isFlipped ? (
        <div>
          <h2>{pokemon.name}</h2>
          <img src={pokemon.imageUrl} alt={`Image for ${pokemon.name}`} />
          <p>{pokemon.description}</p>
          <p>{pokemon.type}</p>
          <StatsList
            stats={pokemon.stats}
            playerId={playerId}
            handleStatChosen={handleStatChosen}
            isEnabled={isEnabled}
          />
        </div>
      ) : (
        <div>
          <h2>{pokemon.name}</h2>
          <img src={pokemon.imageUrl} alt={`Image for ${pokemon.name}`} />
        </div>
      )}
    </div>
  );
};
