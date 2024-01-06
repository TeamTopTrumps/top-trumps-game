import { Player } from "../player/player.types";

export type Game = {
  players: Player[];
  totalRounds: number;
  roundWinners: Player[];
};
