export const rollDice = () => {
  // Generate a random number between 1 and 6, both inclusive
  let diceNumber = Math.floor(Math.random() * 6) + 1;
  return diceNumber;
};

export const nextPlayer = (currentPlayer, largestPlayerNum) => {
  let next = currentPlayer + 1;
  if (next > largestPlayerNum) {
    next = next - largestPlayerNum;
  }
  return next;
};

export const nextRound = (currentRound, currentPlayer) => {
  return currentPlayer === 1 ? currentRound + 1 : currentRound;
};

export const isLastPlayer = (
  currentRound,
  currentPlayer,
  largestRoundNum,
  largestPlayerNum,
  userOrderDice
) =>
  userOrderDice &&
  currentPlayer === largestPlayerNum &&
  currentRound === largestRoundNum;
