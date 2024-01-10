import "./PlayerScore.scss";

import { useState } from "react";
import RoundTracker from "../RoundTracker/RoundTracker";
import TextInput from "../TextInput/TextInput";
import validatePlayerName from "../../validation/validate_player_name";

interface PlayerScoreProps {
  name: string;
  id: string;
  updateName: (id: string, value: string) => void;
  score: number;
  currentRound: number;
  totalRounds: number;
  roundWinners: string[];
}

const PlayerScore: React.FC<PlayerScoreProps> = (props) => {
  const {
    name,
    id,
    updateName,
    score,
    currentRound,
    totalRounds,
    roundWinners,
  } = props;

  const [inputPlayerName, setInputPlayerName] = useState<string>(name);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const handleChange = (id: string, value: string) => {
    setInputPlayerName(value);

    const errors = validatePlayerName(value);
    setValidationErrors(errors);

    if (errors.length === 0) {
      updateName(id, value);
    }
  };

  const roundScores = roundWinners.map((roundWinner) =>
    roundWinner === id ? "won" : "lost"
  );
  const allRounds = Array(totalRounds).fill("unresolved");

  allRounds.splice(0, roundScores.length, ...roundScores);

  return (
    <div className="player-score">
      <TextInput
        className="player-score__name"
        value={inputPlayerName}
        label="Player name"
        isHiddenLabel={true}
        name={id}
        id={id}
        onChange={handleChange}
        validationErrors={validationErrors}
      />

      <RoundTracker rounds={allRounds} currentRound={currentRound} />
      <span className="player-score__total">{score}</span>
    </div>
  );
};

export default PlayerScore;
