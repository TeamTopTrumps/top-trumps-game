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

    const player2 = game.players[1];
    expect(player2.id).toBe("player-2");
    expect(player2.name).toBe("Player 2");
    expect(player2.score).toBe(0);

    const player3 = game.players[2];
    expect(player3.id).toBe("player-3");
    expect(player3.name).toBe("Player 3");
    expect(player3.score).toBe(0);
  });
});
