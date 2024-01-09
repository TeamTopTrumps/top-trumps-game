import { Stat } from "../../types/card/card.types";

interface StatButtonProps {
  stat: Stat;
  playerId: string;
  handleStatChosen: (stat: Stat, playerId: string) => void;
}
export const StatButton: React.FC<StatButtonProps> = ({
  stat,
  playerId,
  handleStatChosen,
}) => {
  return (
    <button
      data-testid="stat-button"
      onClick={() => {
        handleStatChosen(stat, playerId);
      }}
    >
      {stat.name}:{stat.value}
    </button>
  );
};
