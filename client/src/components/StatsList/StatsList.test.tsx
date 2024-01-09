import { render, screen } from "@testing-library/react";
import { StatsList } from "./StatsList";
import { Stat } from "../../types/card/card.types";

describe("Stats List Component", () => {
  const mockStatsList: Stat[] = [
    { name: "attack", value: 80 },
    { name: "defense", value: 120 },
    { name: "speed", value: 1760 },
  ];
  const playerId = "234";
  const handleStatChosen = () => {};
  const isEnabled = true;
  test("components renders without fail", () => {
    render(
      <StatsList
        stats={mockStatsList}
        playerId={playerId}
        handleStatChosen={handleStatChosen}
        isEnabled={isEnabled}
      />
    );
    expect(screen.getByTestId("stats-list")).toBeInTheDocument();
  });

  test("component renders with non-empty stats", () => {
    render(
      <StatsList
        stats={mockStatsList}
        playerId={playerId}
        handleStatChosen={handleStatChosen}
        isEnabled={isEnabled}
      />
    );
    const statsList = screen.getAllByTestId("stats-list");
    expect(statsList[0]).toBeInTheDocument();
  });
});
