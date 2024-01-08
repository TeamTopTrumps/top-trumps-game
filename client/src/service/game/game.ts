import { Game } from "../../types/game/game.types";
import { Player } from "../../types/player/player.types";
import { Card } from "../../types/card/card.types";
import { DUMMY_CARD_DATA1, DUMMY_CARD_DATA2 } from "../../constants/constants";
export function initialiseGame(
  numberPlayers: number,
  numberOfRoundsToPlay: number
): Game {
  if (numberPlayers < 2) throw Error("Number of players must be at least 2");
  if (numberOfRoundsToPlay < 1)
    throw Error("Number of rounds must be at least 1");

  const players: Player[] = [];

  for (let i = 1; i < numberPlayers + 1; i++) {
    const cards: Card[] =
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

  const game: Game = {
    players: players,
    currentRound: 0,
    totalRounds: numberOfRoundsToPlay,
    roundWinners: [],
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
          value: 23,
        },
      ],
    };
    cards.push(card);
  }
  return cards;
}

export function keepPlaying(
  players: Player[],
  totalRounds: number,
  currentRound: number
) {
  const roundsLeft = totalRounds - currentRound;
  const roundsToWin =
    totalRounds % 2 === 0
      ? Math.ceil(totalRounds / 2 + 1)
      : Math.ceil(totalRounds / 2);

  console.log(totalRounds, currentRound, roundsLeft, roundsToWin);

  if (roundsLeft === 0) return false;
  else {
    //has any player got enough round to win
    players.map((p) => console.log(p.id, p.score));
    const playersThatHaveWon = players.filter((p) => p.score === roundsToWin);
    console.log(
      "playersThatHaveWon",
      playersThatHaveWon.map((p) => p.name),
      playersThatHaveWon.length === 0
    );
    if (playersThatHaveWon.length === 0) return true;
    else return false;
  }
}

function findPlayerWithMaxWins(players: Player[]) {
  return players.reduce((prev, current) => {
    return prev.score > current.score ? prev : current;
  });
}

export function findWinningPlayers(players: Player[]) {
  const highestScore = findPlayerWithMaxWins(players);
  return players.filter((p) => p.score === highestScore.score);
}
