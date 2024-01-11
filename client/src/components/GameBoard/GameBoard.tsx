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
  calculateRoundWinner,
  moveTopCardToBottom,
  getNextPlayer,
} from "../../service/round/round";
import PlayerScore from "../PlayerScore/PlayerScore";
import GameWinner from "../Winner/GameWinner";
import { PokemonCard } from "../Card/PokemonCard";
import Button from "../Button/Button";
import { Card, Stat } from "../../types/card/card.types";
import Popup from "../Popup/Popup";

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

  const playRound = (stat: Stat) => {
    setGame((currentGame) => {
      return {
        ...currentGame,
        players: players.map((player) => {
          return { ...player, isCardShown: true, isCardEnabled: false };
        }),
        gameStatus: "STAT_CHOSEN",
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
    if (gameStatus === "STAT_CHOSEN" && currentRoundWinner) {
      setTimeout(() => {
        setGame((currentGame) => {
          return {
            ...currentGame,
            players: players.map((player) => {
              return player.id === currentRoundWinner
                ? {
                    ...player,
                    score: player.score + 1,
                    isCardShown: false,
                  }
                : { ...player, isCardShown: false };
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
      setGame((currentGame) => {
        return { ...currentGame, gameStatus: "FINISHED" };
      });
    } else if (currentRoundRef.current === totalRounds) {
      setGame((currentGame) => {
        return { ...currentGame, gameStatus: "FINISHED" };
      });
    } else {
      setGame((currentGame) => {
        return {
          ...currentGame,
          players: players.map((player) => {
            const updatedCards = moveTopCardToBottom(player.cards);
            return { ...player, cards: updatedCards };
          }),
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
    }
  };
  const buttonText =
    gameStatus === "READY"
      ? "Start Game"
      : gameStatus === "ROUND_READY"
      ? "Next Round"
      : "Play";
  return (
    <div className="gameboard">
      <div className="gameboard__header">
        <PlayerScore
          name={player1.name}
          id={player1.id}
          updateName={updatePlayerName}
          score={player1.score}
          currentRound={currentRoundRef.current}
          totalRounds={totalRounds}
          roundWinners={roundWinners}
        />
        {(gameStatus === "READY" || gameStatus === "ROUND_READY") && (
          <Button text={buttonText} onClick={handleOnClick} />
        )}
        {gameStatus === "STAT_CHOSEN" && currentRoundWinner && (
          <h2 className="gameboard__prompt">
            {`${players.find((p) => p.id === currentRoundWinner)?.name} wins the
            round!`}
          </h2>
        )}
        {gameStatus === "ROUND_IN_PROGRESS" && !currentRoundWinner && (
          <h2 className="gameboard__prompt">{`Chose a stat ${currentPlayerRef.current.name}!`}</h2>
        )}
        <PlayerScore
          name={player2.name}
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
          isShown={player1.isCardShown}
          playerId={player1.id}
          handleStatChosen={playRound}
          isEnabled={player1.isCardEnabled}
        />
        <PokemonCard
          pokemon={player2.cards[0]}
          isShown={player2.isCardShown}
          playerId={player2.id}
          handleStatChosen={playRound}
          isEnabled={player2.isCardEnabled}
        />
      </div>
      {calculateGameWinners && (
        <Popup isShown={true}>
          <GameWinner players={calculateGameWinners} />
          <Button text={"Play Again?"} onClick={resetGame} />
        </Popup>
      )}
    </div>
  );
};

export default GameBoard;
