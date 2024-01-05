import { initialiseGame } from "./game";

describe("Game", () => {
  it("initialise games with 3 players and 4 rounds", () => {
    const game = initialiseGame(3, 4);

    expect(game.totalRounds).toBe(4);
    expect(game.currentRound).toBe(0);
    expect(game.roundWinners.length).toBe(0);

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
