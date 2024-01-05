import { Card, Stat } from "../../types/card/card.types";
import { Player } from "../../types/player/player.types";
import { NonEmptyArray } from "../../types/utility/utility.types";

export const moveTopCardToBottom = (cards: Card[]) => {
  if (cards.length === 0) {
    throw Error("Please provide an array of cards to update");
  }
  const [topCard, ...rest] = cards;
  return [...rest, topCard];
};

export const chooseRandomStat = (
  stats: NonEmptyArray<Stat>,
  statsLength: number
) => stats[Math.floor(Math.random() * statsLength)];

export const calculateRoundWinner = (
  players: Player[],
  stat: Stat,
  player: Player
) => {
  if (players.length === 0) {
    throw Error("Please provide an array of Players");
  }

  const playerIsInArray = players.find(
    (playerInArray) => playerInArray.id === player.id
  );

  if (!playerIsInArray) {
    throw Error("Player must be included in the Player array");
  }

  const playerWithoutCards = players.find(({ cards }) => cards.length === 0);

  if (playerWithoutCards) {
    throw Error(`${playerWithoutCards.name} has no cards!`);
  }

  return players.reduce(
    (acc, { id, cards }) => {
      const cardScore = cards[0]?.stats.find(
        ({ name }) => name === stat.name
      )?.value;

      if (cardScore && cardScore > acc.score) {
        acc = { id: id, score: cardScore };
      }

      return acc;
    },
    { id: player.id, score: stat.value }
  );
};

export const updateRoundWinners = (roundWinners: string[], id: string) => {
  if (!id) {
    throw Error("Update requires a new round winner id");
  }
  return [...roundWinners, id];
};

export const updatePlayerScores = (players: Player[], id: string) => {
  if (players.length === 0) {
    throw Error("Please provide an array of players to update");
  }
  if (!id) {
    throw Error("Please provide a player id to update");
  }

  const playerIsInArray = players.find((player) => player.id === id);

  if (!playerIsInArray) {
    throw Error("ID does not match a Player ID in the array");
  }
  return players.map((player) => {
    return player.id === id ? { ...player, score: player.score + 1 } : player;
  });
};

export const updatePlayerIsCardShown = (players: Player[], id: string) => {
  if (players.length === 0) {
    throw Error("Please provide an array of players to update");
  }
  if (!id) {
    throw Error("Please provide a player id to update");
  }
  const playerIsInArray = players.find((player) => player.id === id);

  if (!playerIsInArray) {
    throw Error("ID does not match a Player ID in the array");
  }
  return players.map((player) =>
    player.id === id ? { ...player, isCardShown: !player.isCardShown } : player
  );
};

export const updatePlayerIsCardShownAll = (
  players: Player[],
  isShown: boolean
) => {
  if (players.length === 0) {
    throw Error("Please provide an array of players to update");
  }
  return players.map((player) => {
    return { ...player, isCardShown: isShown };
  });
};

export const updatePlayerCards = (players: Player[]) => {
  if (players.length === 0) {
    throw Error("Please provide an array of players to update");
  }
  return players.map((player) => {
    return { ...player, cards: moveTopCardToBottom(player.cards) };
  });
};
