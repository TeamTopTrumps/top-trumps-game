import { Card, Stat } from "../../types/card/card.types";
import { Player } from "../../types/player/player.types";
import { NonEmptyArray } from "../../types/utility/utility.types";
import {
  moveTopCardToBottom,
  chooseRandomStat,
  calculateRoundWinner,
  updateRoundWinners,
  updatePlayerScores,
  updatePlayerCards,
  updatePlayerIsCardShown,
  updatePlayerIsCardShownAll,
  getNextPlayer,
} from "./round";

describe("chooseRandomStat", () => {
  test("Given an array with one stat, When chooseRandomStat is called, Then it should return that stat", () => {
    //Given
    const stats: NonEmptyArray<Stat> = [{ name: "attack", value: 43 }];
    //When
    const randomStat = chooseRandomStat(stats, stats.length);
    //Then
    expect(randomStat).toEqual(stats[0]);
  });
});

describe("chooseRandomStat", () => {
  test("Given an array with more than one stat, When chooseRandomStat is called, Then it should return one of the stats", () => {
    //Given
    const stats: NonEmptyArray<Stat> = [
      { name: "attack", value: 10 },
      { name: "defense", value: 10 },
      { name: "hp", value: 10 },
      { name: "weight", value: 10 },
      { name: "speed", value: 10 },
    ];

    const mockStat = {
      name: expect.stringMatching(/attack|defense|hp|weight|speed/),
      value: 10,
    };
    //When
    const randomStat = chooseRandomStat(stats, stats.length);
    //Then
    expect(randomStat).toHaveProperty("name");
    expect(randomStat).toHaveProperty("value");
    expect(randomStat).toMatchObject(mockStat);
  });
});

describe("calculateRoundWinner result for a draw", () => {
  test("Given a stat and a player id, When the same stat on all other player's cards has an equal value, Then it should return an object with the value of that stat and the provided player id", () => {
    //Given
    const stat: Stat = { name: "attack", value: 10 };
    const cards: Card[] = [
      {
        id: 1,
        name: "some-card-name",
        imageUrl: "some-url",
        description: "some-description",
        type: "some-type",
        stats: [
          { name: "attack", value: 10 },
          { name: "defense", value: 10 },
          { name: "hp", value: 10 },
          { name: "weight", value: 10 },
          { name: "speed", value: 10 },
        ],
      },
    ];
    const player1 = {
      id: "player-1",
      name: "some-name",
      score: 0,
      cards: cards,
      isCardShown: false,
      isHuman: false,
    };
    const player2 = {
      id: "player-2",
      name: "some-name",
      score: 0,
      cards: cards,
      isCardShown: false,
      isHuman: false,
    };
    const players = [player1, player2];
    //When
    const winner = calculateRoundWinner(players, stat, player1);
    //Then
    expect(winner).toEqual({ id: "player-1", score: 10 });
  });
});

describe("calculateRoundWinner result for another player having a higher score for the chosen stat", () => {
  test("Given a stat and a player id, When the same stat on another player's card has an higher value, Then it should return an object with the highest stat value and the player id whose card has the highest stat", () => {
    //Given
    const stat: Stat = { name: "attack", value: 10 };
    const cards1: Card[] = [
      {
        id: 1,
        name: "some-card-name",
        imageUrl: "some-url",
        description: "some-description",
        type: "some-type",
        stats: [
          { name: "attack", value: 10 },
          { name: "defense", value: 10 },
          { name: "hp", value: 10 },
          { name: "weight", value: 10 },
          { name: "speed", value: 10 },
        ],
      },
    ];
    const cards2: Card[] = [
      {
        id: 1,
        name: "some-card-name",
        imageUrl: "some-url",
        description: "some-description",
        type: "some-type",
        stats: [
          { name: "attack", value: 11 },
          { name: "defense", value: 10 },
          { name: "hp", value: 10 },
          { name: "weight", value: 10 },
          { name: "speed", value: 10 },
        ],
      },
    ];
    const player1 = {
      id: "player-1",
      name: "some-name",
      score: 0,
      cards: cards1,
      isCardShown: false,
      isHuman: false,
    };
    const player2 = {
      id: "player-2",
      name: "some-name",
      score: 0,
      cards: cards2,
      isCardShown: false,
      isHuman: false,
    };
    const players = [player1, player2];
    //When
    const winner = calculateRoundWinner(players, stat, player1);
    //Then
    expect(winner).toEqual({ id: "player-2", score: 11 });
  });
});

describe("calculateRoundWinner result the given player having the highest score for the chosen stat", () => {
  test("Given a stat and a player id, When the same stat on all other player's cards has a lower value, Then it should return an object with the value of the provided stat and the provided player id", () => {
    //Given
    const stat: Stat = { name: "attack", value: 10 };
    const cards1: Card[] = [
      {
        id: 1,
        name: "some-card-name",
        imageUrl: "some-url",
        description: "some-description",
        type: "some-type",
        stats: [
          { name: "attack", value: 11 },
          { name: "defense", value: 10 },
          { name: "hp", value: 10 },
          { name: "weight", value: 10 },
          { name: "speed", value: 10 },
        ],
      },
    ];
    const cards2: Card[] = [
      {
        id: 1,
        name: "some-card-name",
        imageUrl: "some-url",
        description: "some-description",
        type: "some-type",
        stats: [
          { name: "attack", value: 10 },
          { name: "defense", value: 10 },
          { name: "hp", value: 10 },
          { name: "weight", value: 10 },
          { name: "speed", value: 10 },
        ],
      },
    ];
    const player1 = {
      id: "player-1",
      name: "some-name",
      score: 0,
      cards: cards1,
      isCardShown: false,
      isHuman: false,
    };
    const player2 = {
      id: "player-2",
      name: "some-name",
      score: 0,
      cards: cards2,
      isCardShown: false,
      isHuman: false,
    };
    const players = [player1, player2];
    //When
    const winner = calculateRoundWinner(players, stat, player1);
    //Then
    expect(winner).toEqual({ id: "player-1", score: 11 });
  });
});

