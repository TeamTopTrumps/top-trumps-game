const validatePlayerName = (value: string) => {
  const errorMessages: string[] = [];

  if (value.length === 0) {
    errorMessages.push("Please provide a player name");
  } else if (value.match(/[^A-Za-z0-9 ]/)) {
    errorMessages.push("Names cannot contain special characters");
  }

  return errorMessages;
};

export default validatePlayerName;
