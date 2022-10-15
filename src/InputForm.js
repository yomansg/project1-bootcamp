export const InputForm = ({ players, rounds, handleChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div class="inputBoxes">
        <span class="labelClass">Number of Players:</span>
        <input
          name="numberOfPlayers"
          type="number"
          min="2"
          max="6"
          value={players}
          onChange={handleChange}
        />
        <span class="labelClass">Number of Rounds:</span>
        <input
          name="numberOfRounds"
          type="number"
          min="2"
          max="6"
          value={rounds}
          onChange={handleChange}
        />
      </div>
      <input class="button" type="submit" value="Submit" />
    </form>
  );
};
