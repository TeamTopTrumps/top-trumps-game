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
          "Name cannot contain special characters",
        ])
      );
  });
});

describe("validatePlayerName should return an error message if passed a string that is containing only whitespace", () => {
  test("Given a string containing only spaces, When the function is called, Then it should return a single error message", () => {
    expect(validatePlayerName(" ")).toEqual([
      "Name cannot start or end with a space",
    ]);
    expect(validatePlayerName("    ")).toEqual([
      "Name cannot start or end with a space",
    ]);
    expect(validatePlayerName(" ")).toEqual([
      "Name cannot start or end with a space",
    ]);
  });
});

describe("validatePlayerName should return an error message if passed a valid string that is surrounded by whitespace", () => {
  test("Given a string containing alphanumeric characters surrounded by spaces, When the function is called, Then it should return an array with a single error", () => {
    expect(validatePlayerName(" hello ")).toEqual([
      "Name cannot start or end with a space",
    ]);
  });
});

describe("validatePlayerName should return an error message if passed a string that starts with a whitespace character", () => {
  test("Given a string that starts with a whitespace character, When the function is called, Then it should return an array with a single error message", () => {
    expect(validatePlayerName(" player 1")).toEqual([
      "Name cannot start with a space",
    ]);
    expect(validatePlayerName("    player 1")).toEqual([
      "Name cannot start with a space",
    ]);
    expect(validatePlayerName(" player 1")).toEqual([
      "Name cannot start with a space",
    ]);
  });
});

describe("validatePlayerName should return an error message if passed a string that ends with a whitespace character", () => {
  test("Given a string that ends with a whitespace character, When the function is called, Then it should return an array with a single error message", () => {
    expect(validatePlayerName("player 1 ")).toEqual([
      "Name cannot end with a space",
    ]);
    expect(validatePlayerName("player 1     ")).toEqual([
      "Name cannot end with a space",
    ]);
    expect(validatePlayerName("player 1 ")).toEqual([
      "Name cannot end with a space",
    ]);
  });
});

describe("validatePlayerName should return error messages if passed a invalid string that is surrounded by whitespace", () => {
  test("Given a string containing special characters surrounded by whitesapce characters, When the function is called, Then it should return an array with two errors", () => {
    expect(validatePlayerName(" @hello ")).toEqual([
      "Name cannot start or end with a space",
      "Name cannot contain special characters",
    ]);
    expect(validatePlayerName("hello, world ")).toEqual([
      "Name cannot end with a space",
      "Name cannot contain special characters",
    ]);
    expect(validatePlayerName(" hello, world")).toEqual([
      "Name cannot start with a space",
      "Name cannot contain special characters",
    ]);
  });
});

describe("validatePlayerName should return error messages if passed a invalid string that is surrounded by whitespace and is longer than 15 characters", () => {
  test("Given a string longer than 15 characters, containing special characters surrounded by whitespace characters, When the function is called, Then it should return an array with three errors", () => {
    expect(validatePlayerName(" helloworld@someemail.com ")).toEqual([
      "Name cannot be more than 15 characters",
      "Name cannot start or end with a space",
      "Name cannot contain special characters",
    ]);
    expect(validatePlayerName("helloworld@someemail.com ")).toEqual([
      "Name cannot be more than 15 characters",
      "Name cannot end with a space",
      "Name cannot contain special characters",
    ]);
    expect(validatePlayerName(" helloworld@someemail.com")).toEqual([
      "Name cannot be more than 15 characters",
      "Name cannot start with a space",
      "Name cannot contain special characters",
    ]);
  });
});

describe("validatePlayerName should return an error message if passed a string that is longer than 15 characters", () => {
  test("Given a string that's longer than fifteen characters, When the function is called, Then it should return an array with an error message", () => {
    expect(validatePlayerName("Hello my name is long")).toEqual([
      "Name cannot be more than 15 characters",
    ]);
  });
});

describe("validatePlayerName should not return an error message if passed a string that is exactly 15 characters", () => {
  test("Given a valid string that's fifteen characters long, When the function is called, Then it should return an array without an error message", () => {
    expect(validatePlayerName("Hello mackerels")).toEqual([]);
  });
});

describe("validatePlayerName should return an empty array if passed a string containing only valid characters", () => {
  test("Given a string containing only alphanumeric characters or space, When the function is called, Then it should return an empty array", () => {
    expect(validatePlayerName("Player 1")).toEqual([]);
    expect(validatePlayerName("Becca R")).toEqual([]);
    expect(validatePlayerName("55")).toEqual([]);
  });
});
