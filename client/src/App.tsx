import "./App.scss";
import { useState, useEffect } from "react";
import { Header } from "./components/Header/Header";

import { fetchPokemonPack } from "./components/hooks/use_pack";
import GameBoard from "./components/GameBoard/GameBoard";
import { Card } from "./types/card/card.types";
import { updateCardsThatHaveTopTrumpStat } from "./service/game/game";

function App() {
  const [pack, setPack] = useState<Card[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchPack() {
      const pack = await fetchPokemonPack();
      setIsLoading(false);
      const packWithTopTrumpStat = updateCardsThatHaveTopTrumpStat(pack);
      setPack(packWithTopTrumpStat);
    }

    fetchPack();
  }, []);

  return (
    <>
      <Header />
      <main>
        {isLoading && "Loading..."}
        {!isLoading && <GameBoard pack={pack} />}
      </main>
    </>
  );
}
export default App;