describe("calculateRoundWinner should only compare the result of the first card in each player's card array", () => {
  test("Given a stat and a player id, When the same stat on first card in all other card arrays has a lower value, Then it should return an object with the value of the provided stat and the provided player id", () => {
    //Given
    const stat: Stat = { name: "attack", value: 10 };
    const cards1: Card[] = [
      {
        id: 1,
        name: "some-card-name",
        imageUrl: "some-url",
        description: "some-description",
        type: "some-type",
        stats: [
          { name: "attack", value: 11 },
          { name: "defense", value: 10 },
          { name: "hp", value: 10 },
          { name: "weight", value: 10 },
          { name: "speed", value: 10 },
        ],
      },
      {
        id: 1,
        name: "some-card-name",
        imageUrl: "some-url",
        description: "some-description",
        type: "some-type",
        stats: [
          { name: "attack", value: 10 },
          { name: "defense", value: 10 },
          { name: "hp", value: 10 },
          { name: "weight", value: 10 },
          { name: "speed", value: 10 },
        ],
      },
    ];
    const cards2: Card[] = [
      {
        id: 1,
        name: "some-card-name",
        imageUrl: "some-url",
        description: "some-description",
        type: "some-type",
        stats: [
          { name: "attack", value: 10 },
          { name: "defense", value: 10 },
          { name: "hp", value: 10 },
          { name: "weight", value: 10 },
          { name: "speed", value: 10 },
        ],
      },
      {
        id: 1,
        name: "some-card-name",
        imageUrl: "some-url",
        description: "some-description",
        type: "some-type",
        stats: [
          { name: "attack", value: 12 },
          { name: "defense", value: 10 },
          { name: "hp", value: 10 },
          { name: "weight", value: 10 },
          { name: "speed", value: 10 },
        ],
      },
    ];
    const player1 = {
      id: "player-1",
      name: "some-name",
      score: 0,
      cards: cards1,
      isCardShown: false,
      isHuman: false,
    };
    const player2 = {
      id: "player-2",
      name: "some-name",
      score: 0,
      cards: cards2,
      isCardShown: false,
      isHuman: false,
    };
    const players = [player1, player2];
    //When
    const winner = calculateRoundWinner(players, stat, player1);
    //Then
    expect(winner).toEqual({ id: "player-1", score: 11 });
  });
});

describe("calculateRoundWinner should work with more than two players", () => {
  test("Given an array of more than two players, a stat, and a player id, When the same stat on first card of another player has a higher value, Then it should return an object with the value of the stat on that player's card and that player's id", () => {
    //Given
    const stat: Stat = { name: "attack", value: 10 };
    const cards1: Card[] = [
      {
        id: 1,
        name: "some-card-name",
        imageUrl: "some-url",
        description: "some-description",
        type: "some-type",
        stats: [
          { name: "attack", value: 11 },
          { name: "defense", value: 10 },
          { name: "hp", value: 10 },
          { name: "weight", value: 10 },
          { name: "speed", value: 10 },
        ],
      },
      {
        id: 1,
        name: "some-card-name",
        imageUrl: "some-url",
        description: "some-description",
        type: "some-type",
        stats: [
          { name: "attack", value: 10 },
          { name: "defense", value: 10 },
          { name: "hp", value: 10 },
          { name: "weight", value: 10 },
          { name: "speed", value: 10 },
        ],
      },
    ];
    const cards2: Card[] = [
      {
        id: 1,
        name: "some-card-name",
        imageUrl: "some-url",
        description: "some-description",
        type: "some-type",
        stats: [
          { name: "attack", value: 10 },
          { name: "defense", value: 10 },
          { name: "hp", value: 10 },
          { name: "weight", value: 10 },
          { name: "speed", value: 10 },
        ],
      },
      {
        id: 1,
        name: "some-card-name",
        imageUrl: "some-url",
        description: "some-description",
        type: "some-type",
        stats: [
          { name: "attack", value: 12 },
          { name: "defense", value: 10 },
          { name: "hp", value: 10 },
          { name: "weight", value: 10 },
          { name: "speed", value: 10 },
        ],
      },
    ];
    const cards3: Card[] = [
      {
        id: 1,
        name: "some-card-name",
        imageUrl: "some-url",
        description: "some-description",
        type: "some-type",
        stats: [
          { name: "attack", value: 14 },
          { name: "defense", value: 10 },
          { name: "hp", value: 10 },
          { name: "weight", value: 10 },
          { name: "speed", value: 10 },
        ],
      },
      {
        id: 1,
        name: "some-card-name",
        imageUrl: "some-url",
        description: "some-description",
        type: "some-type",
        stats: [
          { name: "attack", value: 12 },
          { name: "defense", value: 10 },
          { name: "hp", value: 10 },
          { name: "weight", value: 10 },
          { name: "speed", value: 10 },
        ],
      },
    ];
    const player1 = {
      id: "player-1",
      name: "some-name",
      score: 0,
      cards: cards1,
      isCardShown: false,
      isHuman: false,
    };
    const player2 = {
      id: "player-2",
      name: "some-name",
      score: 0,
      cards: cards2,
      isCardShown: false,
      isHuman: false,
    };
    const player3 = {
      id: "player-3",
      name: "some-name",
      score: 0,
      cards: cards3,
      isCardShown: false,
      isHuman: false,
    };
    const players = [player1, player2, player3];
    //When
    const winner = calculateRoundWinner(players, stat, player1);
    //Then
    expect(winner).toEqual({ id: "player-3", score: 14 });
  });
});

