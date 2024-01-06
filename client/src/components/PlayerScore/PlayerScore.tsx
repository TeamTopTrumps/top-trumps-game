import RoundTracker from "../RoundTracker/RoundTracker";
import TextInput from "../TextInput/TextInput";

interface PlayerScoreProps {
  name: string;
  id: string;
  updateName: (id: string, value: string) => void;
  score: number;
  currentRound: number;
  totalRounds: number;
  roundWinners: string[];
  validateName: (value: string) => string[];
}

const PlayerScore: React.FC<PlayerScoreProps> = ({
  name,
  id,
  updateName,
  score,
  currentRound,
  totalRounds,
  roundWinners,
  validateName,
}) => {
  const roundScores = roundWinners.map((roundWinner) =>
    roundWinner === id ? "won" : "lost"
  );
  const allRounds = Array(totalRounds).fill("unresolved");

  allRounds.splice(0, roundScores.length, ...roundScores);

  return (
    <div className="player-score">
      <div>
        <TextInput
          className="player-score__name"
          value={name}
          label=""
          name={id}
          id={id}
          onChange={updateName}
          validate={validateName}
        />
        <span className="player-score__total">{score}</span>
      </div>
      <RoundTracker rounds={allRounds} currentRound={currentRound} />
    </div>
  );
};

export default PlayerScore;
