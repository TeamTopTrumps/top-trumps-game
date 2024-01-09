import { Stat } from "../../types/card/card.types";
import { StatButton } from "./StatButton";

type StatsListProps = {
  stats: Stat[];
  playerId: string;
  handleStatChosen: () => void;
};

export const StatsList: React.FC<StatsListProps> = ({
  stats,
  playerId,
  handleStatChosen,
}) => {
  return (
    <div data-testid="stats-list">
      {stats.map((stat: Stat, index) => (
        <StatButton
          key={index}
          stat={stat}
          playerId={playerId}
          handleStatChosen={handleStatChosen}
        />
      ))}
    </div>
  );
};
