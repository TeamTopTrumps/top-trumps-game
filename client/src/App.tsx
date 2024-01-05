import "./App.scss";
import { useState, useRef } from "react";
import PlayerScore from "./components/PlayerScore/PlayerScore";
import {
  DEFAULT_ROUNDS,
  DEFAULT_PLAYERS,
  DEFAULT_TIMEOUT,
} from "./constants/constants";
import { Header } from "./components/Header/Header";
import { initialiseGame } from "./service/game/game";
import { Game } from "./types/game/game.types";
import { Player } from "./types/player/player.types";
import { Stat } from "./types/card/card.types";
import {
  chooseRandomStat,
  calculateRoundWinner,
  updateRoundWinners,
  updatePlayerScores,
  updatePlayerCards,
  updatePlayerIsCardShown,
  updatePlayerIsCardShownAll,
} from "./service/round/round";

//Game starts with two players each with five cards
//Clicking "Play" triggers startRound to start the first round (and the game)
//showPlayerCard reveals the top card in the current player's hand

//If the player !isHuman there is a setTimeout to mimic a human choosing a stat
//chooseRandomStat selects a random stat from the current player's card
//playRound then runs with the chosen stat

//If the player isHuman there should be a prompt to pick a stat from the card i.e. "Please chose a stat player 2"
//The player clicks on a stat which triggers playRound to run with their chosen stat

//showAllCards reveals all of the player's top cards
//A setTimeout is used to allow time for all the cards to be shown
//calculateRoundWinner then compares the value of chosen stat with the value of that stat on the top card of every other player
//The player with the card with the highest value for that characteristic wins the round
//If there is a draw between multiple highest values then the current player wins the round

//endRound then runs to end the round and prepare for the next round
//hideAllCards turns all the cards face down
//A setTimeout is used to allow time for all of the cards to be hidden
//The top card, i.e. the card used this round, for each player is set to the bottom of their hand

//If the currentRoundRef === game.totalRounds then the game ends and a winner is declared
//If the curerntRoundRef !== game.totalRounds then startRound() runs and to start the round for the next player

function App() {
  const [game, setGame] = useState<Game>(
    initialiseGame(DEFAULT_PLAYERS, DEFAULT_ROUNDS)
  );
  const player1 = game.players[0];
  const player2 = game.players[1];

  const { players, totalRounds, roundWinners } = game;

  const currentRoundRef = useRef<number>(0);
  const currentPlayerRef = useRef<Player>(players[0]);

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
        playerName={player1.name}
        playerId={player1.id}
        updateName={() => {}}
        playerScore={player1.score}
        currentRound={currentRoundRef.current}
        totalRounds={totalRounds}
        roundWinners={roundWinners}
      />
      <PlayerScore
        playerName={player2.name}
        playerId={player2.id}
        updateName={() => {}}
        playerScore={player2.score}
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
