import "./StatsList.scss";

import classnames from "classnames";
import { Stat } from "../../types/card/card.types";
import { StatButton } from "./StatButton/StatButton";

type StatsListProps = {
  className?: string;
  stats: Stat[];
  handleStatChosen: (stat: Stat) => void;
  isEnabled: boolean;
};

export const StatsList: React.FC<StatsListProps> = ({
  className,
  stats,
  handleStatChosen,
  isEnabled,
}) => {
  const classNames = classnames("stats-list", className);
  return (
    <div data-testid="stats-list" className={classNames}>
      {stats.map((stat: Stat, index) => (
        <StatButton
          key={index}
          stat={stat}
          handleStatChosen={handleStatChosen}
          isEnabled={isEnabled}
        />
      ))}
    </div>
  );
};
