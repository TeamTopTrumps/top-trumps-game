import "./App.scss";
import { useState } from "react";
import PlayerScore from "./components/PlayerScore/PlayerScore";
import {
  DEFAULT_ROUNDS,
  DEFAULT_PLAYERS,
  DEFAULT_STARTING_PLAYERS,
} from "./constants/constants";
import { Header } from "./components/header/Header";
import { initialiseGame } from "./service/game";
import { Game } from "./types/game/game.types";
import { Player } from "./types/player/player.types";
import { StatName } from "./types/card/card.types";

const calculateRoundWinner = (players: Player[], statName: StatName) =>
  players.reduce(
    (acc, { id, cards }) => {
      const cardScore = cards[0].stats.find(
        ({ name }) => name === statName
      )?.value;

      if (cardScore && cardScore > acc.score) {
        acc = { id: id, score: cardScore };
      }

      return acc;
    },
    { id: "", score: 0 }
  );

function App() {
  const [game, setGame] = useState<Game>(
    initialiseGame(DEFAULT_PLAYERS, DEFAULT_ROUNDS)
  );
  const player1 = game.players[0];
  const player2 = game.players[1];

  //round starts with two players each with five cards
  //at start of round the top card from the playing player is revealed
  //player chooses a characteristic from the list by clicking on the characteristic
  //function then compares the value of that characteristic with the value of that characteristic on the top card of every other player
  //player with the card with the highest value for that characteristic wins the round

  const [players, setPlayers] = useState<Player[]>(DEFAULT_STARTING_PLAYERS);
  const [roundWinners, setRoundWinners] = useState<string[]>([]);
  const [statName, setStatName] = useState<string>("");

  const showPlayerCard = (id: string) => {
    const updatedPlayers = players.map((player) =>
      player.id === id
        ? { ...player, isCardFlipped: !player.isCardShown }
        : player
    );
    setPlayers(updatedPlayers);
  };

  const showAllCards = () => {
    const updatedPlayers = players.map((player) => {
      return { ...player, isCardFlipped: true };
    });
    setPlayers(updatedPlayers);
  };

  const hideAllCards = () => {
    const updatedPlayers = players.map((player) => {
      return { ...player, isCardFlipped: false };
    });
    setPlayers(updatedPlayers);
  };

  const updatePlayerScore = (id: string) => {
    const updatedPlayers = players.map((player) =>
      player.id === id ? { ...player, score: player.score + 1 } : player
    );
    setPlayers(updatedPlayers);
  };

  const updateRoundWinners = (id: string) => {
    setRoundWinners([...roundWinners, id]);
  };

  const startRound = (id: string) => {
    showPlayerCard(id);
  };

  const playRound = (players: Player[], statName: StatName) => {
    showAllCards();

    const { id } = calculateRoundWinner(players, statName);

    updateRoundWinners(id);
    updatePlayerScore(id);

    hideAllCards();
  };

  return (
    <>
      <PlayerScore
        playerName={player1.name}
        playerId={player1.id}
        updateName={() => {}}
        playerScore={player1.score}
        currentRound={game.currentRound}
        totalRounds={game.totalRounds}
        roundWinners={[]}
      />
      <PlayerScore
        playerName={player2.name}
        playerId={player2.id}
        updateName={() => {}}
        playerScore={player2.score}
        currentRound={game.currentRound}
        totalRounds={game.totalRounds}
        roundWinners={[]}
      />
      <Header />
    </>
  );
}
export default App;
