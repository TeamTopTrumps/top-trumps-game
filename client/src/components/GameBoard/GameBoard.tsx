import { useState, useRef, useMemo, useEffect } from "react";
import { Game } from "../../types/game/game.types";
import { Player } from "../../types/player/player.types";
import { initialiseGame, thresholdToWin } from "../../service/game/game";
import {
  DEFAULT_PLAYERS,
  DEFAULT_ROUNDS,
  DEFAULT_TIMEOUT,
} from "../../constants/constants";
import {
  chooseRandomStat,
  calculateRoundWinner,
  moveTopCardToBottom,
} from "../../service/round/round";
import PlayerScore from "../PlayerScore/PlayerScore";
import GameWinner from "../Winner/GameWinner";

interface GameBoardProps {
  game: Game;
  updateGame: (game: Game) => void;
}

const GameBoard: React.FC<GameBoardProps> = ({ game, updateGame }) => {
  const { players, totalRounds, roundWinners, gameStatus, currentRound } = game;

  const player1 = players[0];
  const player2 = players[1];

  const currentRoundRef = useRef<number>(0);
  const currentPlayerRef = useRef<Player>(players[0]);

  const updatePlayerName = (id: string, value: string) => {
    const updatedGame: Game = {
      ...game,
      players: players.map((player) => {
        return player.id === id ? { ...player, name: value.trim() } : player;
      }),
    };
    updateGame(updatedGame);
  };

  const [currentRoundWinner, setCurrentRoundWinner] = useState<string>("");

  const winThreshold = useMemo(
    () => thresholdToWin(totalRounds),

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
    updateGame(initialiseGame(DEFAULT_PLAYERS, DEFAULT_ROUNDS));
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

    const updatedGame: Game = {
      ...game,
      currentRound: currentRound + 1,
      gameStatus: "ROUND_IN_PROGRESS",
      players: players.map((prevPlayer) =>
        prevPlayer.id === currPlayer.id
          ? { ...prevPlayer, isCardShown: true, isCardEnabled: true }
          : prevPlayer
      ),
    };
    updateGame(updatedGame);
  };

  const playRound = () => {
    const stat = chooseRandomStat(
      currentPlayerRef.current.cards[0].stats,
      currentPlayerRef.current.cards[0].stats.length
    );

    const updatedGame: Game = {
      ...game,
      players: players.map((player) => {
        return { ...player, isCardShown: true, isCardEnabled: false };
      }),
    };

    updateGame(updatedGame);

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
        const updatedGame: Game = {
          ...game,
          players: players.map((player) => {
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
          roundWinners: [...roundWinners, currentRoundWinner],
          gameStatus: "ROUND_FINISHED",
        };
        updateGame(updatedGame);
        setCurrentRoundWinner("");
      }, DEFAULT_TIMEOUT);
    }
  }, [currentRoundWinner, game, gameStatus, players, roundWinners, updateGame]);

  if (gameStatus === "ROUND_FINISHED") {
    if (currentHighScore === winThreshold) {
      console.log("there is a winner");

      const updatedGame: Game = {
        ...game,
        gameStatus: "FINISHED",
      };
      updateGame(updatedGame);
    } else if (currentRoundRef.current === totalRounds) {
      console.log("end of game");
      const updatedGame: Game = {
        ...game,
        gameStatus: "FINISHED",
      };
      updateGame(updatedGame);
      console.log(calculateGameWinners);
    } else {
      const updatedGame: Game = {
        ...game,
        gameStatus: "ROUND_READY",
      };
      updateGame(updatedGame);
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
};

export default GameBoard;
