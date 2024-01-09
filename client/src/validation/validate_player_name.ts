const validatePlayerName = (value: string) => {
  const errorMessages: string[] = [];

  if (value.length === 0) {
    errorMessages.push("Please provide a player name");
  } else if (value.length > 15) {
    errorMessages.push("Name cannot be more than 15 characters");
  }

  const firstChar = value.slice(0, 1);
  const lastChar = value.slice(-1);

  if (firstChar.match(/\s/) && !lastChar.match(/\s/)) {
    errorMessages.push("Name cannot start with a space");
  } else if (!firstChar.match(/\s/) && lastChar.match(/\s/)) {
    errorMessages.push("Name cannot end with a space");
  } else if (firstChar.match(/\s/) && lastChar.match(/\s/)) {
    errorMessages.push("Name cannot start or end with a space");
  }

  if (value.match(/[^A-Za-z0-9 ]/)) {
    errorMessages.push("Name cannot contain special characters");
  }

  return errorMessages;
};

export default validatePlayerName;
