import { PokemonDto, PokemonResponse } from "./pokemon.types";

async function fetch_pokemon_list() {
  try {
    const response = await fetch(
      "https://pokeapi.co/api/v2/pokemon?limit=151",
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!response.ok) {
      throw new Error(`Fetch failed:${response.status}`);
    }

    return (await response.json()) as PokemonResponse;
  } catch (err) {
    const error = err instanceof Error ? err : new Error(err.toString());

    throw error;
  }
}

async function fetch_pokemon(id: number) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, {
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(`Fetch failed:${response.status}`);
    }

    return (await response.json()) as PokemonDto;
  } catch (err) {
    const error = err instanceof Error ? err : new Error(err.toString());

    throw error;
  }
}

export { fetch_pokemon_list, fetch_pokemon };
