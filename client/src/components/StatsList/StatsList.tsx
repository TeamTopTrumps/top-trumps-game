import { Stat } from "../../types/card/card.types";
import { StatButton } from "./StatButton";

type StatsListProps = {
  stats: Stat[];
  playerId: string;
  handleStatChosen: () => void;
  isEnabled: boolean;
};

export const StatsList: React.FC<StatsListProps> = ({
  stats,
  playerId,
  handleStatChosen,
  isEnabled,
}) => {
  return (
    <div data-testid="stats-list">
      {stats.map((stat: Stat, index) => (
        <StatButton
          key={index}
          stat={stat}
          playerId={playerId}
          handleStatChosen={handleStatChosen}
          isEnabled={isEnabled}
        />
      ))}
    </div>
  );
};
