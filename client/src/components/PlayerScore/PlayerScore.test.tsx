import { render, screen } from "@testing-library/react";
import PlayerScore from "./PlayerScore";

test("Given the required props, When the component renders, Then the first element should have the correct className.", () => {
  const props = {
    playerName: "",
    playerId: "",
    updateName: () => {},
    playerScore: 0,
    currentRound: 1,
    totalRounds: 5,
    roundWinners: [],
  };
  const { container } = render(<PlayerScore {...props} />);

  expect(container.firstChild).toHaveClass("player-score");
});

test("Given the required props, When the component renders, Then the playerScore should be present", () => {
  const props = {
    playerName: "",
    playerId: "",
    updateName: () => {},
    playerScore: 0,
    currentRound: 1,
    totalRounds: 5,
    roundWinners: [],
  };
  render(<PlayerScore {...props} />);

  const someNumberText = screen.getByText(props.playerScore);

  expect(someNumberText).toBeInTheDocument();
  expect(someNumberText).toHaveClass("player-score__total");
});
