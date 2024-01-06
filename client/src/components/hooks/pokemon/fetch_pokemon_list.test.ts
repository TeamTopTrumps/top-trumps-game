import { describe, expect, test } from "vitest";
import { fetchPokemonList } from "./query_pokemon_list";
import { pokemon_list } from "../../../mock_api/mock_pokemon_data";
import { server } from "../../../mock_api/node";
import { POKEMON_BASE_URL } from "../../../constants/environment_constants";
import { HttpResponse, http } from "msw";

describe("fetchPokemonList", () => {
  test("returns mocked list", async () => {
    const list = await fetchPokemonList();

    expect(list).toEqual(pokemon_list);
  });

  test("server error fails", async () => {
    server.use(
      http.get(`${POKEMON_BASE_URL}/pokemon`, () => {
        return new HttpResponse(null, {
          status: 500,
          statusText: "It's us, not you",
        });
      })
    );

    await expect(() => fetchPokemonList()).rejects.toThrowError(
      "500 It's us, not you"
    );
  });
});
