import { useQuery } from "@tanstack/react-query";
import { Card } from "../../../types/card/card.types";

function usePokemonCard(id: number) {
  const { data, status, error, isPending, isSuccess, isError } = useQuery({
    queryKey: ["pokemon", "card", id],
    queryFn: () => fetchPokemonCard(id),
    staleTime: Infinity,
    gcTime: Infinity,
  });

  return {
    data,
    status,
    error,
    isPending,
    isSuccess,
    isError,
  };
}

async function fetchPokemonCard(id: number) {
  try {
    const response = await fetch(`http://localhost:8080/api/pokemon/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText})`);
    }

    return (await response.json()) as Card;
  } catch (err) {
    const error =
      err instanceof Error ? err : new Error(`Unable to fetch pokemon: ${id}`);

    throw error;
  }
}

export { usePokemonCard, fetchPokemonCard };
