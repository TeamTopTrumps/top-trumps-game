import { render, screen } from "@testing-library/react";
import ErrorMessage from "./ErrorMessage";

test("Given the required props, When the component renders, Then an error should be present", () => {
  const props = {
    messages: ["here is an error"],
  };
  render(<ErrorMessage {...props} />);

  const errorMessage = screen.getByText(props.messages[0]);

  expect(errorMessage).toHaveClass("error");
  expect(errorMessage).toBeInTheDocument();
});

test("Given the required props, When the component renders and there are no errorMessages, Then no error should be present", () => {
  const props = {
    messages: [],
  };

  const { container } = render(<ErrorMessage {...props} />);

  expect(container.firstChild).not.toBeInTheDocument();
});

test("Given the required props, When the component renders, Then error should be present for each message", () => {
  const props = {
    messages: [
      "here is an error",
      "here is another error",
      "what if there's a third error?!",
    ],
  };

  render(<ErrorMessage {...props} />);

  const errorMessage1 = screen.getByText(props.messages[0]);
  const errorMessage2 = screen.getByText(props.messages[1]);
  const errorMessage3 = screen.getByText(props.messages[2]);

  expect(errorMessage1).toBeInTheDocument();
  expect(errorMessage2).toBeInTheDocument();
  expect(errorMessage3).toBeInTheDocument();
});

test("Given a className prop, When the component renders, Then className should be present", () => {
  const props = {
    className: "classname-test",
    messages: ["here is an error"],
  };

  render(<ErrorMessage {...props} />);

  const errorMessage = screen.getByText(props.messages[0]);

  expect(errorMessage).toHaveClass(props.className);
});
