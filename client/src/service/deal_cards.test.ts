import { describe, expect, test } from "vitest";
import { dealCards } from "./deal_cards";

describe("dealCards", () => {
  test("-ve players, no hands", () => {
    expect(dealCards(-1, 2, [1, 2])).toEqual([]);
  });

  test("no players, no hands", () => {
    expect(dealCards(0, 2, [1, 2])).toEqual([]);
  });

  test("-ve rounds, empty hands", () => {
    expect(dealCards(2, -2, [1, 2, 3, 4])).toEqual([[], []]);
  });

  test("no rounds, empty hands", () => {
    expect(dealCards(1, 0, [1, 2, 3])).toEqual([[]]);
  });

  test("not enough cards, empty hands", () => {
    expect(dealCards(2, 2, [1, 2, 3])).toEqual([[], []]);
  });

  test("2 players, 3 rounds, gets 2 hands of 3 cards", () => {
    const hands = dealCards(2, 3, [1, 2, 3, 4, 5, 6]);

    expect(hands.length).toBe(2);
    expect(hands[0].length).toBe(3);
    expect(hands[1].length).toBe(3);
  });

  test("all cards used, never repeated", () => {
    const hands = dealCards(
      3,
      5,
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
    );

    const deduped = new Set(hands.flat());

    expect(deduped.size).toBe(15);
  });
});
