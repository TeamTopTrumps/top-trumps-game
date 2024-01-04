import { describe, expect, test } from "vitest";
import { PokemonDto, PokemonResponse } from "./pokemon.types";
import { toCard } from "./toCard";

describe("toPokemon", () => {
  test("convert dto", () => {
    const dto = {
      id: 2,
      name: "fred",
      base_experience: 142,
      height: 6,
      weight: 42,
      stats: [
        { base_stat: 100, stat: { name: "hp" } },
        { base_stat: 101, stat: { name: "attack" } },
        { base_stat: 102, stat: { name: "defense" } },
        { base_stat: 103, stat: { name: "special-attack" } },
        { base_stat: 104, stat: { name: "special-defense" } },
        { base_stat: 105, stat: { name: "speed" } },
      ],
      sprites: {
        other: {
          "official-artwork": {
            front_shiny: "https://pokeapi/sprites/front_shiny/2.png",
          },
        },
      },
      types: [
        { slot: 1, type: { name: "grass" } },
        { slot: 2, type: { name: "poison" } },
      ],
    } as PokemonDto;

    const converted = toCard(dto);

    console.log("converted: ", converted);

    const expected = {
      id: 2,
      name: "fred",
      imageUrl: "https://pokeapi/sprites/front_shiny/2.png",
      description: "",
      type: "grass, poison",
      stats: [
        { position: 0, name: "attack", value: 101 },
        { position: 1, name: "defense", value: 102 },
        { position: 2, name: "speed", value: 105 },
        { position: 3, name: "weight", value: 42 },
        { position: 4, name: "hp", value: 100 },
      ],
    };

    expect(converted).toEqual(expected);
  });
});
