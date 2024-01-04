import { Character } from "../character/character.types";

export type Player = {
  id: string;
  name: string;
  score: number;
  cards: Character[];
  isCardShown: boolean;
};
