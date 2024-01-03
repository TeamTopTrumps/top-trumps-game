import RoundTracker from "../RoundTracker/RoundTracker";
import TextInput from "../TextInput/TextInput";

interface PlayerScoreProps {
  playerName: string;
  playerId: string;
  updateName: (id: string, value: string) => void;
  playerScore: number;
  currentRound: number;
  totalRounds: number;
  roundWinners: string[];
}

const PlayerScore: React.FC<PlayerScoreProps> = ({
  playerName,
  playerId,
  updateName,
  playerScore,
  currentRound,
  totalRounds,
  roundWinners,
}) => {
  const roundScores = roundWinners.map((round) =>
    round === playerId ? "won" : "lost"
  );
  const allRounds = Array(totalRounds).fill("unresolved");

  allRounds.splice(0, roundScores.length, ...roundScores);

  return (
    <>
      <TextInput
        value={playerName}
        label=""
        name={playerId}
        id={playerId}
        onChange={updateName}
      />
      <span>{playerScore}</span>
      <RoundTracker rounds={allRounds} currentRound={currentRound} />
    </>
  );
};

export default PlayerScore;
