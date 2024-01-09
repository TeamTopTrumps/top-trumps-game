import { usePack } from "./use_pack";

function PackHarness({ packName = "pokemon" }: { packName?: string }) {
  const query = usePack(packName);

  if (query.isPending) return <p>Loading pack...</p>;

  if (query.isError) return <p>Pack not loaded</p>;

  return (
    <div>
      <p>Pack loaded cards</p>
      {query.data?.map((c) => (
        <p key={c.id}>{c.name}</p>
      ))}
    </div>
  );
}

export { PackHarness };
