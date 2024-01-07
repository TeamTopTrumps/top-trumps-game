import { useQuery } from "@tanstack/react-query";
import { fetchPokemonList } from "./pokemon/fetch_pokemon_list";

function ListHarness() {
  const query = useQuery({
    queryKey: ["list"],
    queryFn: fetchPokemonList,
  });

  return (
    <div>
      <p>{query.isPending ? "isPending" : null}</p>

      <p>{query.status}</p>

      <p>{query.isError ? "isError" : null}</p>
      {query.error && <p>Error: {query.error.message}</p>}

      <p>{query.isSuccess ? "isSuccess" : null}</p>
      {query.data && <p>loaded list</p>}
      {query.data && <p>{query.data.length}</p>}
      {query.data && <p>{query.data[0].name}</p>}
    </div>
  );
}

export { ListHarness };
