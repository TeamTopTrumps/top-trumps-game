export const DEFAULT_PLAYERS = 2;
import { Card } from "../types/card/card.types";
import { Player } from "../types/player/player.types";

export const DEFAULT_ROUNDS = 5;

export const DUMMY_CARD_DATA1: Card[] = [
  {
    id: 25,
    name: "pikachu",
    imageUrl: "",
    description: "",
    type: "",
    stats: [
      {
        name: "hp",
        value: 35,
      },
      {
        name: "attack",
        value: 55,
      },
      {
        name: "defense",
        value: 40,
      },
      {
        name: "speed",
        value: 90,
      },
      {
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
        name: "hp",
        value: 45,
      },
      {
        name: "attack",
        value: 49,
      },
      {
        name: "defense",
        value: 49,
      },
      {
        name: "speed",
        value: 45,
      },
      {
        name: "weight",
        value: 69,
      },
    ],
  },
];

export const DUMMY_CARD_DATA2: Card[] = [
  {
    id: 4,
    name: "charmander",
    imageUrl: "",
    description: "",
    type: "",
    stats: [
      {
        name: "hp",
        value: 39,
      },
      {
        name: "attack",
        value: 52,
      },
      {
        name: "defense",
        value: 43,
      },
      {
        name: "speed",
        value: 65,
      },
      {
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
        name: "hp",
        value: 44,
      },
      {
        name: "attack",
        value: 48,
      },
      {
        name: "defense",
        value: 65,
      },
      {
        name: "speed",
        value: 43,
      },
      {
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
