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
  sprites: {
    other: {
      "official-artwork": {
        front_shiny: string;
      };
    };
  };
  stats: Array<{ base_stat: number; stat: { name: string } }>;
  types: Array<{ slot: number; type: { name: string } }>;
};
