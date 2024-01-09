import { Stat } from "../../types/card/card.types";

interface StatButtonProps {
  stat: Stat;
  playerId: string;
  playRound: (stat: Stat, playerId: string) => void;
}
export const StatButton: React.FC<StatButtonProps> = ({
  stat,
  playerId,
  playRound,
}) => {
  const handleButtonClick = () => {
    playRound(stat, playerId);
  };
  return (
    <button data-testid="stat-button" onClick={handleButtonClick}>
      {stat.name}:{stat.value}
    </button>
  );
};
