import "./StatButton.scss";
import { Stat } from "../../../types/card/card.types";

interface StatButtonProps {
  stat: Stat;
  handleStatChosen: (stat: Stat) => void;
  isEnabled: boolean;
}
export const StatButton: React.FC<StatButtonProps> = ({
  stat,
  handleStatChosen,
  isEnabled,
}) => {
  return (
    <button
      className="stat-button"
      data-testid="stat-button"
      onClick={() => {
        handleStatChosen(stat);
      }}
      disabled={!isEnabled}
    >
      <span>{stat.name}</span>
      <span>{stat.value}</span>
    </button>
  );
};
