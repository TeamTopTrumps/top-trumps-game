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
      throw new Error(`${response.status} ${response.statusText}`);
    }

    return (await response.json()) as PokemonResponse;
  } catch (err) {
    const error =
      err instanceof Error ? err : new Error("Unable to fetch pokemon list");

    throw error;
  }
}

async function fetch_pokemon(id: number) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`, {
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText})`);
    }

    return (await response.json()) as PokemonDto;
  } catch (err) {
    const error =
      err instanceof Error ? err : new Error(`Unable to fetch pokemon: ${id}`);

    throw error;
  }
}

export { fetch_pokemon_list, fetch_pokemon };
