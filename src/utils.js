import { Howl } from "howler";

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

export const soundPlay = (src, loop, volume) => {
  const sound = new Howl({ src, html5: true, loop: loop, volume: volume });
  sound.play();
};

export const determineWinner = (userScores, lastPlayer, audioClips) => {
  if (!lastPlayer) return ""; // skip all code if it's Not last player

  soundPlay(audioClips[1].sound); // play victory sound

  let winnerScore = userScores[0];
  let winner = 1;
  for (let i = 1; i < userScores.length; i++) {
    if (userScores[i] > winnerScore) {
      winnerScore = userScores[i];
      winner = i + 1;
    }
  }

  return `The winner is Player ${winner}.`;
};