describe("calculateRoundWinner should throw an error if the provided player is not part of the provided players array", () => {
  test("Given an array of players, a stat, and a player not in the array, When function is called, Then it should throw an error", () => {
    //Given
    const stat: Stat = { name: "attack", value: 10 };
    const cards1: Card[] = [
      {
        id: 1,
        name: "some-card-name",
        imageUrl: "some-url",
        description: "some-description",
        type: "some-type",
        stats: [
          { name: "attack", value: 11 },
          { name: "defense", value: 10 },
          { name: "hp", value: 10 },
          { name: "weight", value: 10 },
          { name: "speed", value: 10 },
        ],
      },
      {
        id: 1,
        name: "some-card-name",
        imageUrl: "some-url",
        description: "some-description",
        type: "some-type",
        stats: [
          { name: "attack", value: 10 },
          { name: "defense", value: 10 },
          { name: "hp", value: 10 },
          { name: "weight", value: 10 },
          { name: "speed", value: 10 },
        ],
      },
    ];
    const cards2: Card[] = [
      {
        id: 1,
        name: "some-card-name",
        imageUrl: "some-url",
        description: "some-description",
        type: "some-type",
        stats: [
          { name: "attack", value: 10 },
          { name: "defense", value: 10 },
          { name: "hp", value: 10 },
          { name: "weight", value: 10 },
          { name: "speed", value: 10 },
        ],
      },
      {
        id: 1,
        name: "some-card-name",
        imageUrl: "some-url",
        description: "some-description",
        type: "some-type",
        stats: [
          { name: "attack", value: 12 },
          { name: "defense", value: 10 },
          { name: "hp", value: 10 },
          { name: "weight", value: 10 },
          { name: "speed", value: 10 },
        ],
      },
    ];
    const cards3: Card[] = [
      {
        id: 1,
        name: "some-card-name",
        imageUrl: "some-url",
        description: "some-description",
        type: "some-type",
        stats: [
          { name: "attack", value: 14 },
          { name: "defense", value: 10 },
          { name: "hp", value: 10 },
          { name: "weight", value: 10 },
          { name: "speed", value: 10 },
        ],
      },
      {
        id: 1,
        name: "some-card-name",
        imageUrl: "some-url",
        description: "some-description",
        type: "some-type",
        stats: [
          { name: "attack", value: 12 },
          { name: "defense", value: 10 },
          { name: "hp", value: 10 },
          { name: "weight", value: 10 },
          { name: "speed", value: 10 },
        ],
      },
    ];
    const player1 = {
      id: "player-1",
      name: "some-name",
      score: 0,
      cards: cards1,
      isCardShown: false,
      isHuman: false,
    };
    const player2 = {
      id: "player-2",
      name: "some-name",
      score: 0,
      cards: cards2,
      isCardShown: false,
      isHuman: false,
    };
    const player3 = {
      id: "player-3",
      name: "some-name",
      score: 0,
      cards: cards3,
      isCardShown: false,
      isHuman: false,
    };
    const players = [player1, player2];
    //When
    //Then
    expect(() => {
      calculateRoundWinner(players, stat, player3);
    }).toThrow(Error);
    expect(() => {
      calculateRoundWinner(players, stat, player3);
    }).toThrow("Player must be included in the Player array");
  });
});

describe("calculateRoundWinner should work with one player", () => {
  test("Given an array of one player, a stat, and the same player, When function is called, Then it should return the provided player id and provided stat value", () => {
    //Given
    const stat: Stat = { name: "attack", value: 10 };
    const cards1: Card[] = [
      {
        id: 1,
        name: "some-card-name",
        imageUrl: "some-url",
        description: "some-description",
        type: "some-type",
        stats: [
          { name: "attack", value: 10 },
          { name: "defense", value: 10 },
          { name: "hp", value: 10 },
          { name: "weight", value: 10 },
          { name: "speed", value: 10 },
        ],
      },
      {
        id: 1,
        name: "some-card-name",
        imageUrl: "some-url",
        description: "some-description",
        type: "some-type",
        stats: [
          { name: "attack", value: 10 },
          { name: "defense", value: 10 },
          { name: "hp", value: 10 },
          { name: "weight", value: 10 },
          { name: "speed", value: 10 },
        ],
      },
    ];

    const player1 = {
      id: "player-1",
      name: "some-name",
      score: 0,
      cards: cards1,
      isCardShown: false,
      isHuman: false,
    };

    const players = [player1];
    //When
    const winner = calculateRoundWinner(players, stat, player1);
    //Then
    expect(winner).toEqual({ id: "player-1", score: 10 });
  });
});

describe("calculateRoundWinner should work with more than two players", () => {
  test("Given an array of players, one of whom has no cards, When the function runs, Then it should throw an error saying which player has no cards", () => {
    //Given
    const stat: Stat = { name: "attack", value: 10 };
    const cards1: Card[] = [
      {
        id: 1,
        name: "some-card-name",
        imageUrl: "some-url",
        description: "some-description",
        type: "some-type",
        stats: [
          { name: "attack", value: 11 },
          { name: "defense", value: 10 },
          { name: "hp", value: 10 },
          { name: "weight", value: 10 },
          { name: "speed", value: 10 },
        ],
      },
      {
        id: 1,
        name: "some-card-name",
        imageUrl: "some-url",
        description: "some-description",
        type: "some-type",
        stats: [
          { name: "attack", value: 10 },
          { name: "defense", value: 10 },
          { name: "hp", value: 10 },
          { name: "weight", value: 10 },
          { name: "speed", value: 10 },
        ],
      },
    ];
    const cards3: Card[] = [
      {
        id: 1,
        name: "some-card-name",
        imageUrl: "some-url",
        description: "some-description",
        type: "some-type",
        stats: [
          { name: "attack", value: 14 },
          { name: "defense", value: 10 },
          { name: "hp", value: 10 },
          { name: "weight", value: 10 },
          { name: "speed", value: 10 },
        ],
      },
      {
        id: 1,
        name: "some-card-name",
        imageUrl: "some-url",
        description: "some-description",
        type: "some-type",
        stats: [
          { name: "attack", value: 12 },
          { name: "defense", value: 10 },
          { name: "hp", value: 10 },
          { name: "weight", value: 10 },
          { name: "speed", value: 10 },
        ],
      },
    ];
    const player1 = {
      id: "player-1",
      name: "some-name",
      score: 0,
      cards: cards1,
      isCardShown: false,
      isHuman: false,
    };
    const player2 = {
      id: "player-2",
      name: "Player 2",
      score: 0,
      cards: [],
      isCardShown: false,
      isHuman: false,
    };
    const player3 = {
      id: "player-3",
      name: "Player 3",
      score: 0,
      cards: cards3,
      isCardShown: false,
      isHuman: false,
    };
    const players = [player1, player2, player3];
    //When
    //Then
    expect(() => {
      calculateRoundWinner(players, stat, player3);
    }).toThrow(Error);
    expect(() => {
      calculateRoundWinner(players, stat, player3);
    }).toThrow("Player 2 has no cards!");
  });
});

