import { render, screen } from "@testing-library/react";
import RoundTrackerPip from "./RoundTrackerPip";
import { RoundState } from "../RoundTracker.types";

test("Given the required props, When the component renders, Then a listitem should be present", () => {
  const props = {
    isCurrentRound: true,
    roundState: "won" as RoundState,
  };
  render(<RoundTrackerPip {...props} />);

  const someListItem = screen.getByRole("listitem");

  expect(someListItem).toHaveClass("round-pip");
  expect(someListItem).toBeInTheDocument();
});

test("Given a winning roundState prop, When the component renders, Then a listitem with the correct className should be present", () => {
  const props = {
    isCurrentRound: true,
    roundState: "won" as RoundState,
  };
  render(<RoundTrackerPip {...props} />);

  const someListItem = screen.getByRole("listitem");

  expect(someListItem).toHaveClass(`round-pip--${props.roundState}`);
});

test("Given a losing roundState prop, When the component renders, Then a listitem with the correct className should be present", () => {
  const props = {
    isCurrentRound: true,
    roundState: "lost" as RoundState,
  };
  render(<RoundTrackerPip {...props} />);

  const someListItem = screen.getByRole("listitem");

  expect(someListItem).toHaveClass(`round-pip--${props.roundState}`);
});

test("Given an unresolved roundState prop, When the component renders, Then a listitem with the correct className should be present", () => {
  const props = {
    isCurrentRound: true,
    roundState: "unresolved" as RoundState,
  };
  render(<RoundTrackerPip {...props} />);

  const someListItem = screen.getByRole("listitem");

  expect(someListItem).toHaveClass(`round-pip--${props.roundState}`);
});

test("Given a true isCurrentRound prop, When the component renders, Then a listitem with the correct className should be present", () => {
  const props = {
    isCurrentRound: true,
    roundState: "unresolved" as RoundState,
  };
  render(<RoundTrackerPip {...props} />);

  const someListItem = screen.getByRole("listitem");

  expect(someListItem).toHaveClass(`round-pip--current`);
});

test("Given a false isCurrentRound prop, When the component renders, Then a listitem with the correct className should be present", () => {
  const props = {
    isCurrentRound: false,
    roundState: "unresolved" as RoundState,
  };
  render(<RoundTrackerPip {...props} />);

  const someListItem = screen.getByRole("listitem");

  expect(someListItem).not.toHaveClass(`round-pip--current`);
});
