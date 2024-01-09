import "./RoundTracker.scss";

import classnames from "classnames";
import RoundTrackerPip from "./RoundTrackerPip/RoundTrackerPip";
import { RoundState } from "./RoundTracker.types";

interface RoundTrackerProps {
  className?: string;
  currentRound: number;
  rounds: RoundState[];
}

const RoundTracker: React.FC<RoundTrackerProps> = ({
  className,
  currentRound,
  rounds,
}) => {
  return (
    <>
      <div className={classnames("round-tracker", className)}>
        <ol className="round-tracker__list">
          {rounds.map((round, i) => (
            <RoundTrackerPip
              key={i}
              isCurrentRound={i + 1 === currentRound}
              roundState={round}
            />
          ))}
        </ol>
      </div>
    </>
  );
};

export default RoundTracker;