describe("calculateRoundWinner should throw an error if none of the players in the array have cards", () => {
  test("Given an array of players without cards, a stat, and a player, When function is called, Then it should throw an error", () => {
    //Given
    const stat: Stat = { name: "attack", value: 10 };
    const cards1: Card[] = [
      {
        id: 1,
        name: "some-card-name",
        imageUrl: "some-url",
        description: "some-description",
        type: "some-type",
        stats: [
          { name: "attack", value: 11 },
          { name: "defense", value: 10 },
          { name: "hp", value: 10 },
          { name: "weight", value: 10 },
          { name: "speed", value: 10 },
        ],
      },
      {
        id: 1,
        name: "some-card-name",
        imageUrl: "some-url",
        description: "some-description",
        type: "some-type",
        stats: [
          { name: "attack", value: 10 },
          { name: "defense", value: 10 },
          { name: "hp", value: 10 },
          { name: "weight", value: 10 },
          { name: "speed", value: 10 },
        ],
      },
    ];

    const player1 = {
      id: "player-1",
      name: "Player 1",
      score: 0,
      cards: cards1,
      isCardShown: false,
      isHuman: false,
    };

    const players: Player[] = [];
    //When
    //Then
    expect(() => {
      calculateRoundWinner(players, stat, player1);
    }).toThrow(Error);
    expect(() => {
      calculateRoundWinner(players, stat, player1);
    }).toThrow("Please provide an array of Players");
  });
});

describe("calculateRoundWinner should throw an error if the players has no cards", () => {
  test("Given a player with no cards, When the function runs, Then it should throw an error saying the player has no cards", () => {
    //Given
    const stat: Stat = { name: "attack", value: 10 };
    const cards1: Card[] = [
      {
        id: 1,
        name: "some-card-name",
        imageUrl: "some-url",
        description: "some-description",
        type: "some-type",
        stats: [
          { name: "attack", value: 11 },
          { name: "defense", value: 10 },
          { name: "hp", value: 10 },
          { name: "weight", value: 10 },
          { name: "speed", value: 10 },
        ],
      },
      {
        id: 1,
        name: "some-card-name",
        imageUrl: "some-url",
        description: "some-description",
        type: "some-type",
        stats: [
          { name: "attack", value: 10 },
          { name: "defense", value: 10 },
          { name: "hp", value: 10 },
          { name: "weight", value: 10 },
          { name: "speed", value: 10 },
        ],
      },
    ];
    const cards3: Card[] = [
      {
        id: 1,
        name: "some-card-name",
        imageUrl: "some-url",
        description: "some-description",
        type: "some-type",
        stats: [
          { name: "attack", value: 14 },
          { name: "defense", value: 10 },
          { name: "hp", value: 10 },
          { name: "weight", value: 10 },
          { name: "speed", value: 10 },
        ],
      },
      {
        id: 1,
        name: "some-card-name",
        imageUrl: "some-url",
        description: "some-description",
        type: "some-type",
        stats: [
          { name: "attack", value: 12 },
          { name: "defense", value: 10 },
          { name: "hp", value: 10 },
          { name: "weight", value: 10 },
          { name: "speed", value: 10 },
        ],
      },
    ];
    const player1 = {
      id: "player-1",
      name: "some-name",
      score: 0,
      cards: cards1,
      isCardShown: false,
      isHuman: false,
    };
    const player2 = {
      id: "player-2",
      name: "Player 2",
      score: 0,
      cards: [],
      isCardShown: false,
      isHuman: false,
    };
    const player3 = {
      id: "player-3",
      name: "Player 3",
      score: 0,
      cards: cards3,
      isCardShown: false,
      isHuman: false,
    };
    const players = [player1, player2, player3];
    //When
    //Then
    expect(() => {
      calculateRoundWinner(players, stat, player2);
    }).toThrow(Error);
    expect(() => {
      calculateRoundWinner(players, stat, player2);
    }).toThrow("Player 2 has no cards!");
  });
});

describe("calculateRoundWinner should throw an error if one of the players in the array has no cards", () => {
  test("Given an array of players without cards, a stat, and a player, When function is called, Then it should throw an error", () => {
    //Given
    const stat: Stat = { name: "attack", value: 10 };

    const player1 = {
      id: "player-1",
      name: "Player 1",
      score: 0,
      cards: [],
      isCardShown: false,
      isHuman: false,
    };
    const player2 = {
      id: "player-2",
      name: "Player 2",
      score: 0,
      cards: [],
      isCardShown: false,
      isHuman: false,
    };
    const player3 = {
      id: "player-3",
      name: "Player 2",
      score: 0,
      cards: [],
      isCardShown: false,
      isHuman: false,
    };
    const players = [player1, player2, player3];
    //When
    //Then
    expect(() => {
      calculateRoundWinner(players, stat, player3);
    }).toThrow(Error);
    expect(() => {
      calculateRoundWinner(players, stat, player3);
    }).toThrow("Player 1 has no cards!");
  });
});

