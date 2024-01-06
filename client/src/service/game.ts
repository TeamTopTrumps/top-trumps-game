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
  const minRequiredToWinGame = Math.ceil(game.totalRounds / 2);

  if (game.roundWinners.length < game.totalRounds) {
    const anyPlayersWithMinRequiredWins = game.players.filter(
      (player) => player.score >= minRequiredToWinGame
    );

    return anyPlayersWithMinRequiredWins.length > 0
      ? findPlayWithMaxWins(anyPlayersWithMinRequiredWins)
      : null;
  } else {
    return findPlayWithMaxWins(game.players);
  }
}

function findPlayWithMaxWins(players: Player[]) {
  return players.reduce((prev, current) => {
    return prev.score > current.score ? prev : current;
  });
}

export function minimumRoundsToWin(game: Game) {
  const half = Math.ceil(game.totalRounds / 2);
  return game.totalRounds % half === 0 ? half + 1 : half;
}
