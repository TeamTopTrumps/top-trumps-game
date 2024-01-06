import RoundTracker from "../RoundTracker/RoundTracker";
import TextInput from "../TextInput/TextInput";

interface PlayerScoreProps {
  playerName: string;
  playerId: string;
  updateName: (id: string, value: string) => void;
  playerScore: number;
  totalRounds: number;
  roundWinners: string[];
}

const PlayerScore: React.FC<PlayerScoreProps> = ({
  playerName,
  playerId,
  updateName,
  playerScore,
  totalRounds,
  roundWinners,
}) => {
  const roundScores = roundWinners.map((round) =>
    round === playerId ? "won" : "lost"
  );
  const allRounds = Array(totalRounds).fill("unresolved");

  allRounds.splice(0, roundScores.length, ...roundScores);

  return (
    <div className="player-score">
      <div>
        <TextInput
          className="player-score__name"
          value={playerName}
          label=""
          name={playerId}
          id={playerId}
          onChange={updateName}
        />
        <span className="player-score__total">{playerScore}</span>
      </div>
      <RoundTracker rounds={allRounds} currentRound={roundWinners.length + 1} />
    </div>
  );
};

export default PlayerScore;
