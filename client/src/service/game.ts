import { Game } from "../types/game/game.types";
import { Player } from "../types/player/player.types";

export function initialiseGame(
  numberPlayers: number,
  numberOfRoundsToPlay: number
): Game {
  if (numberPlayers < 2) throw Error("Number of players must be at least 2");

  const players: Player[] = [];

  for (let i = 1; i < numberPlayers + 1; i++) {
    const player: Player = {
      id: `player-${i}`,
      name: `Player ${i}`,
      score: 0,
      cards: [],
    };
    players.push(player);
  }

  const game = {
    players: players,
    currentRound: 0,
    totalRounds: numberOfRoundsToPlay,
    roundsPlayed: 0,
    roundWinners: [],
  };
  return game;
}
