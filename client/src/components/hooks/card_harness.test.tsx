import { describe, expect, test } from "vitest";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { CardHarness } from "./card_harness";
import { pokemon_cards, pokemon_list } from "../../mock_api/mock_pokemon_data";
import { MockQueryProvider } from "./mock_query_provider";

describe("CardHarness", () => {
  test("pending -> first card", async () => {
    const expectedCard = pokemon_cards[0];

    render(
      <MockQueryProvider>
        <CardHarness id={expectedCard.id} />
      </MockQueryProvider>
    );

    // findBy - handles async/await retry
    const isPending = await screen.findByText(/isPending/);

    expect(isPending).toBeInTheDocument();

    // findBy - handles async/await retry
    const isSuccess = await screen.findByText(/isSuccess/);

    expect(isSuccess).toBeInTheDocument();

    // getBy - we aren't waiting for anything else
    expect(screen.getByText(/haveData/)).toBeInTheDocument();
    expect(screen.getByText(`${expectedCard.name}`)).toBeInTheDocument();
  });

  test("pending -> error", async () => {
    const biggestId = Math.max(...pokemon_list.map((p) => p.id));

    render(
      <MockQueryProvider>
        <CardHarness id={biggestId + 1} />
      </MockQueryProvider>
    );

    // findBy - wait for pending -> error
    const isError = await screen.findByText(/isError/);

    expect(isError).toBeInTheDocument();

    // getBy - the error now the screen won't change
    expect(screen.getByText(/404/)).toBeInTheDocument();
  });
});
