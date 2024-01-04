import "./App.scss";
import { useState } from "react";
import PlayerScore from "./components/PlayerScore/PlayerScore";
import {
  DEFAULT_ROUNDS,
  DEFAULT_STARTING_PLAYERS,
} from "./constants/constants";
import { Player } from "./types/player/player.types";
import { StatName } from "./types/character/character.types";

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
