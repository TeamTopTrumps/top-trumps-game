import { render, screen } from "@testing-library/react";
import TextInput from "./TextInput";
import userEvent from "@testing-library/user-event";

test("Given the required props, When the component is rendered, Then there should be an input element", () => {
  const props = {
    label: "",
    name: "",
    id: "",
    value: "",
    onChange: () => {},
  };

  render(<TextInput {...props} />);

  const someTextInput = screen.getByRole("textbox");

  expect(someTextInput).toBeInTheDocument();
  expect(someTextInput.tagName).toBe("INPUT");
  expect(someTextInput.getAttribute("type")).toBe("text");
});

test("Given the required props, When the component is rendered, Then there should be a label element", () => {
  const props = {
    label: "",
    name: "",
    id: "",
    value: "",
    onChange: () => {},
  };

  const { container } = render(<TextInput {...props} />);

  expect(container.firstChild?.nodeName === "LABEL").toBe(true);
});

test("Given the required props, When the component is rendered, Then the input element should be within a label element", () => {
  const props = {
    label: "",
    name: "",
    id: "",
    value: "",
    onChange: () => {},
  };

  const { container } = render(<TextInput {...props} />);

  const label = container.firstChild;
  const someTextInput = screen.getByRole("textbox");
  const containsInput = label?.contains(someTextInput);

  expect(containsInput).toBeTruthy();
});

test("Given the required props, When the component is rendered, Then the label text should be present", () => {
  const props = {
    label: "Some label",
    name: "",
    id: "",
    value: "",
    onChange: () => {},
  };

  render(<TextInput {...props} />);

  const someLabelText = screen.getByLabelText(`${props.label}:`);
  expect(someLabelText).toBeInTheDocument();
});

test("Given an isHiddenLabel prop of true and Label prop text, When the component is rendered, Then the text element should have the correct className", () => {
  const props = {
    label: "Some label",
    isHiddenLabel: true,
    name: "",
    id: "",
    value: "",
    onChange: () => {},
  };

  render(<TextInput {...props} />);

  const someText = screen.getByText(`${props.label}:`);
  expect(someText).toBeInTheDocument();
  expect(someText).toHaveClass("visually-hidden");
});

test("Given the required props, When the component is rendered, Then the input value should be present", () => {
  const props = {
    label: "",
    name: "",
    id: "",
    value: "test",
    onChange: () => {},
  };

  render(<TextInput {...props} />);

  const someTextInput = screen.getByRole("textbox");
  expect(someTextInput).toHaveValue(props.value);
});

test("Given the component is rendered, When the user types in the input, Then the onChange function is called", async () => {
  const user = userEvent.setup();

  const mockOnChange = vi.fn();

  const props = {
    label: "",
    name: "",
    id: "",
    value: "",
    onChange: mockOnChange,
  };

  render(<TextInput {...props} />);

  const someTextInput = screen.getByRole("textbox");

  await user.type(someTextInput, "test");

  expect(mockOnChange).toBeCalled();
  expect(mockOnChange).toBeCalledTimes(4);
});

test("Given a className prop, When the component renders, Then className should be present", () => {
  const props = {
    className: "test-classname",
    label: "",
    name: "",
    id: "",
    value: "test",
    onChange: () => {},
  };

  const { container } = render(<TextInput {...props} />);

  expect(container.firstChild).toHaveClass(props.className);
});

test("Given the required props, When the component is rendered and there is an error, Then the validate function should be called and the error message should be present", async () => {
  const errorMessages = ["Error message"];

  const mockValidate = vi.fn();
  mockValidate.mockReturnValue(errorMessages);

  const props = {
    label: "",
    name: "",
    id: "",
    value: "test",
    onChange: () => {},
    validate: mockValidate,
  };

  render(<TextInput {...props} />);

  const errorMessage = screen.getByText(errorMessages[0]);

  expect(mockValidate).toBeCalled();
  expect(errorMessage).toBeInTheDocument();
});

test("Given the required props, When the component is rendered and there are multiple errors, Then the validate function should be called and all the error messages should be present", async () => {
  const errorMessages = ["Error message 1", "Error message 2"];

  const mockValidate = vi.fn();
  mockValidate.mockReturnValue(errorMessages);

  const props = {
    label: "",
    name: "",
    id: "",
    value: "",
    onChange: () => {},
    validate: mockValidate,
  };

  render(<TextInput {...props} />);

  const errorMessage1 = screen.getByText(errorMessages[0]);
  const errorMessage2 = screen.getByText(errorMessages[1]);

  expect(mockValidate).toBeCalled();
  expect(errorMessage1).toBeInTheDocument();
  expect(errorMessage2).toBeInTheDocument();
});
