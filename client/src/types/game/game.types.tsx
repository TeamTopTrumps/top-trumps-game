import { Player } from "../player/player.types";

export type Game = {
  players: Player[];
  totalRounds: number;
  currentRound: number;
  roundWinners: string[];
  gameStatus: GameStatusKind;
};

export const GameStatus = [
  "READY",
  "ROUND_IN_PROGRESS",
  "ROUND_FINISHED",
  "ROUND_READY",
  "FINISHED",
] as const;
export type GameStatusKind = (typeof GameStatus)[number];
