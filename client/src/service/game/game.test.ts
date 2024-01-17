import {
  highestScore,
  initialiseGame,
  thresholdToWin,
  updateCardsThatHaveTopTrumpStat,
  whosWon,
} from "./game";
import { pokemon_cards } from "../../mock_api/mock_pokemon_data";
describe("Game initialisation", () => {
  it("initialise games with 3 players and 4 rounds", () => {
    const game = initialiseGame(3, 4, pokemon_cards);

    expect(game.totalRounds).toBe(4);
    expect(game.roundWinners.length).toBe(0);
    expect(game.currentRound).toBe(0);

    expect(game.players.length).toBe(3);
    const player1 = game.players[0];
    expect(player1.id).toBe("player-1");
    expect(player1.name).toBe("Player 1");
    expect(player1.score).toBe(0);
    expect(player1.cards.length).toBe(4);

    const player2 = game.players[1];
    expect(player2.id).toBe("player-2");
    expect(player2.name).toBe("Player 2");
    expect(player2.score).toBe(0);
    expect(player2.cards.length).toBe(4);

    const player3 = game.players[2];
    expect(player3.id).toBe("player-3");
    expect(player3.name).toBe("Player 3");
    expect(player3.score).toBe(0);
    expect(player3.cards.length).toBe(4);
  });

  it("throw an error if number of players is less than 2", () => {
    expect(() => {
      initialiseGame(1, 4);
    }).toThrow(Error);
    expect(() => {
      initialiseGame(0, 4);
    }).toThrow("Number of players must be at least 2");
  });

  it("throw an error if number of rounds is less than 1", () => {
    expect(() => {
      initialiseGame(2, -1);
    }).toThrow(Error);
    expect(() => {
      initialiseGame(3, 0);
    }).toThrow("Number of rounds must be at least 1");
  });
});

describe("Winning threshold", () => {
  it("work out the mininum number of games to win", () => {
    expect(thresholdToWin(5)).toBe(3);
    expect(thresholdToWin(6)).toBe(4);
  });
});

describe("Highest score for set of players", () => {
  it("should return the higest score", () => {
    const game = initialiseGame(2, 5, pokemon_cards);
    const player1 = { ...game.players[0], score: 3 };
    const player2 = { ...game.players[1], score: 2 };
    expect(highestScore([player1, player2])).toBe(3);
  });
});

describe("Which player has won", () => {
  it("should return player that meet the highest score", () => {
    const game = initialiseGame(2, 5, pokemon_cards);
    const player1 = { ...game.players[0], score: 3 };
    const player2 = { ...game.players[1], score: 2 };
    expect(whosWon("FINISHED", 3, [player1, player2])).toEqual([player1]);
  });
  it("should return players that meet the highest score", () => {
    const game = initialiseGame(3, 6, pokemon_cards);
    const player1 = { ...game.players[0], score: 3 };
    const player2 = { ...game.players[1], score: 0 };
    const player3 = { ...game.players[1], score: 3 };

    expect(whosWon("FINISHED", 3, [player1, player2, player3])).toEqual([
      player1,
      player3,
    ]);
  });
  it("should return no players if the game is not finished", () => {
    const game = initialiseGame(3, 6, pokemon_cards);
    const player1 = { ...game.players[0], score: 3 };
    const player2 = { ...game.players[1], score: 0 };
    const player3 = { ...game.players[1], score: 3 };

    expect(whosWon("READY", 3, [player1, player2, player3])).toBeNull;
  });
  it("should return empty list if the game is finished but no one has the highest score", () => {
    const game = initialiseGame(2, 6, pokemon_cards);
    const player1 = { ...game.players[0], score: 3 };
    const player2 = { ...game.players[1], score: 0 };

    expect(whosWon("FINISHED", 6, [player1, player2])).toEqual([]);
  });
});
describe("updateCardsThatHaveTopTrumpStat functionality", () => {
  it("should return a set of cards with the card with highest attack score as a top trump for that stat ", () => {
    const cards = pokemon_cards;
    const highestAttackCard = cards.find((c) => c.id === 15); //this is highest attack score from mock data file
    expect(
      highestAttackCard?.stats.find((s) => s.name === "attack")?.isTopTrump
    ).toBeUndefined;

    const updatedCards = updateCardsThatHaveTopTrumpStat(
      pokemon_cards,
      "attack"
    );
    const updatedHighestAttackCard = updatedCards.find((c) => c.id === 15);
    expect(
      updatedHighestAttackCard?.stats.find((s) => s.name === "attack")
        ?.isTopTrump
    ).toBe(true);
  });
  it("should return a set of cards with the card with highest defense score as a top trump for that stat ", () => {
    const cards = pokemon_cards;
    const highestDefenseCard = cards.find((c) => c.id === 9); //this is highest defense score from mock data file
    expect(
      highestDefenseCard?.stats.find((s) => s.name === "defense")?.isTopTrump
    ).toBeUndefined;

    const updatedCards = updateCardsThatHaveTopTrumpStat(
      pokemon_cards,
      "defense"
    );
    const updatedHighestDefenseCard = updatedCards.find((c) => c.id === 9);
    expect(
      updatedHighestDefenseCard?.stats.find((s) => s.name === "defense")
        ?.isTopTrump
    ).toBe(true);
  });
});