describe("updateRoundWinners should add a string to the end of an array of strings", () => {
  test("Given an array of strings and a string, When the function runs, Then it should return a new array containing the strings from the first array followed by the new string", () => {
    //Given
    const previousRoundWinners = ["player-1", "player-1", "player-2"];
    const currentRoundWinner = "player-1";
    //When
    const roundWinners = updateRoundWinners(
      previousRoundWinners,
      currentRoundWinner
    );
    //Then
    expect(roundWinners).toEqual([...previousRoundWinners, currentRoundWinner]);
  });
});

describe("updateRoundWinners should maintain the order of the input array", () => {
  test("Given an array of strings and a string, When the function runs, Then it should return a new array containing the strings from the first array followed in the same order, followed by the new string", () => {
    //Given
    const previousRoundWinners = ["player-3", "player-1", "player-2"];
    const currentRoundWinner = "player-1";
    //When
    const roundWinners = updateRoundWinners(
      previousRoundWinners,
      currentRoundWinner
    );
    //Then
    expect(roundWinners[0]).toEqual("player-3");
    expect(roundWinners[1]).toEqual("player-1");
    expect(roundWinners[2]).toEqual("player-2");
    expect(roundWinners[3]).toEqual("player-1");
  });
});

describe("updateRoundWinners should add a string to an empty array", () => {
  test("Given an empty array and a string, When the function runs, Then it should return a new array the new string", () => {
    //Given
    const previousRoundWinners: string[] = [];
    const currentRoundWinner = "player-1";
    //When
    const roundWinners = updateRoundWinners(
      previousRoundWinners,
      currentRoundWinner
    );
    //Then
    expect(roundWinners).toEqual([currentRoundWinner]);
  });
});

describe("updateRoundWinners throw an error if given an empty string", () => {
  test("Given an empty string, When the function runs, Then it should throw an error", () => {
    //Given
    const previousRoundWinners = ["player-3", "player-1", "player-2"];
    const currentRoundWinner = "";
    //When
    //Then
    expect(() => {
      updateRoundWinners(previousRoundWinners, currentRoundWinner);
    }).toThrow(Error);
    expect(() => {
      updateRoundWinners(previousRoundWinners, currentRoundWinner);
    }).toThrow("Update requires a new round winner id");
  });
});

describe("updatePlayerScores should update the score for the provided player id", () => {
  test("Given a player id and an array of players, When the function runs, Then the score for the player with the matching id in the array should increase by 1 and the array of players should be returned", () => {
    //Given
    const cards: Card[] = [
      {
        id: 1,
        name: "some-card-name",
        imageUrl: "some-url",
        description: "some-description",
        type: "some-type",
        stats: [
          { name: "attack", value: 10 },
          { name: "defense", value: 10 },
          { name: "hp", value: 10 },
          { name: "weight", value: 10 },
          { name: "speed", value: 10 },
        ],
      },
    ];
    const player1 = {
      id: "player-1",
      name: "some-name",
      score: 0,
      cards: cards,
      isCardShown: false,
      isHuman: false,
    };
    const player2 = {
      id: "player-2",
      name: "some-name",
      score: 0,
      cards: cards,
      isCardShown: false,
      isHuman: false,
    };
    const players = [player1, player2];

    const playersWithScoreUpdate = [
      {
        id: "player-1",
        name: "some-name",
        score: 1,
        cards: cards,
        isCardShown: false,
        isHuman: false,
      },
      player2,
    ];
    //When
    const updatedPlayers = updatePlayerScores(players, "player-1");
    //Then
    expect(updatedPlayers).toEqual(playersWithScoreUpdate);
  });
});

describe("updatePlayerScores should throw an error if provided an empty string", () => {
  test("Given an empty string and an array of players, When the function runs, Then it should throw an error", () => {
    //Given
    const cards: Card[] = [
      {
        id: 1,
        name: "some-card-name",
        imageUrl: "some-url",
        description: "some-description",
        type: "some-type",
        stats: [
          { name: "attack", value: 10 },
          { name: "defense", value: 10 },
          { name: "hp", value: 10 },
          { name: "weight", value: 10 },
          { name: "speed", value: 10 },
        ],
      },
    ];
    const player1 = {
      id: "player-1",
      name: "some-name",
      score: 0,
      cards: cards,
      isCardShown: false,
      isHuman: false,
    };
    const player2 = {
      id: "player-2",
      name: "some-name",
      score: 0,
      cards: cards,
      isCardShown: false,
      isHuman: false,
    };
    const players = [player1, player2];

    //When
    expect(() => {
      updatePlayerScores(players, "");
    }).toThrow(Error);
    expect(() => {
      updatePlayerScores(players, "");
    }).toThrow("Please provide a player id to update");
  });
});

describe("updatePlayerScores should throw and error if provided a string that is not a valid player id in the array", () => {
  test("Given a string that is not a player id in the array and an array of players, When the function runs, Then it should throw an error", () => {
    //Given
    const cards: Card[] = [
      {
        id: 1,
        name: "some-card-name",
        imageUrl: "some-url",
        description: "some-description",
        type: "some-type",
        stats: [
          { name: "attack", value: 10 },
          { name: "defense", value: 10 },
          { name: "hp", value: 10 },
          { name: "weight", value: 10 },
          { name: "speed", value: 10 },
        ],
      },
    ];
    const player1 = {
      id: "player-1",
      name: "some-name",
      score: 0,
      cards: cards,
      isCardShown: false,
      isHuman: false,
    };
    const player2 = {
      id: "player-2",
      name: "some-name",
      score: 0,
      cards: cards,
      isCardShown: false,
      isHuman: false,
    };
    const players = [player1, player2];

    //When
    expect(() => {
      updatePlayerScores(players, "sadsadas");
    }).toThrow(Error);
    expect(() => {
      updatePlayerScores(players, "sadsadas");
    }).toThrow("ID does not match a Player ID in the array");
  });
});

