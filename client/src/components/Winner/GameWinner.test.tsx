import { render, screen } from "@testing-library/react";
import GameWinner from "./GameWinner";

test("Displays winning message if one winner", () => {
  const player = {
    id: `player2`,
    name: `Player 2`,
    score: 3,
    cards: [],
    isCardShown: false,
    isHuman: false,
  };
  const props = {
    players: [player],
  };
  render(<GameWinner {...props} />);

  const winningMessage = screen.getByText(
    "Congratulations Player 2! You caught them all!"
  );

  expect(winningMessage).toBeInTheDocument();
});

test("Displays no winning message if no players sent to the component", () => {
  const props = {
    players: [],
  };
  render(<GameWinner {...props} />);
  expect(screen.queryByText("Congratulations")).not.toBeInTheDocument();
  expect(screen.queryByText("You caught them all!")).not.toBeInTheDocument();
});
