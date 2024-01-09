import { Stat } from "../../types/card/card.types";
import { StatButton } from "./StatButton";

type StatsListProps = {
  stats: Stat[];
  playerId: string;
  playRound: () => void;
};

export const StatsList: React.FC<StatsListProps> = ({
  stats,
  playerId,
  playRound,
}) => {
  return (
    <div data-testid="stats-list">
      {stats.map((stat: Stat, index) => (
        <StatButton
          key={index}
          stat={stat}
          playerId={playerId}
          playRound={playRound}
        />
      ))}
    </div>
  );
};
