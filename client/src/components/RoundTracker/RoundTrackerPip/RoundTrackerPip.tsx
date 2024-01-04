import classnames from "classnames";
import { RoundState } from "../RoundTracker.types";

interface RoundTrackerPipProps {
  isCurrentRound: boolean;
  roundState: RoundState;
}

const RoundTrackerPip: React.FC<RoundTrackerPipProps> = ({
  isCurrentRound,
  roundState,
}) => {
  const baseClassName = "player-score__round";
  const classNames = classnames(baseClassName, {
    [`${baseClassName}--current`]: isCurrentRound,
    [`${baseClassName}--${roundState}`]: roundState,
  });

  return <li className={classNames}></li>;
};

export default RoundTrackerPip;
