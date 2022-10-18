export const Instruction = ({ userRollDice }) => {
  if (userRollDice) {
    return (
      <img
        src="https://www.animatedimages.org/data/media/710/animated-dice-image-0085.gif"
        border="0"
        alt="animated-dice-image-0085"
        className="animated-gif"
      />
    );
  } else {
    return <p>Click [Continue] button...</p>;
  }
};
