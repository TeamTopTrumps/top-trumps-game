import { initialiseGame } from "./game";

describe("Game", () => {
  it("initialise games with 2 players with no cards and no rounds played", () => {
    const game = initialiseGame();

    expect(game.players.length).toBe(2);

    const player1 = game.players[0];
    expect(player1.id).toBe("player-1");
    expect(player1.score).toBe(0);

    const player2 = game.players[1];
    expect(player2.id).toBe("player-2");
    expect(player2.score).toBe(0);
  });
});
