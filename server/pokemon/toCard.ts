import { Card, STAT_NAME } from "../card/card.types";
import { PokemonDto } from "./pokemon.types";

function toCard(dto: PokemonDto) {
  const stats = STAT_NAME.map((statName, index) => {
    const value =
      statName in dto
        ? // @ts-ignore
          Number(dto[statName])
        : dto.stats.find((s) => s.stat.name === statName)?.base_stat;

    return {
      name: statName,
      value,
    };
  });

  const type = dto.types
    .sort((a, b) => a.slot - b.slot)
    .map((t) => t.type.name)
    .join(",");

  return {
    id: dto.id,
    name: dto.name,
    imageUrl: dto.sprites.other["official-artwork"].front_shiny,
    description: "",
    type,
    stats,
  } as Card;
}

export { toCard };
