import { delay, http, HttpResponse, passthrough } from "msw";

const POKEMON_BASE_URL = "http://localhost:8080/api";

const pokemonList = [
  { id: 0, name: "andy" },
  { id: 1, name: "bert" },
  { id: 2, name: "charlie" },
  { id: 3, name: "dave" },
  { id: 4, name: "eric" },
  { id: 5, name: "fred" },
];

const pokemonCards = [
  {
    id: 0,
    name: "andy",
    imageUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/151.png",
    description: "",
    type: "psychic",
    stats: [
      { name: "attack", value: 100 },
      { name: "defense", value: 100 },
      { name: "speed", value: 100 },
      { name: "weight", value: 40 },
      { name: "hp", value: 100 },
    ],
  },
  {
    id: 1,
    name: "bert",
    imageUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/1.png",
    description: "",
    type: "grass,poison",
    stats: [
      { name: "attack", value: 49 },
      { name: "defense", value: 49 },
      { name: "speed", value: 45 },
      { name: "weight", value: 69 },
      { name: "hp", value: 45 },
    ],
  },
  {
    id: 2,
    name: "charlie",
    imageUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/2.png",
    description: "",
    type: "grass,poison",
    stats: [
      { name: "attack", value: 62 },
      { name: "defense", value: 63 },
      { name: "speed", value: 60 },
      { name: "weight", value: 130 },
      { name: "hp", value: 60 },
    ],
  },
  {
    id: 3,
    name: "dave",
    imageUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/3.png",
    description: "",
    type: "grass,poison",
    stats: [
      { name: "attack", value: 82 },
      { name: "defense", value: 83 },
      { name: "speed", value: 80 },
      { name: "weight", value: 1000 },
      { name: "hp", value: 80 },
    ],
  },
  {
    id: 4,
    name: "eric",
    imageUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/4.png",
    description: "",
    type: "fire",
    stats: [
      { name: "attack", value: 52 },
      { name: "defense", value: 43 },
      { name: "speed", value: 65 },
      { name: "weight", value: 85 },
      { name: "hp", value: 39 },
    ],
  },
  {
    id: 5,
    name: "fred",
    imageUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/5.png",
    description: "",
    type: "fire",
    stats: [
      { name: "attack", value: 64 },
      { name: "defense", value: 58 },
      { name: "speed", value: 80 },
      { name: "weight", value: 190 },
      { name: "hp", value: 58 },
    ],
  },
];

export const handlers = [
  http.get(`${POKEMON_BASE_URL}/pokemon`, async () => {
    await delay(750);
    return HttpResponse.json(pokemonList);
  }),

  http.get(`${POKEMON_BASE_URL}/pokemon/:id`, async ({ params }) => {
    const { id } = params;

    if (Number.isNaN(id) || Number(id) > pokemonCards.length) {
      return passthrough();
    }

    await delay(750);
    return HttpResponse.json(pokemonCards[Number(id)]);
  }),
];
