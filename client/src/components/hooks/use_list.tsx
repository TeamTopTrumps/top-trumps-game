import { useQuery } from "@tanstack/react-query";
import { fetchPokemonList } from "./pokemon/fetch_pokemon_list";

function useList(packName: string = "pokemon") {
  const { isPending, isSuccess, isError, status, data, error } = useQuery({
    queryKey: [packName, "list"],
    queryFn: fetchPokemonList,
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

export { useList };
