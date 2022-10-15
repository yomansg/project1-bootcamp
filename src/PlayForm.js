export const PlayForm = ({
  diceOrder,
  handleChange,
  handleContinue,
  resetGame,
  isLastPlayer,
}) => {
  return (
    <form>
      <div class="inputBoxes">
        <span class="labelClass"> Dice Order: </span>
        <input
          name="diceOrder"
          type="number"
          min="1"
          max="2"
          value={diceOrder}
          onChange={handleChange}
        />
      </div>
      <div>
        <button class="button" onClick={handleContinue} disabled={isLastPlayer}>
          Continue
        </button>
        <button class="button" onClick={resetGame}>
          Reset
        </button>
      </div>
    </form>
  );
};
