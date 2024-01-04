import { render, screen } from "@testing-library/react";

import App from "./App";

describe("App", () => {
  it("test App component", () => {
    render(<App />);

    screen.debug();
  });
});
