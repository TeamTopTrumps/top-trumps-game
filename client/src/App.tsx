import "./App.scss";
import { useState } from "react";
import { Header } from "./components/Header/Header";
import PlayerScore from "./components/PlayerScore/PlayerScore";
import { Game } from "./types/game/game.types";
import { DEFAULT_ROUNDS, DEFAULT_PLAYERS } from "./constants/constants";
import { initialiseGame, getInitialPlayerNames } from "./service/game";
import validatePlayerName from "./validation/validate_player_name";
import { PlayerNameAndId } from "./types/player/player.types";

function App() {
  const [game, setGame] = useState<Game>(
    initialiseGame(DEFAULT_PLAYERS, DEFAULT_ROUNDS)
  );
  const player1 = game.players[0];
  const player2 = game.players[1];

  const [inputPlayerNames, setInputPlayerNames] = useState<PlayerNameAndId[]>(
    getInitialPlayerNames(game.players)
  );

  const updatePlayerName = (id: string, value: string) => {
    setInputPlayerNames((currentInput) => {
      return currentInput.map((input) =>
        input.id === id ? { id: id, name: value } : input
      );
    });

    const errorMessages = validatePlayerName(value);

    if (errorMessages.length === 0) {
      setGame((currentGame) => {
        const updatedPlayers = currentGame.players.map((player) => {
          return player.id === id ? { ...player, name: value } : player;
        });
        return {
          ...currentGame,
          players: updatedPlayers,
        };
      });
    }
  };

  return (
    <>
      <PlayerScore
        name={
          inputPlayerNames.find(({ id }) => id === player1.id)?.name ??
          player1.name
        }
        id={player1.id}
        updateName={updatePlayerName}
        validateName={validatePlayerName}
        score={player1.score}
        currentRound={game.currentRound}
        totalRounds={game.totalRounds}
        roundWinners={[]}
      />
      <script></script>
      Player 1 name in game object is: {player1.name}
      <PlayerScore
        name={
          inputPlayerNames.find(({ id }) => id === player2.id)?.name ??
          player1.name
        }
        id={player2.id}
        updateName={updatePlayerName}
        validateName={validatePlayerName}
        score={player2.score}
        currentRound={game.currentRound}
        totalRounds={game.totalRounds}
        roundWinners={[]}
      />
      Player 2 name in game object is: {player2.name}
      <Header />
    </>
  );
}
export default App;
