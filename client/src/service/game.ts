import { Game } from "../types/game/game.types";
import { Player } from "../types/player/player.types";

export function initialiseGame(): Game {
  const player1: Player = {
    id: "player-1",
    name: "player1",
    score: 0,
    cards: [],
  };

  const player2: Player = {
    id: "player-2",
    name: "player2",
    score: 0,
    cards: [],
  };

  const players: Player[] = [player1, player2];

  const game = {
    players: players,
    currentRound: 0,
    totalRounds: 5,
    roundsPlayed: 0,
    roundWinners: [],
  };
  return game;
}
