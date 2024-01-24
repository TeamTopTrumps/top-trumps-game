import { POKEMON_BASE_URL } from "../../constants/environment_constants";
import { Card } from "../../types/card/card.types";

async function fetchPokemonPack() {
  try {
    // Fetch a list of all card id/names
    const packIds = (await fetchPokemonList()) ?? [];

    // Fill array with promises to fetch a specific card
    const promises = packIds.map(async ({ id }) => await fetchPokemonCard(id));

    // Fire all the fetch card promises
    const result = await Promise.allSettled(promises);

    // Keep all the fulfilled ones
    const fulfilled = result.filter(
      (r) => r.status === "fulfilled"
    ) as PromiseFulfilledResult<Card>[];

    const cards = fulfilled.map((p) => p.value); // extract the Cards

    return cards;
  } catch (err) {
    const error =
      err instanceof Error ? err : new Error("Failed to fetch pack");

    throw error;
  }
}

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
      err instanceof Error ? err : new Error("Failed to fetch pack");

    throw error;
  }
}

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
      err instanceof Error ? err : new Error("Failed to fetch pack");

    throw error;
  }
}

export { fetchPokemonPack };
