import { Stat } from "../../types/card/card.types";

interface StatButtonProps {
  stat: Stat;
  playerId: string;
  handleStatChosen: (stat: Stat, playerId: string) => void;
  isEnabled: boolean;
}
export const StatButton: React.FC<StatButtonProps> = ({
  stat,
  playerId,
  handleStatChosen,
  isEnabled,
}) => {
  return (
    <button
      data-testid="stat-button"
      onClick={() => {
        handleStatChosen(stat, playerId);
      }}
      disabled={!isEnabled}
    >
      {stat.name}:{stat.value}
    </button>
  );
};
