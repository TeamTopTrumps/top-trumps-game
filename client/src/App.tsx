import "./App.scss";
import PlayerScore from "./components/PlayerScore/PlayerScore";
import { DEFAULT_ROUNDS } from "./constants/constants";

function App() {
  return (
    <>
      <PlayerScore
        playerName={"Player 1"}
        playerId={"player1"}
        updateName={() => {}}
        playerScore={0}
        currentRound={1}
        totalRounds={DEFAULT_ROUNDS}
        roundWinners={[]}
      />
      <PlayerScore
        playerName={"Player 2"}
        playerId={"player2"}
        updateName={() => {}}
        playerScore={0}
        currentRound={1}
        totalRounds={DEFAULT_ROUNDS}
        roundWinners={[]}
      />
    </>
  );
}

export default App;
