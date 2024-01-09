import "./RoundTrackerPip.scss";
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
  const baseClassName = "round-pip";
  const classNames = classnames(baseClassName, {
    [`${baseClassName}--current`]: isCurrentRound,
    [`${baseClassName}--${roundState}`]: roundState,
  });

  return (
    <li className={classNames}>
      <span className="visually-hidden">
        {roundState === "won"
          ? "Round Won"
          : roundState === "lost"
          ? "Round Lost"
          : isCurrentRound
          ? "Current Round"
          : "Un-played Round"}
      </span>
    </li>
  );
};

export default RoundTrackerPip;
