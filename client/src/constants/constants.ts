import { Character } from "../types/character/character.types";
import { Player } from "../types/player/player.types";

export const DEFAULT_ROUNDS = 5;

export const DUMMY_CARD_DATA1: Character[] = [
  {
    id: 25,
    name: "pikachu",
    imageUrl: "",
    description: "",
    type: "",
    stats: [
      {
        position: 1,
        name: "hp",
        value: 35,
      },
      {
        position: 2,
        name: "attack",
        value: 55,
      },
      {
        position: 3,
        name: "defense",
        value: 40,
      },
      {
        position: 4,
        name: "speed",
        value: 90,
      },
      {
        position: 5,
        name: "weight",
        value: 60,
      },
    ],
  },
  {
    id: 1,
    name: "bulbasaur",
    imageUrl: "",
    description: "",
    type: "",
    stats: [
      {
        position: 1,
        name: "hp",
        value: 45,
      },
      {
        position: 2,
        name: "attack",
        value: 49,
      },
      {
        position: 3,
        name: "defense",
        value: 49,
      },
      {
        position: 4,
        name: "speed",
        value: 45,
      },
      {
        position: 5,
        name: "weight",
        value: 69,
      },
    ],
  },
];

export const DUMMY_CARD_DATA2: Character[] = [
  {
    id: 4,
    name: "charmander",
    imageUrl: "",
    description: "",
    type: "",
    stats: [
      {
        position: 1,
        name: "hp",
        value: 39,
      },
      {
        position: 2,
        name: "attack",
        value: 52,
      },
      {
        position: 3,
        name: "defense",
        value: 43,
      },
      {
        position: 4,
        name: "speed",
        value: 65,
      },
      {
        position: 5,
        name: "weight",
        value: 85,
      },
    ],
  },
  {
    id: 7,
    name: "squirtle",
    imageUrl: "",
    description: "",
    type: "",
    stats: [
      {
        position: 1,
        name: "hp",
        value: 44,
      },
      {
        position: 2,
        name: "attack",
        value: 48,
      },
      {
        position: 3,
        name: "defense",
        value: 65,
      },
      {
        position: 4,
        name: "speed",
        value: 43,
      },
      {
        position: 5,
        name: "weight",
        value: 90,
      },
    ],
  },
];

export const DEFAULT_STARTING_PLAYERS: Player[] = [
  {
    name: "Player 1",
    id: "player1",
    score: 0,
    cards: DUMMY_CARD_DATA1,
    isCardShown: false,
  },
  {
    name: "Player 2",
    id: "player2",
    score: 0,
    cards: DUMMY_CARD_DATA2,
    isCardShown: false,
  },
];
