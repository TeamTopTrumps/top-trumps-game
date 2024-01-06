import validatePlayerName from "./validate_player_name";

describe("validatePlayerName should return an error message if passed an empty string", () => {
  test("Given an empty string, When the function is called, Then it should return an array with a single error message", () => {
    expect(validatePlayerName("")).toEqual(["Please provide a player name"]);
  });
});

describe("validatePlayerName should return an error message if passed a string containing invalid characters", () => {
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
});

describe("validatePlayerName should return an error message if passed a string containing only spaces", () => {
  test("Given a string containing only spaces, When the function is called, Then it should return an array with a single error message", () => {
    expect(validatePlayerName(" ")).toEqual(["Please provide a player name"]);
    expect(validatePlayerName("    ")).toEqual([
      "Please provide a player name",
    ]);
  });
});

describe("validatePlayerName should return an empty array if passed a string containing only valid characters", () => {
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
});
