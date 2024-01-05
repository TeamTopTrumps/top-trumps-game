import { Player } from "../player/player.types";

export type Game = {
  players: Player[];
  currentRound: number;
  totalRounds: number;
  roundsPlayed: number;
  roundWinners: string[];
};
