import { describe, expect, test } from "vitest";
import { fetch_pokemon, fetch_pokemon_list } from "./pokemon_api";

describe("pokemon_api", () => {
  test("GET /pokemon", async () => {
    const pokemons = await fetch_pokemon_list();

    expect(pokemons.results.length).toBe(151);
  });

  test("GET /pokemon/1", async () => {
    const pokemon = await fetch_pokemon(1);

    expect(pokemon.id).toBe(1);
    expect(pokemon.name).toBe("bulbasaur");
    expect(pokemon.base_experience).toBe(64);
    expect(pokemon.height).toBe(7);
    expect(pokemon.weight).toBe(69);
    expect(pokemon.stats.length).toBe(6);
    expect(pokemon.stats[0].base_stat).toBe(45);
    expect(pokemon.stats[0].stat.name).toBe("hp");
    expect(pokemon.stats[1].base_stat).toBe(49);
    expect(pokemon.stats[1].stat.name).toBe("attack");
    expect(pokemon.stats[2].base_stat).toBe(49);
    expect(pokemon.stats[2].stat.name).toBe("defense");
    expect(pokemon.stats[3].base_stat).toBe(65);
    expect(pokemon.stats[3].stat.name).toBe("special-attack");
    expect(pokemon.stats[4].base_stat).toBe(65);
    expect(pokemon.stats[4].stat.name).toBe("special-defense");
    expect(pokemon.stats[5].base_stat).toBe(45);
    expect(pokemon.stats[5].stat.name).toBe("speed");
    expect(pokemon.sprites.other["official-artwork"]["front-shiny"]).not
      .toBeNull;
    expect(pokemon.types).toEqual([
      {
        slot: 1,
        type: {
          name: "grass",
          url: "https://pokeapi.co/api/v2/type/12/",
        },
      },
      {
        slot: 2,
        type: {
          name: "poison",
          url: "https://pokeapi.co/api/v2/type/4/",
        },
      },
    ]);
  });
});
