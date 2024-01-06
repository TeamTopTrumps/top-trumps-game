import { Card } from "../card/card.types";

export type Player = {
  id: string;
  name: string;
  score: number;
  cards: Card[];
};

export type PlayerNameAndId = {
  id: string;
  name: string;
};
