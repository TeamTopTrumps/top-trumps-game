import { Card, STAT_NAME, Stat } from "../types/card/card.types";
import { Player } from "../types/player/player.types";

export const moveTopCardToBottom = (cards: Card[]) => {
  const [topCard, ...rest] = cards;
  return [...rest, topCard];
};

export const chooseRandomStat = (stats: Stat[]) =>
  stats[Math.floor(Math.random() * STAT_NAME.length)];

export const calculateRoundWinner = (
  players: Player[],
  stat: Stat,
  player: Player
) =>
  players.reduce(
    (acc, { id, cards }) => {
      const cardScore = cards[0].stats.find(
        ({ name }) => name === stat.name
      )?.value;

      if (cardScore && cardScore > acc.score) {
        acc = { id: id, score: cardScore };
      }

      return acc;
    },
    { id: player.id, score: stat.value }
  );

export const updateRoundWinners = (roundWinners: string[], id: string) => [
  ...roundWinners,
  id,
];

export const updatePlayerScores = (players: Player[], id: string) =>
  players.map((player) => {
    return player.id === id ? { ...player, score: player.score + 1 } : player;
  });

export const updatePlayerIsCardShown = (players: Player[], id: string) =>
  players.map((player) =>
    player.id === id ? { ...player, isCardShown: !player.isCardShown } : player
  );

export const updatePlayerIsCardShownAll = (
  players: Player[],
  isShown: boolean
) =>
  players.map((player) => {
    return { ...player, isCardShown: isShown };
  });

export const updatePlayerCards = (players: Player[]) =>
  players.map((player) => {
    return { ...player, cards: moveTopCardToBottom(player.cards) };
  });
