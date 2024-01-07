import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { MockQueryProvider } from "./mock_query_provider";
import { ListHarness } from "./list_harness";
import { pokemon_list } from "../../mock_api/mock_pokemon_data";
import { server } from "../../mock_api/node";
import { POKEMON_BASE_URL } from "../../constants/environment_constants";
import { HttpResponse, http } from "msw";

describe("ListHarness", () => {
  test("pending -> list", async () => {
    const firstItem = pokemon_list[0];

    render(
      <MockQueryProvider>
        <ListHarness />
      </MockQueryProvider>
    );

    const isPending = await screen.findByText(/isPending/);

    expect(isPending).toBeInTheDocument();

    const isSuccess = await screen.findByText(/isSuccess/);

    expect(isSuccess).toBeInTheDocument();
    expect(screen.getByText(`${firstItem.name}`)).toBeInTheDocument();
  });

  test("pending -> error", async () => {
    server.use(
      http.get(`${POKEMON_BASE_URL}/pokemon`, () => {
        return new HttpResponse(null, {
          status: 500,
          statusText: "It's us, not you",
        });
      })
    );

    render(
      <MockQueryProvider>
        <ListHarness />
      </MockQueryProvider>
    );

    const isPending = await screen.findByText(/isPending/);

    expect(isPending).toBeInTheDocument();

    const isError = await screen.findByText(/isError/);

    expect(isError).toBeInTheDocument();
    expect(screen.getByText(/500 It's us, not you/)).toBeInTheDocument();
  });
});
