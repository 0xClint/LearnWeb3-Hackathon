export function isValidJSON(str) {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
}

export const blockchainList = [
  { chain: "Arbitrum", id: 1 },
  { chain: "Ethereum", id: 2 },
  { chain: "Binance Smart Chain", id: 3 },
  { chain: "Polygon", id: 4 },
  { chain: "Avalanche", id: 5 },
  { chain: "Fantom", id: 6 },
  { chain: "Huobi ECO Chain", id: 7 },
  { chain: "Harmony", id: 8 },
  { chain: "xDai Chain", id: 9 },
  { chain: "Celo", id: 10 },
  { chain: "Moonbeam", id: 11 },
  { chain: "Klaytn", id: 12 },
  { chain: "OKExChain", id: 13 },
  { chain: "Energy Web Chain", id: 14 },
  { chain: "Fuse Network", id: 15 },
  { chain: "Fantom Opera", id: 16 },
  { chain: "Palm", id: 17 },
  { chain: "Hubble Protocol", id: 18 },
  { chain: "Etherlite", id: 19 },
  { chain: "TomoChain", id: 20 },
  { chain: "Ethereum Classic", id: 21 },
  { chain: "Metis", id: 22 },
  { chain: "Reef Chain", id: 23 },
  { chain: "Optimism", id: 24 },
  { chain: "Binance Chain", id: 25 },
];

export function random() {
  return Math.floor(Math.random() * 10000000);
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
