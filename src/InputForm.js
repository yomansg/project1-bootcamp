export const InputForm = ({ players, rounds, handleChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="inputBoxes">
        <label className="labelClass">Number of Players:</label>
        <input
          className="boxClass"
          name="numberOfPlayers"
          type="number"
          min="2"
          max="6"
          value={players}
          onChange={handleChange}
        />
        <label className="labelClass">Number of Rounds:</label>
        <input
          className="boxClass"
          name="numberOfRounds"
          type="number"
          min="2"
          max="6"
          value={rounds}
          onChange={handleChange}
        />
      </div>
      <input className="button" type="submit" value="Submit" />
    </form>
  );
};
