import { Card } from "../card/card.types";
import { PokemonDto, STAT_NAMES } from "./pokemon.types";

function toCard(dto: PokemonDto) {
  const stats = STAT_NAMES.map((statName, index) => {
    const value = dto.hasOwnProperty(statName)
      ? dto[statName]
      : dto.stats.find((s) => s.stat.name === statName)?.base_stat;

    return {
      position: index,
      name: statName,
      value,
    };
  });

  const type = dto.types
    .sort((a, b) => a.slot - b.slot)
    .map((t) => t.type.name)
    .join(", ");

  console.log("dto.types: ", dto.types);
  console.log("type: ", type);

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
