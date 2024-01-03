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
  const classNames = classnames({
    "current-round": isCurrentRound,
    [`round-${roundState}`]: roundState,
  });

  return <span className={classNames}></span>;
};

export default RoundTrackerPip;
