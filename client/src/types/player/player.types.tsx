import { Character } from "../character/character";

export type Player = {
  id: string;
  name: string;
  score: number;
  cards: Character[];
};
