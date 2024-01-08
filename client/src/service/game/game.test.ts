import { initialiseGame, determineGameWinner, keepPlaying } from "./game";
import { Game } from "../../types/game/game.types";
import { Player } from "../../types/player/player.types";
describe("Game initialisation", () => {
  it("initialise games with 3 players and 4 rounds", () => {
    const game = initialiseGame(3, 4);

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

describe("Determine overall winner", () => {
  it("when all rounds played determines who has the most wins", () => {
    const player1 = {
      id: `player1`,
      name: `Player 1`,
      score: 4,
      cards: [],
      isCardShown: false,
      isHuman: false,
    };

    const player2 = {
      id: `player2`,
      name: `Player 2`,
      score: 1,
      cards: [],
      isCardShown: false,
      isHuman: false,
    };
    const game: Game = {
      players: [player1, player2],
      totalRounds: 5,
      currentRound: 0,
      roundWinners: ["player1", "player1", "player1", "player1", "player2"],
    };

    const overallWinner = determineGameWinner(game);
    expect(overallWinner).toEqual([player1]);
  });

  it("when rounds is less than total rounds and no clear winner return no overall winner", () => {
    const player1 = {
      id: `player1`,
      name: `Player 1`,
      score: 1,
      cards: [],
      isCardShown: false,
      isHuman: false,
    };
    const player2 = {
      id: `player2`,
      name: `Player 2`,
      score: 1,
      cards: [],
      isCardShown: false,
      isHuman: false,
    };
    const game: Game = {
      players: [player1, player2],
      totalRounds: 5,
      currentRound: 4,
      roundWinners: ["not using"],
    };

    const overallWinner = determineGameWinner(game);
    expect(overallWinner).toEqual(null);
  });

  it("will determine a winner when player has reached score that no one else can reach", () => {
    const player1 = {
      id: `player1`,
      name: `Player 1`,
      score: 0,
      cards: [],
      isCardShown: false,
      isHuman: false,
    };
    const player2 = {
      id: `player2`,
      name: `Player 2`,
      score: 3,
      cards: [],
      isCardShown: false,
      isHuman: false,
    };
    const game = {
      players: [player1, player2],
      currentRound: 3,
      totalRounds: 5,
      roundWinners: ["not using"],
    };

    const overallWinner = determineGameWinner(game);
    expect(overallWinner).toEqual([player2]);
  });

  it("should call a draw", () => {
    const player1 = {
      id: `player1`,
      name: `Player 1`,
      score: 2,
      cards: [],
      isCardShown: false,
      isHuman: false,
    };
    const player2 = {
      id: `player2`,
      name: `Player 2`,
      score: 2,
      cards: [],
      isCardShown: false,
      isHuman: false,
    };
    const player3 = {
      id: `player3`,
      name: `Player 2`,
      score: 1,
      cards: [],
    };
    const game = {
      players: [player1, player2, player3],
      currentRound: 4,
      totalRounds: 5,
      roundWinners: ["not using"],
    };

    const overallWinners = determineGameWinner(game);
    expect(overallWinners).toEqual([player1, player2]);
  });
});

describe("Determine if game should end", () => {
  it("the game shoud end when no rounds are left", () => {
    const player1 = {
      id: `player-1`,
      name: `Player 1`,
      score: 2,
      cards: [],
      isCardShown: false,
      isHuman: false,
    };

    const player2 = {
      id: `player-2`,
      name: `Player 1`,
      score: 3,
      cards: [],
      isCardShown: false,
      isHuman: false,
    };
    const game = {
      players: [player1, player2],
      currentRound: 5,
      totalRounds: 5,
      roundWinners: ["not using this"],
    };

    expect(keepPlaying(game)).toBe(false);
  });

  it("the game shoud keep going", () => {
    const player1 = {
      id: `player-1`,
      name: `Player 1`,
      score: 1,
      cards: [],
      isCardShown: false,
      isHuman: false,
    };

    const player2 = {
      id: `player-2`,
      name: `Player 1`,
      score: 1,
      cards: [],
      isCardShown: false,
      isHuman: false,
    };
    const game = {
      players: [player1, player2],
      currentRound: 4,
      totalRounds: 5,
      roundWinners: ["not using this"],
    };

    expect(keepPlaying(game)).toBe(true);
  });

  it("the game should stop if a player has high enough score to win - 2player game", () => {
    const player1 = {
      id: `player-1`,
      name: `Player 1`,
      score: 3,
      cards: [],
      isCardShown: false,
      isHuman: false,
    };

    const player2 = {
      id: `player-2`,
      name: `Player 1`,
      score: 1,
      cards: [],
      isCardShown: false,
      isHuman: false,
    };
    const game = {
      players: [player1, player2],
      currentRound: 4,
      totalRounds: 5,
      roundWinners: ["not using this"],
    };

    expect(keepPlaying(game)).toBe(false);
  });

  it("the game should stop if a player has high enough score to win -  3 player game", () => {
    const player1 = {
      id: `player-1`,
      name: `Player 1`,
      score: 4,
      cards: [],
      isCardShown: false,
      isHuman: false,
    };

    const player2 = {
      id: `player-2`,
      name: `Player 1`,
      score: 2,
      cards: [],
      isCardShown: false,
      isHuman: false,
    };

    const player3 = {
      id: `player-2`,
      name: `Player 1`,
      score: 1,
      cards: [],
      isCardShown: false,
      isHuman: false,
    };

    const game = {
      players: [player1, player2, player3],
      currentRound: 7,
      totalRounds: 8,
      roundWinners: ["not using this"],
    };

    expect(keepPlaying(game)).toBe(false);
  });
});
