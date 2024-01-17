import { Game, GameStatusKind } from "../../types/game/game.types";
import { Player } from "../../types/player/player.types";
import { Card } from "../../types/card/card.types";
import { dealCards } from "../deal_cards";

export function initialiseGame(
  numberPlayers: number,
  numberOfRoundsToPlay: number,
  pack?: Array<Card>
): Game {
  if (numberPlayers < 2) throw Error("Number of players must be at least 2");
  if (numberOfRoundsToPlay < 1)
    throw Error("Number of rounds must be at least 1");

  if (
    pack === undefined ||
    pack.length < numberOfRoundsToPlay * numberPlayers
  ) {
    throw Error("Not enough cards in the deck");
  }

  const hands = dealCards(
    numberPlayers,
    numberOfRoundsToPlay,
    pack.map((c) => c.id)
  );

  const players: Player[] = [];

  for (let i = 1; i < numberPlayers + 1; i++) {
    const cards = pack.filter((c) => hands[i - 1].includes(c.id));

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
    totalRounds: numberOfRoundsToPlay,
    roundWinners: [],
    gameStatus: "READY",
    currentRound: 0,
  };

  return game;
}

export function thresholdToWin(totalRounds: number) {
  return totalRounds % 2 === 0
    ? Math.ceil(totalRounds / 2 + 1)
    : Math.ceil(totalRounds / 2);
}

export function highestScore(players: Player[]) {
  return players.reduce((prev, current) => {
    return prev > current.score ? prev : current.score;
  }, 0);
}

export function whosWon(
  gameStatus: GameStatusKind,
  currentHighScore: number,
  players: Player[]
) {
  if (gameStatus === "FINISHED") {
    return players.filter((p) => p.score === currentHighScore);
  }
  return null;
}

export function updateCardsThatHaveTopTrumpStat(cards: Card[]) {
  //order by attack stat - highest will shift to the front
  const packOrderedByAttack = cards.sort((a, b) => {
    const bStat = b.stats.find((s) => s.name === "attack");
    const aStat = a.stats.find((s) => s.name === "attack");

    const bStatValue = bStat ? bStat.value : 0;
    const aStatValue = aStat ? aStat.value : 0;
    return bStatValue - aStatValue;
  });

  //update highest attack stat to have isTopTrump true set
  const topTrumpForAttack = packOrderedByAttack.shift();
  if (topTrumpForAttack) {
    topTrumpForAttack?.stats.map((s) => {
      if (s.name === "attack") s.isTopTrump = true;
    });
    packOrderedByAttack.push(topTrumpForAttack);
  }
  return packOrderedByAttack;
}
