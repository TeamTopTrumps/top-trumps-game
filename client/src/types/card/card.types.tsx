export type Card = {
  id: number;
  name: string;
  imageUrl: string;
  description: string;
  type: string;
  stats: Stat[];
};

export type Stat = {
  name: StatName;
  value: number;
};

export const STAT_NAME = [
  "attack",
  "defense",
  "speed",
  "weight",
  "hp", //hit points
] as const;
export type StatName = (typeof STAT_NAME)[number];
