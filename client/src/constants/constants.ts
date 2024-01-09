import { Game } from "../types/game/game.types";

export const DEFAULT_PLAYERS = 2;
export const DEFAULT_ROUNDS = 5;

export const DEFAULT_TIMEOUT = 1000;

export const PLACEHOLDER_GAME: Game = {
  players: [],
  totalRounds: 0,
  currentRound: 0,
  roundWinners: [],
  gameStatus: "READY",
};
