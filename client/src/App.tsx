import "./App.scss";
import PlayerScore from "./components/PlayerScore/PlayerScore";
import { DEFAULT_ROUNDS, DEFAULT_PLAYERS } from "./constants/constants";
import { Header } from "./components/header/Header";
import { initialiseGame } from "./service/game";
import { useState } from "react";
import { Game } from "./types/game/game.types";
function App() {
  const [game, setGame] = useState<Game>(
    initialiseGame(DEFAULT_PLAYERS, DEFAULT_ROUNDS)
  );
  const player1 = game.players[0];
  const player2 = game.players[1];

  return (
    <>
      <PlayerScore
        playerName={player1.name}
        playerId={player1.id}
        updateName={() => {}}
        playerScore={player1.score}
        totalRounds={game.totalRounds}
        roundWinners={[]}
      />
      <PlayerScore
        playerName={player2.name}
        playerId={player2.id}
        updateName={() => {}}
        playerScore={player2.score}
        totalRounds={game.totalRounds}
        roundWinners={[]}
      />
      <Header />
    </>
  );
}
export default App;
