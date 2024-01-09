import classnames from "classnames";
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

  const winnerText = singleWinner
    ? `Congratulations ${winnerNameString}! You caught them all!`
    : `${winnerNameString} have drawn! Have another game to catch them all!`;

  const winnerClass = classnames("game-result", {
    "game-result--winner": singleWinner,
    "game-result--draw": !singleWinner,
  });

  return <>{players[0] && <h1 className={winnerClass}>{winnerText}</h1>}</>;
};

export default GameWinner;
