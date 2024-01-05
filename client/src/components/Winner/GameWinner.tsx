import { Player } from "../../types/player/player.types";

interface GameWinnerProps {
  player: Player | null;
}

const GameWinner: React.FC<GameWinnerProps> = ({ player }) => {
  return (
    <>
      {player && (
        <div className="game-winner">
          Congratulations {player.name}! You caught them all!
        </div>
      )}
    </>
  );
};

export default GameWinner;
