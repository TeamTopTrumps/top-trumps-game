import "./StatButton.scss";
import { Stat } from "../../../types/card/card.types";
import classnames from "classnames";

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
  const baseClassName = "stat-button";
  const classNames = classnames(baseClassName, {
    [`${baseClassName}--top-trump`]: stat.isTopTrump,
  });
  return (
    <button
      className={classNames}
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
