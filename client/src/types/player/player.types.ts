import { Card } from "../card/card.types";

export type Player = {
  id: string;
  name: string;
  score: number;
  cards: Card[];
  isCardShown: boolean;
  isHuman: boolean;
};

export type PlayerNameAndId = {
  id: string;
  name: string;
};