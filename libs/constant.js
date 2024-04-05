export function isValidJSON(str) {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
}

export function getRandomLetter() {
  // Generate a random number between 0 and 25 (inclusive)
  const randomNumber = Math.floor(Math.random() * 26);

  // Convert the random number to its corresponding ASCII code for lowercase letters ('a' to 'z')
  const randomCharCode = 97 + randomNumber;

  // Convert the ASCII code to its corresponding letter
  const randomLetter = String.fromCharCode(randomCharCode);

  return randomLetter;
}
