import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "./Button";

test("Given the required props, When the component is rendered, Then a button should be present", () => {
  const props = {
    text: "",
    onClick: () => {},
  };

  render(<Button {...props} />);

  const someButton = screen.getByRole("button");

  expect(someButton).toBeInTheDocument();
  expect(someButton).toHaveClass("btn");
});

test("Given a className prop, When the component is rendered, Then a button with the className should be present", () => {
  const props = {
    className: "test",
    text: "",
    onClick: () => {},
  };

  render(<Button {...props} />);

  const someButton = screen.getByRole("button");

  expect(someButton).toBeInTheDocument();
  expect(someButton).toHaveClass("btn");
  expect(someButton).toHaveClass(props.className);
});

test("Given the required props, When the component is rendered, Then a button should have the props text", () => {
  const props = {
    text: "test",
    onClick: () => {},
  };

  render(<Button {...props} />);

  const someButton = screen.getByRole("button");

  expect(someButton).toBeInTheDocument();
  expect(someButton).toHaveTextContent(props.text);
});

test("Given the component is rendered, When the button is clicked, Then the onClick function should be called", async () => {
  const user = userEvent.setup();

  const mockOnClick = vi.fn();

  const props = {
    text: "",
    onClick: mockOnClick,
  };

  render(<Button {...props} />);

  const someButton = screen.getByRole("button");

  await user.click(someButton);

  expect(someButton).toBeInTheDocument();
  expect(mockOnClick).toBeCalledTimes(1);
});
