import { Game } from "../types/game/game.types";
import { Player } from "../types/player/player.types";
import { Card } from "../types/card/card.types";
import { DUMMY_CARD_DATA1, DUMMY_CARD_DATA2 } from "../constants/constants";

export function initialiseGame(
  numberPlayers: number,
  numberOfRoundsToPlay: number
): Game {
  if (numberPlayers < 2) throw Error("Number of players must be at least 2");
  if (numberOfRoundsToPlay < 1)
    throw Error("Number of rounds must be at least 1");

  const players: Player[] = [];

  for (let i = 1; i < numberPlayers + 1; i++) {
    const cards =
      i === 1
        ? DUMMY_CARD_DATA1
        : i === 2
        ? DUMMY_CARD_DATA2
        : getCardsForPlayer(numberOfRoundsToPlay);
    const player: Player = {
      id: `player-${i}`,
      name: `Player ${i}`,
      score: 0,
      cards: cards,
      isCardShown: false,
      isHuman: false,
    };
    players.push(player);
  }

  const game = {
    players: players,
    currentPlayerIndex: 0,
    currentRound: 0,
    totalRounds: numberOfRoundsToPlay,
    roundsPlayed: 0,
    roundWinners: [],
  };
  return game;
}

function getCardsForPlayer(numCards: number): Card[] {
  const cards = [];

  for (let i = 0; i < numCards; i++) {
    //this will be where we can call some service to get the real cards
    const card = {
      id: i,
      name: "some-name",
      imageUrl: "some-string",
      description: "some-description",
      type: "some-type",
      stats: [],
    };
    cards.push(card);
  }
  return cards;
}