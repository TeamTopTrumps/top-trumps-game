import classnames from "classnames";

export const ROUND_STATES = ["won", "lost", "unresolved"] as const;
export type RoundState = (typeof ROUND_STATES)[number];

interface RoundTrackerPipProps {
  isCurrentRound: boolean;
  roundState: RoundState;
}

export const RoundTrackerPip: React.FC<RoundTrackerPipProps> = ({
  isCurrentRound,
  roundState,
}) => {
  const classNames = classnames({
    "current-round": isCurrentRound,
    [`round-${roundState}`]: roundState,
  });

  return <span className={classNames}></span>;
};
