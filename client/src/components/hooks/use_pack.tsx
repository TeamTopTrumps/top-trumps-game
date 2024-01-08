import { useQuery } from "@tanstack/react-query";
import { Card } from "../../types/card/card.types";
import { fetchPokemonCard } from "./pokemon/fetch_pokemon_card";
import { fetchPokemonList } from "./pokemon/fetch_pokemon_list";

async function fetchPokemonPack() {
  try {
    // Fetch a list of all card id/names
    const packIds = await fetchPokemonList();

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

function usePack(packName: string = "pokemon") {
  const { isPending, isSuccess, isError, status, data, error } = useQuery({
    queryKey: [packName, "pack"],
    queryFn: () => fetchPokemonPack(),
  });

  return { isPending, isSuccess, isError, status, data, error };
}

export { usePack };
