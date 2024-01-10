import { render, screen } from "@testing-library/react";
import GameWinner from "./GameWinner";

test("Displays winning message if one winner", () => {
  const player = {
    id: `player2`,
    name: `Player 2`,
    score: 3,
    cards: [],
    isCardShown: false,
    isCardEnabled: false,
    isHuman: false,
  };
  const props = {
    players: [player],
  };
  render(<GameWinner {...props} />);

  const winningMessage1 = screen.getByText("Congratulations Player 2!");
  const winningMessage2 = screen.getByText("You caught them all!");

  expect(winningMessage1).toBeInTheDocument();
  expect(winningMessage2).toBeInTheDocument();
});

test("Displays no winning message if no players sent to the component", () => {
  const props = {
    players: [],
  };
  render(<GameWinner {...props} />);
  expect(screen.queryByText("Congratulations")).not.toBeInTheDocument();
  expect(screen.queryByText("You caught them all!")).not.toBeInTheDocument();
});

test("Displays draw message if more than 1 player is sent to the component", () => {
  const player1 = {
    id: `player1`,
    name: `Alice`,
    score: 3,
    cards: [],
    isCardShown: false,
    isCardEnabled: false,
    isHuman: false,
  };

  const player2 = {
    id: `player2`,
    name: `Bob`,
    score: 3,
    cards: [],
    isCardShown: false,
    isCardEnabled: false,
    isHuman: false,
  };

  const player3 = {
    id: `player3`,
    name: `Caroline`,
    score: 3,
    cards: [],
    isCardShown: false,
    isCardEnabled: false,
    isHuman: false,
  };

  const props = {
    players: [player1, player2, player3],
  };
  render(<GameWinner {...props} />);
  expect(screen.getByTestId("players-drawn1").textContent).toBe(
    "Alice, Bob, Caroline have drawn!"
  );
  expect(screen.getByTestId("players-drawn2").textContent).toBe(
    "Have another game to catch them all!"
  );
});
