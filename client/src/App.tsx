import "./App.scss";
import { useState, useRef, useEffect } from "react";
import { Header } from "./components/header/Header";
import PlayerScore from "./components/PlayerScore/PlayerScore";
import { Game } from "./types/game/game.types";
import { Player } from "./types/player/player.types";
import {
  DEFAULT_ROUNDS,
  DEFAULT_PLAYERS,
  DEFAULT_TIMEOUT,
} from "./constants/constants";
import { initialiseGame } from "./service/game/game";
import {
  calculateRoundWinner,
  chooseRandomStat,
  updatePlayerCards,
  updatePlayerIsCardShown,
  updatePlayerIsCardShownAll,
  updatePlayerScores,
  updateRoundWinners,
} from "./service/round/round";
import { Stat } from "./types/card/card.types";

import { fetchPokemonPack } from "./components/hooks/use_pack";

const EMPTY_GAME = {
  players: [],
  totalRounds: 0,
  currentRound: 0,
  roundWinners: [],
};

const EMPTY_PLAYER = {
  id: "",
  name: "",
  score: 0,
  cards: [],
  isCardShown: false,
  isHuman: false,
};

function App() {
  const [game, setGame] = useState<Game>(EMPTY_GAME);
  const currentRoundRef = useRef<number>(0);
  const currentPlayerRef = useRef<Player>(EMPTY_PLAYER);

  useEffect(() => {
    async function fetchPack() {
      const pack = await fetchPokemonPack();

      const game = initialiseGame(DEFAULT_PLAYERS, DEFAULT_ROUNDS, pack);
      setGame(game);
      currentPlayerRef.current = game.players[0];
    }

    fetchPack();
  }, []);

  if (game.players.length === 0) return <p>Loading pack...</p>;

  const { players, totalRounds, roundWinners } = game;

  const player1 = players[0];
  const player2 = players[1];

  const updatePlayerName = (id: string, value: string) => {
    setGame((currentGame) => {
      const updatedPlayers = currentGame.players.map((player) => {
        return player.id === id ? { ...player, name: value.trim() } : player;
      });
      return {
        ...currentGame,
        players: updatedPlayers,
      };
    });
  };

  const showPlayerCard = (player: Player) => {
    setGame((prevGame: Game) => {
      return {
        ...prevGame,
        players: updatePlayerIsCardShown(prevGame.players, player.id),
      };
    });
  };

  const showAllCards = () => {
    setGame((prevGame: Game) => {
      return {
        ...prevGame,
        players: updatePlayerIsCardShownAll(prevGame.players, true),
      };
    });
  };

  const hideAllCards = () => {
    setGame((prevGame: Game) => {
      return {
        ...prevGame,
        players: updatePlayerIsCardShownAll(prevGame.players, false),
      };
    });
  };

  const nextPlayer = () => {
    const prevPlayer = currentPlayerRef.current;
    const prevPlayerIndex = players.findIndex(
      (player) => player.id === prevPlayer.id
    );
    let nextPlayer: Player;
    if (prevPlayerIndex === players.length - 1) {
      nextPlayer = players[0];
    } else {
      nextPlayer = players[prevPlayerIndex + 1];
    }
    currentPlayerRef.current = nextPlayer;
    startRound(nextPlayer);
  };

  const startRound = (player: Player) => {
    currentRoundRef.current = currentRoundRef.current + 1;

    setGame((prevGame: Game) => {
      return {
        ...prevGame,
        currentRound: prevGame.currentRound + 1,
      };
    });

    showPlayerCard(player);

    if (!player.isHuman) {
      const stat = chooseRandomStat(
        player.cards[0].stats,
        player.cards[0].stats.length
      );
      setTimeout(() => {
        playRound(stat, player);
      }, DEFAULT_TIMEOUT);
    }
  };

  const playRound = (stat: Stat, player: Player) => {
    showAllCards();

    setTimeout(() => {
      const { id } = calculateRoundWinner(players, stat, player);
      console.log("winner " + id);

      setGame((prevGame: Game) => {
        return {
          ...prevGame,
          players: updatePlayerScores(prevGame.players, id),
          roundWinners: updateRoundWinners(prevGame.roundWinners, id),
          //roundsPlayed: prevGame.roundsPlayed + 1,
        };
      });

      endRound();
    }, DEFAULT_TIMEOUT);
  };

  const endRound = () => {
    hideAllCards();

    setTimeout(() => {
      setGame((prevGame: Game) => {
        return { ...prevGame, players: updatePlayerCards(prevGame.players) };
      });
      if (currentRoundRef.current === totalRounds) {
        console.log("end of game");
      } else {
        nextPlayer();
      }
    }, DEFAULT_TIMEOUT);
  };

  return (
    <>
      <Header />
      <PlayerScore
        name={player1.name}
        id={player1.id}
        updateName={updatePlayerName}
        score={player1.score}
        currentRound={currentRoundRef.current}
        totalRounds={totalRounds}
        roundWinners={roundWinners}
      />
      <PlayerScore
        name={player1.name}
        id={player2.id}
        updateName={updatePlayerName}
        score={player2.score}
        currentRound={currentRoundRef.current}
        totalRounds={totalRounds}
        roundWinners={roundWinners}
      />
      <button onClick={() => startRound(currentPlayerRef.current)}>
        Start Round
      </button>
      <p>Current round is: {game.currentRound}</p>
      <p>Player 1 score is: {player1.score}</p>
      <p>Player 1 card is: {player1.cards[0].name}</p>
      <p>Player 1 card is shown: {player1.isCardShown ? "true" : "false"}</p>
      <p>Player 2 score is {player2.score}</p>
      <p>Player 2 card is: {player2.cards[0].name}</p>
      <p>Player 2 card is shown: {player2.isCardShown ? "true" : "false"}</p>
      <p>The Round Winners are: {roundWinners}</p>
    </>
  );
}
export default App;
