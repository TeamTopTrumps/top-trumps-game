import { render, screen } from "@testing-library/react";
import { PokemonCard } from "./PokemonCard";
import { Card } from "../../types/card/card.types";

describe("PokemonCard Component", () => {
  const mockPokemon: Card = {
    id: 1,
    name: "Pikachu",
    imageUrl: "pikachu.jpg",
    description: "Electric type Pokemon",
    type: "Electric",
    stats: [
      { name: "attack", value: 80 },
      /*{ name: "defence", value: 120 },
      { name: "speed", value: 1760 },
      { name: "weight", value: 76 },
      { name: "hp", value: 10 },*/
    ],
  };
  const mockProps = {
    pokemon: mockPokemon,
    isShown: false,
    playerId: "23",
    handleStatChosen: () => {},
    isEnabled: true,
  };

  it("component renders without fail", () => {
    render(<PokemonCard {...mockProps} />);
  });

  it("renders PokemonCard component with Pokemon name", () => {
    const { getByText } = render(<PokemonCard {...mockProps} />);
    const pokemonName = getByText("Pikachu");
    expect(pokemonName).toBeInTheDocument();
  });

  it("renders the component with attribute value passed", () => {
    render(<PokemonCard {...mockProps} />);
    const imageElement = screen.getByAltText("Image for Pikachu");
    expect(imageElement).toBeInTheDocument();
  });
});
