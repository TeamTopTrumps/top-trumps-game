import "./GameWinner.scss";
import { Player } from "../../types/player/player.types";

interface GameWinnerProps {
  players: Player[];
}

const GameWinner: React.FC<GameWinnerProps> = (props) => {
  const { players } = props;

  const singleWinner = players.length === 1;
  const winnerNameString = singleWinner
    ? players[0].name
    : players.map((p) => p.name).join(", ");

  return (
    <>
      {players[0] &&
        (singleWinner ? (
          <div className="game-result game-result--winner">
            <p className="game-result__text">{`Congratulations ${winnerNameString}!`}</p>
            <p className="game-result__text">You caught them all!</p>
          </div>
        ) : (
          <div className="game-result game-result--draw">
            <p
              data-testid="players-drawn1"
              className="game-result__text"
            >{`${winnerNameString} have drawn!`}</p>
            <p data-testid="players-drawn2" className="game-result__text">
              Have another game to catch them all!
            </p>
          </div>
        ))}
    </>
  );
};

export default GameWinner;
