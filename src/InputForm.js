export const InputForm = ({ players, rounds, handleChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <p>
        <label>{"Number of Players:   "}</label>
        <input
          name="numberOfPlayers"
          type="number"
          min="2"
          max="6"
          value={players}
          onChange={handleChange}
        />
        <br />
        <label>{"Number of Rounds:   "}</label>
        <input
          name="numberOfRounds"
          type="number"
          min="2"
          max="6"
          value={rounds}
          onChange={handleChange}
        />
      </p>
      <input id="button" type="submit" value="Submit" />
    </form>
  );
};
