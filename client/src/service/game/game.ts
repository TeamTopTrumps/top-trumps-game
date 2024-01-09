import { Game } from "../../types/game/game.types";
import { Player } from "../../types/player/player.types";
import { Card } from "../../types/card/card.types";
export function initialiseGame(
  numberPlayers: number,
  numberOfRoundsToPlay: number
): Game {
  if (numberPlayers < 2) throw Error("Number of players must be at least 2");
  if (numberOfRoundsToPlay < 1)
    throw Error("Number of rounds must be at least 1");

  const players: Player[] = [];

  for (let i = 1; i < numberPlayers + 1; i++) {
    const cards: Card[] = getCardsForPlayer(numberOfRoundsToPlay);
    const player: Player = {
      id: `player-${i}`,
      name: `Player ${i}`,
      score: 0,
      cards: cards,
      isCardShown: false,
      isCardEnabled: false,
      isHuman: false,
    };
    players.push(player);
  }

  const game: Game = {
    players: players,
    currentRound: 0,
    totalRounds: numberOfRoundsToPlay,
    roundWinners: [],
    gameStatus: "READY",
  };
  return game;
}

function getCardsForPlayer(numCards: number): Card[] {
  const cards = [];

  for (let i = 0; i < numCards; i++) {
    //this will be where we can call some service to get the real cards
    const card: Card = {
      id: i,
      name: "some-name",
      imageUrl: "some-string",
      description: "some-description",
      type: "some-type",
      stats: [
        {
          name: "hp",
          value: Math.floor(Math.random() * 101),
        },
        {
          name: "attack",
          value: Math.floor(Math.random() * 101),
        },
        {
          name: "defense",
          value: Math.floor(Math.random() * 101),
        },
        {
          name: "speed",
          value: Math.floor(Math.random() * 101),
        },
        {
          name: "weight",
          value: Math.floor(Math.random() * 101),
        },
      ],
    };
    cards.push(card);
  }
  return cards;
}
