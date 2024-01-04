import { Player } from "../player/player.types";

export type Game = {
  players: Player[];
  numberOfRounds: number;
  currentRound: number;
  totalRounds: number;
  roundWinners: string[];
};
