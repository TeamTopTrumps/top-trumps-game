import { describe, expect, test } from "vitest";
import { fetchPokemonCard } from "./fetch_pokemon_card";
import {
  pokemon_cards,
  pokemon_list,
} from "../../../mock_api/mock_pokemon_data";

describe("fetchPokemonCard", () => {
  test("returns first card", async () => {
    const expected = pokemon_cards[0];

    const card = await fetchPokemonCard(expected.id);

    expect(card).toEqual(expected);
  });

  test("404 not found", async () => {
    const biggestId = Math.max(...pokemon_list.map((p) => p.id));

    await expect(() => fetchPokemonCard(biggestId + 1)).rejects.toThrowError(
      "404 Not Found"
    );
  });
});
