import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { PokemonListHarness } from "./pokemon_list_harness";
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

describe("usePokemonList", () => {
  test("pending -> success", async () => {
    server.use(
      http.get("http://localhost:8080/api/pokemon", () => {
        return HttpResponse.json([{ id: 0, name: "andy" }]);
      })
    );

    const queryClient = createTestQueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <PokemonListHarness />
      </QueryClientProvider>
    );

    const pending = screen.getByText(/isPending/i);

    expect(pending).toBeInTheDocument();

    const isSuccess = await screen.findByText(/isSuccess/);
    const success = await screen.findByText(/success/);
    const andy = await screen.findByText(/andy/);

    expect(isSuccess).toBeInTheDocument();
    expect(success).toBeInTheDocument();
    expect(andy).toBeInTheDocument();
  });

  test("pending -> error", async () => {
    server.use(
      http.get("http://localhost:8080/api/pokemon", () => {
        return new HttpResponse(null, {
          status: 500,
          statusText: "It's us, not you",
        });
      })
    );

    const queryClient = createTestQueryClient();

    const expectedMessage = "It's us, not you";

    render(
      <QueryClientProvider client={queryClient}>
        <PokemonListHarness />
      </QueryClientProvider>
    );

    const isError = await screen.findByText(/isError/);
    const errorMessage = await screen.findByText(/500/);

    expect(isError).toBeInTheDocument();
    expect(errorMessage).toHaveTextContent(expectedMessage);
  });
});
