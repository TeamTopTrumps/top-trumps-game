import validatePlayerName from "./validate_player_name";

test("Given an empty string, When the function is called, Then it should return an array with a single error message", () => {
  expect(validatePlayerName("")).toEqual(["Please provide a player name"]);
});

test("Given a string containing a character other than alphanumeric or space, When the function is called, Then it should return an array with a single error message", () => {
  const specialChars = "~!@#$%^&*()-_=+[]\\{}|;':\",./<>?";

  specialChars
    .split("")
    .forEach((char) =>
      expect(validatePlayerName(`Player ${char} 1`)).toEqual([
        "Names cannot contain special characters",
      ])
    );
});

test("Given a string containing only spaces, When the function is called, Then it should return an array with a single error message", () => {
  expect(validatePlayerName(" ")).toEqual(["Please provide a player name"]);
  expect(validatePlayerName("    ")).toEqual(["Please provide a player name"]);
});

test("Given a string containing only alphanumeric characters or space, When the function is called, Then it should return an empty array", () => {
  expect(validatePlayerName("Player 1")).toEqual([]);
  expect(validatePlayerName("Becca R")).toEqual([]);
  expect(validatePlayerName("55")).toEqual([]);
});

test("Given a string containing alphanumeric characters surrounded by spaces, When the function is called, Then it should return an empty array", () => {
  expect(validatePlayerName(" hello ")).toEqual([]);
  expect(validatePlayerName("hello  ")).toEqual([]);
  expect(validatePlayerName("    hello")).toEqual([]);
});
