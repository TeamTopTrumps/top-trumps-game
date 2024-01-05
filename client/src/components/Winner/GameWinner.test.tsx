import { render, screen } from "@testing-library/react";
import GameWinner from "./GameWinner";

test("Given the required props, When the component renders, the winning message should be present", () => {
  const player = {
    id: `player2`,
    name: `Player 2`,
    score: 3,
    cards: [],
  };
  const props = {
    player: player,
  };
  render(<GameWinner {...props} />);

  const winningMessage = screen.getByText(
    "Congratulations Player 2! You caught them all!"
  );

  expect(winningMessage).toBeInTheDocument();
});

test("Given the required props, When the component renders and there are no errorMessages, Then no error should be present", () => {
  const props = {
    player: null,
  };
  render(<GameWinner {...props} />);
  expect(screen.queryByText("Congratulations")).not.toBeInTheDocument();
  expect(screen.queryByText("You caught them all!")).not.toBeInTheDocument();
});
