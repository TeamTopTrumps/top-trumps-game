import { fireEvent, render, screen } from "@testing-library/react";
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
    isFlipped: false,
    playerId: "23",
    playRound: () => {},
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

  it("checking for the conditional rendering of PokemonCard component", () => {
    render(<PokemonCard {...mockProps} />);
    const nameElement = screen.getByText("Pikachu");
    const imageElement = screen.getByAltText("Image for Pikachu");
    const descriptionElement = screen.queryByText("Electric type Pokemon");
    const typeElement = screen.queryByText("Electric");
    expect(nameElement).toBeInTheDocument();
    expect(imageElement).toBeInTheDocument();
    expect(descriptionElement).not.toBeInTheDocument();
    expect(typeElement).not.toBeInTheDocument();
  });
});
