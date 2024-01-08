import { useQuery } from "@tanstack/react-query";
import { fetchPokemonCard } from "./pokemon/fetch_pokemon_card";

function useCard(id: number, packName: string = "pokemon") {
  const { isPending, isSuccess, isError, status, data, error } = useQuery({
    queryKey: [packName, "card", id],
    queryFn: () => fetchPokemonCard(id),
  });

  return {
    isPending,
    isSuccess,
    isError,
    status,
    data,
    error,
  };
}

export { useCard };
