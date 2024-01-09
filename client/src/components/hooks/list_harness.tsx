import { useList } from "./use_list";

function ListHarness() {
  const query = useList();

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
