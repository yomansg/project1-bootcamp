export const PlayForm = ({
  diceOrder,
  handleChange,
  handleContinue,
  resetGame,
  isLastPlayer,
}) => {
  return (
    <form>
      <p>
        <label>{"Dice Order:  "}</label>
        <input
          name="diceOrder"
          type="number"
          min="1"
          max="2"
          value={diceOrder}
          onChange={handleChange}
        />
      </p>
      <p>
        <button id="button" onClick={handleContinue} disabled={isLastPlayer}>
          Continue
        </button>
        <button id="button" onClick={resetGame}>
          Reset
        </button>
      </p>
    </form>
  );
};
