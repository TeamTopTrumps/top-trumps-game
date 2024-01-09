import { render, screen } from "@testing-library/react";
import PlayerScore from "./PlayerScore";

test("Given the required props, When the component renders, Then the first element should have the correct className.", () => {
  const props = {
    name: "",
    id: "",
    updateName: () => {},
    score: 0,
    currentRound: 1,
    totalRounds: 5,
    roundWinners: [],
    validateName: () => [],
  };
  const { container } = render(<PlayerScore {...props} />);

  expect(container.firstChild).toHaveClass("player-score");
});

test("Given the required props, When the component renders, Then the playerScore should be present", () => {
  const props = {
    name: "",
    id: "",
    updateName: () => {},
    score: 0,
    currentRound: 1,
    totalRounds: 5,
    roundWinners: [],
    validateName: () => [],
  };
  render(<PlayerScore {...props} />);

  const someNumberText = screen.getByText(props.score);

  expect(someNumberText).toBeInTheDocument();
  expect(someNumberText).toHaveClass("player-score__total");
});
