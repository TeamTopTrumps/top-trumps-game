import { usePokemonCard } from "./use_pokemon_card";

function PokemonCardHarness({ id }: { id: number }) {
  const query = usePokemonCard(id);

  return (
    <div>
      <p>{query.isPending ? "isPending" : null}</p>

      <p>{query.status}</p>

      <p>{query.isError ? "isError" : null}</p>
      {query.error && <p>Error: {query.error.message}</p>}

      <p>{query.isSuccess ? "isSuccess" : null}</p>

      {query.data && <p>haveData</p>}

      {query.data && <p>{query.data.name}</p>}
    </div>
  );
}

export { PokemonCardHarness };
