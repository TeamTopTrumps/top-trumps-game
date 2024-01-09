import { POKEMON_BASE_URL } from "../../../constants/environment_constants";
import { Card } from "../../../types/card/card.types";

async function fetchPokemonCard(id: number) {
  try {
    const response = await fetch(`${POKEMON_BASE_URL}/pokemon/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    return (await response.json()) as Card;
  } catch (err) {
    const error =
      err instanceof Error ? err : new Error(`Unable to fetch pokemon: ${id}`);

    throw error;
  }
}

export { fetchPokemonCard };
