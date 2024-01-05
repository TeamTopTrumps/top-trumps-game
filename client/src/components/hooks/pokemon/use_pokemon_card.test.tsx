import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { PokemonCardHarness } from "./pokemon_card_harness";
import { server } from "../../../mock_api/node";
import { HttpResponse, http } from "msw";

function createTestQueryClient() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return queryClient;
}

describe("usePokemonCard", () => {
  test("pending -> error", async () => {
    server.use(
      http.get("http://localhost:8080/api/pokemon/1", () => {
        return new HttpResponse(null, {
          status: 404,
          statusText: "Didn't find it",
        });
      })
    );

    const queryClient = createTestQueryClient();

    const expectedMessage = "Didn't find it";

    render(
      <QueryClientProvider client={queryClient}>
        <PokemonCardHarness id={1} />
      </QueryClientProvider>
    );

    const isError = await screen.findByText(/isError/);
    const errorMessage = await screen.findByText(/404/);

    expect(isError).toBeInTheDocument();
    expect(errorMessage).toHaveTextContent(expectedMessage);
  });

  test("pending -> card: 4", async () => {
    const queryClient = createTestQueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <PokemonCardHarness id={4} />
      </QueryClientProvider>
    );

    const isPending = await screen.findByText(/isPending/);

    expect(isPending).toBeInTheDocument();

    const isSuccess = await screen.findByText(/isSuccess/);
    const haveData = await screen.findByText(/haveData/);
    const eric = await screen.findByText(/eric/);

    expect(isSuccess).toBeInTheDocument();
    expect(haveData).toBeInTheDocument();
    expect(eric).toBeInTheDocument();
  });
});
