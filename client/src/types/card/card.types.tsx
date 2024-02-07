import { NonEmptyArray } from "../../types/utility/utility.types";

export type Card = {
  id: number;
  name: string;
  imageUrl: string;
  description: string;
  type: string;
  stats: NonEmptyArray<Stat>;
};

export type Stat = {
  name: StatName;
  value: number;
  isTopTrump?: boolean;
};

export const STAT_NAME = [
  "attack",
  "defense",
  "speed",
  "weight",
  "hp", //hit points
] as const;
export type StatName = (typeof STAT_NAME)[number];