describe("updatePlayerScores should throw and error if provided an empty array", () => {
  test("Given a string that is not a player id in the array and an array of players, When the function runs, Then it should throw an error", () => {
    //Given
    const players: Player[] = [];

    //When
    expect(() => {
      updatePlayerScores(players, "player-1");
    }).toThrow(Error);
    expect(() => {
      updatePlayerScores(players, "player-2");
    }).toThrow("Please provide an array of players to update");
  });
});

describe("updatePlayerCards should return an array of players after updating each player's card order", () => {
  test("Given an array of players, When the function runs, Then it should return the an array of the same players with updated cards so that their first card is now last", () => {
    //Given
    const cards: Card[] = [
      {
        id: 1,
        name: "some-card-name",
        imageUrl: "some-url",
        description: "some-description",
        type: "some-type",
        stats: [
          { name: "attack", value: 10 },
          { name: "defense", value: 10 },
          { name: "hp", value: 10 },
          { name: "weight", value: 10 },
          { name: "speed", value: 10 },
        ],
      },
      {
        id: 2,
        name: "some-card-name2",
        imageUrl: "some-url",
        description: "some-description",
        type: "some-type",
        stats: [
          { name: "attack", value: 10 },
          { name: "defense", value: 10 },
          { name: "hp", value: 10 },
          { name: "weight", value: 10 },
          { name: "speed", value: 10 },
        ],
      },
      {
        id: 3,
        name: "some-card-name3",
        imageUrl: "some-url",
        description: "some-description",
        type: "some-type",
        stats: [
          { name: "attack", value: 10 },
          { name: "defense", value: 10 },
          { name: "hp", value: 10 },
          { name: "weight", value: 10 },
          { name: "speed", value: 10 },
        ],
      },
    ];
    const reOrderedCards: Card[] = [
      {
        id: 2,
        name: "some-card-name2",
        imageUrl: "some-url",
        description: "some-description",
        type: "some-type",
        stats: [
          { name: "attack", value: 10 },
          { name: "defense", value: 10 },
          { name: "hp", value: 10 },
          { name: "weight", value: 10 },
          { name: "speed", value: 10 },
        ],
      },
      {
        id: 3,
        name: "some-card-name3",
        imageUrl: "some-url",
        description: "some-description",
        type: "some-type",
        stats: [
          { name: "attack", value: 10 },
          { name: "defense", value: 10 },
          { name: "hp", value: 10 },
          { name: "weight", value: 10 },
          { name: "speed", value: 10 },
        ],
      },
      {
        id: 1,
        name: "some-card-name",
        imageUrl: "some-url",
        description: "some-description",
        type: "some-type",
        stats: [
          { name: "attack", value: 10 },
          { name: "defense", value: 10 },
          { name: "hp", value: 10 },
          { name: "weight", value: 10 },
          { name: "speed", value: 10 },
        ],
      },
    ];
    const player1a = {
      id: "player-1",
      name: "some-name",
      score: 0,
      cards: cards,
      isCardShown: false,
      isHuman: false,
    };
    const player2a = {
      id: "player-2",
      name: "some-name",
      score: 0,
      cards: cards,
      isCardShown: false,
      isHuman: false,
    };
    const player1b = {
      id: "player-1",
      name: "some-name",
      score: 0,
      cards: reOrderedCards,
      isCardShown: false,
      isHuman: false,
    };
    const player2b = {
      id: "player-2",
      name: "some-name",
      score: 0,
      cards: reOrderedCards,
      isCardShown: false,
      isHuman: false,
    };
    const players = [player1a, player2a];
    const newPlayers = [player1b, player2b];
    //When
    const updatedPlayers = updatePlayerCards(players);
    //Then
    expect(updatedPlayers).toEqual(newPlayers);
  });
});

describe("updatePlayerCards should throw an error if given an empty array", () => {
  test("Given an empty array, When the function runs, Then it should throw an error", () => {
    //Given
    const players: Player[] = [];
    //When
    //Then
    expect(() => {
      updatePlayerCards(players);
    }).toThrow(Error);
    expect(() => {
      updatePlayerCards(players);
    }).toThrow("Please provide an array of players to update");
  });
});

describe("updatePlayerIsCardShown should update the isCardShown property for the matching player and return the updated players array", () => {
  test("Given a matching player id, When the isCardShown property is set to true, Then it should return the players with isCardShown on the matching player set to false", () => {
    //Given
    const cards: Card[] = [
      {
        id: 1,
        name: "some-card-name",
        imageUrl: "some-url",
        description: "some-description",
        type: "some-type",
        stats: [
          { name: "attack", value: 10 },
          { name: "defense", value: 10 },
          { name: "hp", value: 10 },
          { name: "weight", value: 10 },
          { name: "speed", value: 10 },
        ],
      },
    ];
    const player1a = {
      id: "player-1",
      name: "some-name",
      score: 0,
      cards: cards,
      isCardShown: false,
      isHuman: false,
    };
    const player2 = {
      id: "player-2",
      name: "some-name",
      score: 0,
      cards: cards,
      isCardShown: false,
      isHuman: false,
    };

    const player1b = {
      id: "player-1",
      name: "some-name",
      score: 0,
      cards: cards,
      isCardShown: true,
      isHuman: false,
    };
    const players = [player1a, player2];
    const newPlayers = [player1b, player2];
    //When
    const updatedPlayers = updatePlayerIsCardShown(players, "player-1");
    //Then
    expect(updatedPlayers).toEqual(newPlayers);
  });

  test("Given a matching player id, When the isCardShown property is set to false, Then it should return the players with isCardShown on the matching player set to true", () => {
    //Given
    const cards: Card[] = [
      {
        id: 1,
        name: "some-card-name",
        imageUrl: "some-url",
        description: "some-description",
        type: "some-type",
        stats: [
          { name: "attack", value: 10 },
          { name: "defense", value: 10 },
          { name: "hp", value: 10 },
          { name: "weight", value: 10 },
          { name: "speed", value: 10 },
        ],
      },
    ];
    const player1a = {
      id: "player-1",
      name: "some-name",
      score: 0,
      cards: cards,
      isCardShown: true,
      isHuman: false,
    };
    const player2 = {
      id: "player-2",
      name: "some-name",
      score: 0,
      cards: cards,
      isCardShown: false,
      isHuman: false,
    };

    const player1b = {
      id: "player-1",
      name: "some-name",
      score: 0,
      cards: cards,
      isCardShown: false,
      isHuman: false,
    };
    const players = [player1a, player2];
    const newPlayers = [player1b, player2];
    //When
    const updatedPlayers = updatePlayerIsCardShown(players, "player-1");
    //Then
    expect(updatedPlayers).toEqual(newPlayers);
  });
});

