import "./App.scss";
import { useState, useRef, useMemo, useEffect } from "react";
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
  moveTopCardToBottom,
  chooseRandomStat,
} from "./service/round/round";
import GameWinner from "./components/Winner/GameWinner";

function App() {
  const [game, setGame] = useState<Game>(
    initialiseGame(DEFAULT_PLAYERS, DEFAULT_ROUNDS)
  );

  const { players, totalRounds, roundWinners, gameStatus } = game;

  const player1 = players[0];
  const player2 = players[1];

  const currentRoundRef = useRef<number>(0);
  const currentPlayerRef = useRef<Player>(players[0]);

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

  const [currentRoundWinner, setCurrentRoundWinner] = useState<string>("");

  const winThreshold = useMemo(
    () =>
      totalRounds % 2 === 0
        ? Math.ceil(totalRounds / 2 + 1)
        : Math.ceil(totalRounds / 2),
    [totalRounds]
  );

  const currentHighScore = useMemo(
    () =>
      players.reduce((prev, current) => {
        return prev > current.score ? prev : current.score;
      }, 0),
    [players]
  );

  const calculateGameWinners = useMemo(() => {
    if (gameStatus === "FINISHED") {
      return players.filter((p) => p.score === currentHighScore);
    }
    return null;
  }, [gameStatus, players, currentHighScore]);

  const resetGame = () => {
    setGame(initialiseGame(DEFAULT_PLAYERS, DEFAULT_ROUNDS));
    currentPlayerRef.current = players[0];
    currentRoundRef.current = 0;
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

  const startRound = (currPlayer: Player) => {
    currentRoundRef.current = currentRoundRef.current + 1;

    setGame((prevGame: Game) => {
      return {
        ...prevGame,
        currentRound: prevGame.currentRound + 1,
        gameStatus: "ROUND_IN_PROGRESS",
        players: prevGame.players.map((prevPlayer) =>
          prevPlayer.id === currPlayer.id
            ? { ...prevPlayer, isCardShown: true, isCardEnabled: true }
            : prevPlayer
        ),
      };
    });
  };

  const playRound = () => {
    const stat = chooseRandomStat(
      currentPlayerRef.current.cards[0].stats,
      currentPlayerRef.current.cards[0].stats.length
    );

    setGame((prevGame: Game) => {
      return {
        ...prevGame,
        players: prevGame.players.map((player) => {
          return { ...player, isCardShown: true, isCardEnabled: false };
        }),
      };
    });

    const { id } = calculateRoundWinner(
      players,
      stat,
      currentPlayerRef.current
    );

    setCurrentRoundWinner(id);
  };

  useEffect(() => {
    if (gameStatus === "ROUND_IN_PROGRESS" && currentRoundWinner) {
      setTimeout(() => {
        setGame((prevGame: Game) => {
          return {
            ...prevGame,
            players: prevGame.players.map((player) => {
              const updatedCards = moveTopCardToBottom(player.cards);
              return player.id === currentRoundWinner
                ? {
                    ...player,
                    score: player.score + 1,
                    isCardShown: false,
                    cards: updatedCards,
                  }
                : { ...player, isCardShown: false, cards: updatedCards };
            }),
            roundWinners: [...prevGame.roundWinners, currentRoundWinner],
            gameStatus: "ROUND_FINISHED",
          };
        });
        setCurrentRoundWinner("");
      }, DEFAULT_TIMEOUT);
    }
  }, [currentRoundWinner, gameStatus]);

  if (gameStatus === "ROUND_FINISHED") {
    if (currentHighScore === winThreshold) {
      console.log("there is a winner");

      setGame((prevGame: Game) => {
        return {
          ...prevGame,
          gameStatus: "FINISHED",
        };
      });
      console.log(calculateGameWinners);
    } else if (currentRoundRef.current === totalRounds) {
      console.log("end of game");

      setGame((prevGame: Game) => {
        return {
          ...prevGame,
          gameStatus: "FINISHED",
        };
      });
      console.log(calculateGameWinners);
    } else {
      setGame((prevGame: Game) => {
        return {
          ...prevGame,
          gameStatus: "ROUND_READY",
        };
      });
    }
  }

  const handleOnClick = () => {
    if (gameStatus === "READY") {
      startRound(currentPlayerRef.current);
    } else if (gameStatus === "ROUND_READY") {
      nextPlayer();
    } else if (gameStatus === "FINISHED") {
      resetGame();
    }
  };

  const buttonText =
    gameStatus === "READY"
      ? "Start Game"
      : gameStatus === "ROUND_READY"
      ? "Next Round"
      : gameStatus === "FINISHED"
      ? "Play Again?"
      : "";

  return (
    <>
      <Header />
      <div className="player-scores">
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
      </div>
      {(gameStatus === "READY" ||
        gameStatus === "ROUND_READY" ||
        gameStatus === "FINISHED") && (
        <button onClick={() => handleOnClick()}>{buttonText}</button>
      )}
      {player1.isCardShown && (
        <div>
          <p>Player 1 card is visible </p>
          <button onClick={() => playRound()} disabled={!player1.isCardEnabled}>
            Choose a Stat
          </button>
        </div>
      )}
      {player2.isCardShown && (
        <div>
          <p>Player 2 card is visible </p>
          <button onClick={() => playRound()} disabled={!player2.isCardEnabled}>
            Choose a Stat
          </button>
        </div>
      )}
      <p></p>
      <p>Current round is: {game.currentRound}</p>
      <p>Player 1 score is: {player1.score}</p>
      <p>Player 1 card is: {player1.cards[0].name}</p>
      <p>Player 1 card is shown: {player1.isCardShown ? "true" : "false"}</p>
      <p>Player 2 score is {player2.score}</p>
      <p>Player 2 card is: {player2.cards[0].name}</p>
      <p>Player 2 card is shown: {player2.isCardShown ? "true" : "false"}</p>
      <p>The Round Winners are: {roundWinners}</p>

      {calculateGameWinners && <GameWinner players={calculateGameWinners} />}
    </>
  );
}
export default App;
