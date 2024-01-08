import { Player } from "../../types/player/player.types";

interface GameWinnerProps {
  players: Player[];
}

const GameWinner: React.FC<GameWinnerProps> = (props) => {
  const players = props.players;

  if (players.length === 1) {
    return (
      <>
        {players[0] && (
          <div className="game-winner">
            Congratulations {players[0].name}! You caught them all!
          </div>
        )}
      </>
    );
  } else return <div>Draw</div>;
};

export default GameWinner;
