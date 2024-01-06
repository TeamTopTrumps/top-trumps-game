import { Game } from "../types/game/game.types";
import { Player } from "../types/player/player.types";
import { Card } from "../types/card/card.types";

export function initialiseGame(
  numberPlayers: number,
  numberOfRoundsToPlay: number
): Game {
  if (numberPlayers < 2) throw Error("Number of players must be at least 2");
  if (numberOfRoundsToPlay < 1)
    throw Error("Number of rounds must be at least 1");

  const players: Player[] = [];

  for (let i = 1; i < numberPlayers + 1; i++) {
    const cards = getCardsForPlayer(numberOfRoundsToPlay);
    const player: Player = {
      id: `player-${i}`,
      name: `Player ${i}`,
      score: 0,
      cards: cards,
    };
    players.push(player);
  }

  const game: Game = {
    players: players,
    totalRounds: numberOfRoundsToPlay,
    currentRound: 0,
    roundWinners: [],
  };
  return game;
}

function getCardsForPlayer(numCards: number): Card[] {
  const cards = [];

  for (let i = 0; i < numCards; i++) {
    //this will be where we can call some service to get the real cards
    const card = {
      id: i,
      name: "some-name",
      imageUrl: "some-string",
      description: "some-description",
      type: "some-type",
      stats: [],
    };
    cards.push(card);
  }
  return cards;
}

export function determineGameWinner(game: Game): Player | null {
  return keepPlaying(game) ? null : findPlayWithMaxWins(game.players);
}

export function keepPlaying(game: Game) {
  const totalRoundsPlayed = game.players.reduce(
    (sum, current) => sum + current.score,
    0
  );
  const roundsLeft = game.totalRounds - totalRoundsPlayed;

  if (roundsLeft === 0) return false;
  else {
    //not hit amount any player can win yet
    if (roundsLeft > totalRoundsPlayed) return true;
    else {
      //see if any other player can also win/draw
      const playWithHighestScore = findPlayWithMaxWins(game.players);
      const playersThatCanStillWin = game.players.filter(
        (p) => p.score === playWithHighestScore.score
      );

      if (playersThatCanStillWin.length > 1) return true;
      else return false;
    }
  }
}

function findPlayWithMaxWins(players: Player[]) {
  return players.reduce((prev, current) => {
    return prev.score > current.score ? prev : current;
  });
}
