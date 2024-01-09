import "./App.scss";
import { useState, useEffect } from "react";
import { Header } from "./components/Header/Header";
import { Game } from "./types/game/game.types";
import {
  DEFAULT_ROUNDS,
  DEFAULT_PLAYERS,
  PLACEHOLDER_GAME,
} from "./constants/constants";
import { initialiseGame } from "./service/game/game";

import { fetchPokemonPack } from "./components/hooks/use_pack";
import GameBoard from "./components/GameBoard/GameBoard";

function App() {
  const [game, setGame] = useState<Game>(PLACEHOLDER_GAME);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchPack() {
      const pack = await fetchPokemonPack();
      setIsLoading(false);
      const game = initialiseGame(DEFAULT_PLAYERS, DEFAULT_ROUNDS, pack);
      setGame(game);
    }

    fetchPack();
  }, []);

  const handleUpdateGame = (game: Game) => {
    setGame((currentGame) => {
      return { ...currentGame, ...game };
    });
  };

  return (
    <>
      <Header />
      {!isLoading && <GameBoard game={game} updateGame={handleUpdateGame} />}
    </>
  );
}
export default App;
