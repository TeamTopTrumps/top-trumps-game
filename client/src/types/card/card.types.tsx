export type Card = {
  id: number;
  name: string;
  imageUrl: string;
  description: string;
  type: string;
  stats: Stat[];
};

type Stat = {
  position: StatPosition;
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

export const STAT_POSITION = [1, 2, 3, 4, 5] as const;
export type StatPosition = (typeof STAT_POSITION)[number];
