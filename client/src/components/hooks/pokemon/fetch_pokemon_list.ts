import { POKEMON_BASE_URL } from "../../../constants/environment_constants";

async function fetchPokemonList() {
  try {
    const response = await fetch(`${POKEMON_BASE_URL}/pokemon`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    return (await response.json()) as Array<{ id: number; name: string }>;
  } catch (err) {
    const error =
      err instanceof Error ? err : new Error("Unable to fetch pokemon list");

    throw error;
  }
}

export { fetchPokemonList };
