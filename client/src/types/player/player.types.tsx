import { Card } from "../card/card.types";

export type Player = {
  id: string;
  name: string;
  score: number;
  cards: Card[];
  isCardShown: boolean;
  isCardEnabled: boolean;
  isHuman: boolean;
};
