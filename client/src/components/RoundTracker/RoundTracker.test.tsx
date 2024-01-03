import { render, screen } from "@testing-library/react";
import RoundTracker from "./RoundTracker";

test("Given the required props, When the component renders, Then a list should be present", () => {
  const props = {
    currentRound: 1,
    rounds: [],
  };
  render(<RoundTracker {...props} />);

  const someListItem = screen.getByRole("list");

  expect(someListItem).toHaveClass("player-score__round-list");
  expect(someListItem).toBeInTheDocument();
});

test("Given the required props, When the component renders, Then a the first element should have the correct className", () => {
  const props = {
    currentRound: 1,
    rounds: [],
  };
  const { container } = render(<RoundTracker {...props} />);

  expect(container.firstChild).toHaveClass("player-score__round-tracker");
});

test("Given the required props, When the component renders, Then the text should be present", () => {
  const props = {
    currentRound: 1,
    rounds: [],
  };
  render(<RoundTracker {...props} />);

  const someText = screen.getByText("Rounds:");

  expect(someText).toHaveClass("player-score__round-tracker");
  expect(someText).toBeInTheDocument();
});