describe("updatePlayerIsCardShown should throw an error if provided an empty string", () => {
  test("Given an empty string, When the function runs, Then it should throw an error", () => {
    //Given
    const cards: Card[] = [
      {
        id: 1,
        name: "some-card-name",
        imageUrl: "some-url",
        description: "some-description",
        type: "some-type",
        stats: [
          { name: "attack", value: 10 },
          { name: "defense", value: 10 },
          { name: "hp", value: 10 },
          { name: "weight", value: 10 },
          { name: "speed", value: 10 },
        ],
      },
    ];
    const player1 = {
      id: "player-1",
      name: "some-name",
      score: 0,
      cards: cards,
      isCardShown: true,
      isHuman: false,
    };
    const player2 = {
      id: "player-2",
      name: "some-name",
      score: 0,
      cards: cards,
      isCardShown: false,
      isHuman: false,
    };
    const players = [player1, player2];
    //When
    //Then
    expect(() => {
      updatePlayerIsCardShown(players, "");
    }).toThrow(Error);
    expect(() => {
      updatePlayerIsCardShown(players, "");
    }).toThrow("Please provide a player id to update");
  });
});

describe("updatePlayerIsCardShown should throw an error if given an empty array", () => {
  test("Given an empty array, When the function runs, Then it should throw an error", () => {
    //Given
    const players: Player[] = [];
    //When
    //Then
    expect(() => {
      updatePlayerIsCardShown(players, "player-id");
    }).toThrow(Error);
    expect(() => {
      updatePlayerIsCardShown(players, "player-id");
    }).toThrow("Please provide an array of players to update");
  });
});

describe("updatePlayerIsCardShown should throw and error if provided a string that is not a valid player id in the array", () => {
  test("Given a string that is not a player id in the array and an array of players, When the function runs, Then it should throw an error", () => {
    //Given
    const cards: Card[] = [
      {
        id: 1,
        name: "some-card-name",
        imageUrl: "some-url",
        description: "some-description",
        type: "some-type",
        stats: [
          { name: "attack", value: 10 },
          { name: "defense", value: 10 },
          { name: "hp", value: 10 },
          { name: "weight", value: 10 },
          { name: "speed", value: 10 },
        ],
      },
    ];
    const player1 = {
      id: "player-1",
      name: "some-name",
      score: 0,
      cards: cards,
      isCardShown: false,
      isHuman: false,
    };
    const player2 = {
      id: "player-2",
      name: "some-name",
      score: 0,
      cards: cards,
      isCardShown: false,
      isHuman: false,
    };
    const players = [player1, player2];

    //When
    expect(() => {
      updatePlayerIsCardShown(players, "sadsadas");
    }).toThrow(Error);
    expect(() => {
      updatePlayerIsCardShown(players, "sadsadas");
    }).toThrow("ID does not match a Player ID in the array");
  });
});

describe("updatePlayerIsCardShownAll should update the isCardShown property for all players and return the updated players array", () => {
  test("Given an array of players and the value false, When the function runs, Then it should return the players with isCardShown on all players set to false", () => {
    //Given
    const cards: Card[] = [
      {
        id: 1,
        name: "some-card-name",
        imageUrl: "some-url",
        description: "some-description",
        type: "some-type",
        stats: [
          { name: "attack", value: 10 },
          { name: "defense", value: 10 },
          { name: "hp", value: 10 },
          { name: "weight", value: 10 },
          { name: "speed", value: 10 },
        ],
      },
    ];
    const player1a = {
      id: "player-1",
      name: "some-name",
      score: 0,
      cards: cards,
      isCardShown: true,
      isHuman: false,
    };
    const player2a = {
      id: "player-2",
      name: "some-name",
      score: 0,
      cards: cards,
      isCardShown: false,
      isHuman: false,
    };
    const player3a = {
      id: "player-2",
      name: "some-name",
      score: 0,
      cards: cards,
      isCardShown: true,
      isHuman: false,
    };

    const player1b = {
      id: "player-1",
      name: "some-name",
      score: 0,
      cards: cards,
      isCardShown: false,
      isHuman: false,
    };
    const player2b = {
      id: "player-2",
      name: "some-name",
      score: 0,
      cards: cards,
      isCardShown: false,
      isHuman: false,
    };
    const player3b = {
      id: "player-2",
      name: "some-name",
      score: 0,
      cards: cards,
      isCardShown: false,
      isHuman: false,
    };
    const players = [player1a, player2a, player3a];
    const newPlayers = [player1b, player2b, player3b];
    //When
    const updatedPlayers = updatePlayerIsCardShownAll(players, false);
    //Then
    expect(updatedPlayers).toEqual(newPlayers);
  });

  test("Given an array of players and the value true, When the function runs, Then it should return the players with isCardShown on all players set to true", () => {
    //Given
    const cards: Card[] = [
      {
        id: 1,
        name: "some-card-name",
        imageUrl: "some-url",
        description: "some-description",
        type: "some-type",
        stats: [
          { name: "attack", value: 10 },
          { name: "defense", value: 10 },
          { name: "hp", value: 10 },
          { name: "weight", value: 10 },
          { name: "speed", value: 10 },
        ],
      },
    ];
    const player1a = {
      id: "player-1",
      name: "some-name",
      score: 0,
      cards: cards,
      isCardShown: true,
      isHuman: false,
    };
    const player2a = {
      id: "player-2",
      name: "some-name",
      score: 0,
      cards: cards,
      isCardShown: false,
      isHuman: false,
    };
    const player3a = {
      id: "player-2",
      name: "some-name",
      score: 0,
      cards: cards,
      isCardShown: false,
      isHuman: false,
    };

    const player1b = {
      id: "player-1",
      name: "some-name",
      score: 0,
      cards: cards,
      isCardShown: true,
      isHuman: false,
    };
    const player2b = {
      id: "player-2",
      name: "some-name",
      score: 0,
      cards: cards,
      isCardShown: true,
      isHuman: false,
    };
    const player3b = {
      id: "player-2",
      name: "some-name",
      score: 0,
      cards: cards,
      isCardShown: true,
      isHuman: false,
    };
    const players = [player1a, player2a, player3a];
    const newPlayers = [player1b, player2b, player3b];
    //When
    const updatedPlayers = updatePlayerIsCardShownAll(players, true);
    //Then
    expect(updatedPlayers).toEqual(newPlayers);
  });
});

