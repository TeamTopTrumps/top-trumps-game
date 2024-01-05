import { useQuery } from "@tanstack/react-query";

type IdName = {
  id: number;
  name: string;
};

function usePokemonList() {
  const { data, status, error, isPending, isSuccess, isError } = useQuery({
    queryKey: ["pokemon", "list"],
    queryFn: fetchPokemonList,
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

async function fetchPokemonList() {
  try {
    const response = await fetch("http://localhost:8080/api/pokemon", {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    return (await response.json()) as Array<IdName>;
  } catch (err) {
    const error =
      err instanceof Error ? err : new Error("Unable to fetch pokemon list");

    throw error;
  }
}

export { usePokemonList, fetchPokemonList };
