import RoundTrackerPip from "./RoundTrackerPip/RoundTrackerPip";
import { RoundState } from "./RoundTracker.types";

interface RoundTrackerProps {
  currentRound: number;
  rounds: RoundState[];
}

const RoundTracker: React.FC<RoundTrackerProps> = ({
  currentRound,
  rounds,
}) => {
  return (
    <>
      <div className="player-score__round-tracker">
        Rounds:
        <ol className="player-score__round-list">
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
