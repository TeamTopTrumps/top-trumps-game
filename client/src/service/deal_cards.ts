function dealCards(players: number, rounds: number, pack: number[] = []) {
  if (players < 1) {
    // no players, no hands
    return [];
  }

  const cardsRequired = Math.max(0, players * rounds);

  const hands = Array.from({ length: players }).map((_) => []) as number[][];

  if (cardsRequired > pack.length) {
    // Not enough cards in pack for all players - return empty hands
    return hands;
  }

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
