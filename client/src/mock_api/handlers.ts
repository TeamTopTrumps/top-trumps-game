import { delay, http, HttpResponse } from "msw";
import { POKEMON_BASE_URL } from "../constants/environment_constants";
import { pokemon_cards, pokemon_list } from "./mock_pokemon_data";

export const handlers = [
  http.get(`${POKEMON_BASE_URL}/pokemon`, async () => {
    await delay(500);
    return HttpResponse.json(pokemon_list);
  }),

  http.get(`${POKEMON_BASE_URL}/pokemon/:id`, async ({ params }) => {
    const { id } = params;

    if (Number.isNaN(id)) {
      return new HttpResponse(null, {
        status: 400,
      });
    }

    const pokemonId = Number(id);

    const pokemon = pokemon_cards.find((p) => p.id === pokemonId);

    if (pokemon === undefined) {
      return new HttpResponse(null, {
        status: 404,
      });
    }

    return HttpResponse.json(pokemon);
  }),
];
