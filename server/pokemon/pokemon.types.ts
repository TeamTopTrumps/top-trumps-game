export const STAT_NAMES = [
  "attack",
  "defense",
  "speed",
  "weight",
  "hp", //hit points
] as const;
export type StatName = (typeof STAT_NAMES)[number];

export type PokemonResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<{ name: string; url: string }>;
};

export type PokemonDto = {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  weight: number;
  stats: Array<{ base_stat: number; stat: { name: string } }>;
  sprites: {
    other: {
      "official-artwork": {
        front_shiny: string;
      };
    };
  };
  types: Array<{ slot: number; type: { name: string } }>;
};
