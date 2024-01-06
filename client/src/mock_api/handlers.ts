import { delay, http, HttpResponse } from "msw";
import { POKEMON_BASE_URL } from "../constants/environment_constants";
import { pokemon_list } from "./mock_pokemon_data";

export const handlers = [
  http.get(`${POKEMON_BASE_URL}/pokemon`, async () => {
    await delay(500);
    return HttpResponse.json(pokemon_list);
  }),
];
