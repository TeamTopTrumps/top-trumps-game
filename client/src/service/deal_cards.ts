function dealCards(players: number, rounds: number, pack: number[] = []) {
  if (players < 1 || rounds < 0) {
    // no players or -ve rounds, no hands
    return [];
  }

  const cardsRequired = players * rounds;

  if (cardsRequired > pack.length) {
    // Not enough cards in pack for all players - no hands
    return [];
  }

  const hands = Array.from({ length: players }).map(() => []) as number[][];

  const shuffled = new Set<number>();

  while (shuffled.size < cardsRequired) {
    const random = Math.floor(Math.random() * pack.length);

    shuffled.add(pack[random]);
  }

  return Array.from(shuffled).reduce((acc, id, i) => {
    acc[i % players].push(id);
    return acc;
  }, hands);
}

export { dealCards };
