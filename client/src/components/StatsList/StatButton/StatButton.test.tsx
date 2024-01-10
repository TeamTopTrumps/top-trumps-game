import { render, screen } from "@testing-library/react";
import { Stat } from "../../../types/card/card.types";
import { StatButton } from "./StatButton";

describe("Stats List Component", () => {
  const mockStat: Stat = { name: "attack", value: 80 };
  const handleStatChosen = () => {};
  const isEnabled = false;
  test("components renders without fail", () => {
    render(
      <StatButton
        stat={mockStat}
        handleStatChosen={handleStatChosen}
        isEnabled={isEnabled}
      />
    );
  });
  test("Renders with button element", () => {
    render(
      <StatButton
        stat={mockStat}
        handleStatChosen={handleStatChosen}
        isEnabled={isEnabled}
      />
    );
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toBeInTheDocument();
  });
  test("render stats with correct value", () => {
    render(
      <StatButton
        stat={mockStat}
        handleStatChosen={handleStatChosen}
        isEnabled={isEnabled}
      />
    );
    const statButtonElement = screen.getByTestId("stat-button");
    expect(statButtonElement).toHaveTextContent(mockStat.value.toString());
    expect(statButtonElement).toHaveTextContent(mockStat.name);
  });
});
