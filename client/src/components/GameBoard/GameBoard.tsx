import "./GameBoard.scss";

import { useState, useRef, useMemo, useEffect } from "react";
import { Game } from "../../types/game/game.types";
import { Player } from "../../types/player/player.types";
import {
  highestScore,
  initialiseGame,
  thresholdToWin,
  whosWon,
} from "../../service/game/game";
import {
  DEFAULT_PLAYERS,
  DEFAULT_ROUNDS,
  DEFAULT_TIMEOUT,
} from "../../constants/constants";
import {
  chooseRandomStat,
  calculateRoundWinner,
  moveTopCardToBottom,
  getNextPlayer,
} from "../../service/round/round";
import PlayerScore from "../PlayerScore/PlayerScore";
import GameWinner from "../Winner/GameWinner";
import { PokemonCard } from "../Card/PokemonCard";
import Button from "../Button/Button";
import { Card } from "../../types/card/card.types";

interface GameBoardProps {
  pack: Card[];
}

const GameBoard: React.FC<GameBoardProps> = ({ pack }) => {
  const [game, setGame] = useState<Game>(
    initialiseGame(DEFAULT_PLAYERS, DEFAULT_ROUNDS, pack)
  );
  const { players, totalRounds, roundWinners, gameStatus, currentRound } = game;

  const player1 = players[0];
  const player2 = players[1];

  const currentRoundRef = useRef<number>(0);
  const currentPlayerRef = useRef<Player>(players[0]);

  const updatePlayerName = (id: string, value: string) => {
    setGame((currentGame) => {
      return {
        ...currentGame,
        players: players.map((player) => {
          return player.id === id ? { ...player, name: value.trim() } : player;
        }),
      };
    });
  };

  const [currentRoundWinner, setCurrentRoundWinner] = useState<string>("");

  const winThreshold = useMemo(
    () => thresholdToWin(totalRounds),
    [totalRounds]
  );

  const currentHighScore = useMemo(() => highestScore(players), [players]);

  const calculateGameWinners = useMemo(
    () => whosWon(gameStatus, currentHighScore, players),
    [gameStatus, players, currentHighScore]
  );

  const resetGame = () => {
    setGame(initialiseGame(DEFAULT_PLAYERS, DEFAULT_ROUNDS, pack));
    currentPlayerRef.current = players[0];
    currentRoundRef.current = 0;
  };

  const nextPlayer = () => {
    const nextPlayer = getNextPlayer(currentPlayerRef.current, players);
    currentPlayerRef.current = nextPlayer;
    startRound(nextPlayer);
  };

  const startRound = (currPlayer: Player) => {
    currentRoundRef.current = currentRoundRef.current + 1;
    setGame((currentGame) => {
      return {
        ...currentGame,
        currentRound: currentRound + 1,
        gameStatus: "ROUND_IN_PROGRESS",
        players: players.map((prevPlayer) =>
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

    setGame((currentGame) => {
      return {
        ...currentGame,
        players: players.map((player) => {
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
        setGame((currentGame) => {
          return {
            ...currentGame,
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
        });
        setCurrentRoundWinner("");
      }, DEFAULT_TIMEOUT);
    }
  }, [currentRoundWinner, game, gameStatus, players, roundWinners]);

  if (gameStatus === "ROUND_FINISHED") {
    if (currentHighScore === winThreshold) {
      console.log("there is a winner");
      setGame((currentGame) => {
        return { ...currentGame, gameStatus: "FINISHED" };
      });
    } else if (currentRoundRef.current === totalRounds) {
      console.log("end of game");
      setGame((currentGame) => {
        return { ...currentGame, gameStatus: "FINISHED" };
      });
      console.log(calculateGameWinners);
    } else {
      setGame((currentGame) => {
        return { ...currentGame, gameStatus: "ROUND_READY" };
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
      <div className="gameboard__cards">
        <PokemonCard
          pokemon={player1.cards[0]}
          isFlipped={player1.isCardShown}
          playerId={player1.id}
          handleStatChosen={playRound}
          isEnabled={player1.isCardEnabled}
        />
        <PokemonCard
          pokemon={player2.cards[0]}
          isFlipped={player2.isCardShown}
          playerId={player2.id}
          handleStatChosen={playRound}
          isEnabled={player2.isCardEnabled}
        />
      </div>
      {(gameStatus === "READY" ||
        gameStatus === "ROUND_READY" ||
        gameStatus === "FINISHED") && (
        <Button text={buttonText} onClick={handleOnClick} />
      )}
      {calculateGameWinners && <GameWinner players={calculateGameWinners} />}
    </>
  );
};

export default GameBoard;