describe("updatePlayerIsCardShownAll should throw an error if given an empty array", () => {
  test("Given an empty array, When the function runs, Then it should throw an error", () => {
    //Given
    const players: Player[] = [];
    //When
    //Then
    expect(() => {
      updatePlayerIsCardShownAll(players, true);
    }).toThrow(Error);
    expect(() => {
      updatePlayerIsCardShownAll(players, true);
    }).toThrow("Please provide an array of players to update");
  });
});

describe("moveTopCardToBottom should move the first item in the array to last", () => {
  test("Given an array of cards, When the function runs, Then it should return the array with the first item moved to last", () => {
    //Given
    const cards: Card[] = [
      {
        id: 1,
        name: "some-card-name",
        imageUrl: "some-url",
        description: "some-description",
        type: "some-type",
        stats: [
          { name: "attack", value: 10 },
          { name: "defense", value: 10 },
          { name: "hp", value: 10 },
          { name: "weight", value: 10 },
          { name: "speed", value: 10 },
        ],
      },
      {
        id: 2,
        name: "some-card-name2",
        imageUrl: "some-url",
        description: "some-description",
        type: "some-type",
        stats: [
          { name: "attack", value: 10 },
          { name: "defense", value: 10 },
          { name: "hp", value: 10 },
          { name: "weight", value: 10 },
          { name: "speed", value: 10 },
        ],
      },
      {
        id: 3,
        name: "some-card-name3",
        imageUrl: "some-url",
        description: "some-description",
        type: "some-type",
        stats: [
          { name: "attack", value: 10 },
          { name: "defense", value: 10 },
          { name: "hp", value: 10 },
          { name: "weight", value: 10 },
          { name: "speed", value: 10 },
        ],
      },
    ];
    const reOrderedCards: Card[] = [
      {
        id: 2,
        name: "some-card-name2",
        imageUrl: "some-url",
        description: "some-description",
        type: "some-type",
        stats: [
          { name: "attack", value: 10 },
          { name: "defense", value: 10 },
          { name: "hp", value: 10 },
          { name: "weight", value: 10 },
          { name: "speed", value: 10 },
        ],
      },
      {
        id: 3,
        name: "some-card-name3",
        imageUrl: "some-url",
        description: "some-description",
        type: "some-type",
        stats: [
          { name: "attack", value: 10 },
          { name: "defense", value: 10 },
          { name: "hp", value: 10 },
          { name: "weight", value: 10 },
          { name: "speed", value: 10 },
        ],
      },
      {
        id: 1,
        name: "some-card-name",
        imageUrl: "some-url",
        description: "some-description",
        type: "some-type",
        stats: [
          { name: "attack", value: 10 },
          { name: "defense", value: 10 },
          { name: "hp", value: 10 },
          { name: "weight", value: 10 },
          { name: "speed", value: 10 },
        ],
      },
    ];
    //When
    const updatedCards = moveTopCardToBottom(cards);
    //Then
    expect(updatedCards).toEqual(reOrderedCards);
  });
});

describe("moveTopCardToBottom should throw an error if given an empty array", () => {
  test("Given an empty array, When the function runs, Then it should throw an error", () => {
    //Given
    const cards: Card[] = [];
    //When
    //Then
    expect(() => {
      moveTopCardToBottom(cards);
    }).toThrow(Error);
    expect(() => {
      moveTopCardToBottom(cards);
    }).toThrow("Please provide an array of cards to update");
  });
});

describe("nextPlayer functionality", () => {
  test("should get the next player in the round after the current player", () => {
    const player1a = {
      id: "player-1",
      name: "some-name",
      score: 0,
      cards: [],
      isCardShown: true,
      isHuman: false,
      isCardEnabled: false,
    };
    const player2a = {
      id: "player-2",
      name: "some-name",
      score: 0,
      cards: [],
      isCardShown: false,
      isHuman: false,
      isCardEnabled: false,
    };
    const player3a = {
      id: "player-2",
      name: "some-name",
      score: 0,
      cards: [],
      isCardShown: false,
      isHuman: false,
      isCardEnabled: false,
    };
    expect(getNextPlayer(player1a, [player1a, player2a, player3a])).toBe(
      player2a
    );
  });
});
