import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { PackHarness } from "./pack_harness";
import { pokemon_cards } from "../../mock_api/mock_pokemon_data";
import { MockQueryProvider } from "./mock_query_provider";

describe("PackHarness", () => {
  test("loading -> pack of cards", async () => {
    const firstPokemon = pokemon_cards[0].name;
    const lastPokemon = pokemon_cards[pokemon_cards.length - 1].name;

    render(
      <MockQueryProvider>
        <PackHarness packName="pokemon" />
      </MockQueryProvider>
    );

    const loading = await screen.findByText(/loading pack/i);

    expect(loading).toBeInTheDocument();

    const loaded = await screen.findByText(/pack loaded cards/i);

    expect(loaded).toBeInTheDocument();

    expect(screen.getByText(firstPokemon)).toBeInTheDocument();
    expect(screen.getByText(lastPokemon)).toBeInTheDocument();
  });
});
