import React from "react";
import logo from "./logo.png";
import "./App.css";
import { InputForm } from "./InputForm.js";
import { PlayForm } from "./PlayForm.js";
import { LeaderBoard } from "./LeaderBoard.js";

import one from "./assets/one.png";
import two from "./assets/two.png";
import three from "./assets/three.png";
import four from "./assets/four.png";
import five from "./assets/five.png";
import six from "./assets/six.png";

import { rollDice, nextPlayer, nextRound, isLastPlayer } from "./utils.js";

class App extends React.Component {
  constructor(props) {
    // Always call super with props in constructor to initialise parent class
    super(props);
    this.state = {
      gameStarted: false,
      numberOfPlayers: 2, // form input state
      numberOfRounds: 3,
      userRollDice: false,
      userOrderDice: false,
      userScores: [],
      currentPlayer: 0,
      currentRound: 0,
      playerDiceRolls: [0, 0],
      currentPlayerScore: 0,
      diceOrder: 1,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDiceChange = this.handleDiceChange.bind(this);
    this.handleContinue = this.handleContinue.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: parseInt(value),
    });
  }

  handleDiceChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    //const [newLetter] = this.state.value;
    const { name, value } = event.target;
    event.preventDefault();
    this.setState({
      [name]: value,
      userScores: Array(this.state.numberOfPlayers).fill(0),
      gameStarted: true,
    });
  }

  handleContinue(event) {
    event.preventDefault();
    if (!this.state.userRollDice) {
      this.setState((previousState) => ({
        currentPlayer: nextPlayer(
          previousState.currentPlayer,
          this.state.numberOfPlayers
        ),
        playerDiceRolls: [rollDice(), rollDice()],
        userRollDice: !previousState.userRollDice,
        userOrderDice: false,
      }));
    } else {
      let userScore =
        this.state.diceOrder === 1
          ? this.state.playerDiceRolls[0] * 10 + this.state.playerDiceRolls[1]
          : this.state.playerDiceRolls[1] * 10 + this.state.playerDiceRolls[0];
      const newScores = this.state.userScores.slice(); //copy the array
      newScores[this.state.currentPlayer - 1] += userScore; //add new score to copied array location
      this.setState((previousState) => ({
        userScore: userScore, // current player score
        userScores: newScores, // store player score in array
        currentRound: nextRound(
          previousState.currentRound,
          previousState.currentPlayer
        ),
        userRollDice: !previousState.userRollDice,
        userOrderDice: !previousState.userOrderDice,
      }));
    }
  }

  resetGame = () => {
    this.setState({
      // Reset the whole game to let user play again
    });
  };

  render() {
    const DiceImage = ({ roll }) => {
      if (roll === 1) {
        return <img className="dice-image" src={one} alt="1" />;
      } else if (roll === 2) {
        return <img className="dice-image" src={two} alt="2" />;
      } else if (roll === 3) {
        return <img className="dice-image" src={three} alt="3" />;
      } else if (roll === 4) {
        return <img className="dice-image" src={four} alt="4" />;
      } else if (roll === 5) {
        return <img className="dice-image" src={five} alt="5" />;
      } else if (roll === 6) {
        return <img className="dice-image" src={six} alt="6" />;
      }
    };
    const gameStarted = this.state.gameStarted;
    const userRollDice = this.state.userRollDice;
    const userOrderDice = this.state.userOrderDice;
    const playerDiceRolls = this.state.playerDiceRolls;
    const userScores = this.state.userScores;

    // console.log(
    //   this.state.currentRound,
    //   this.state.currentPlayer,
    //   this.state.numberOfRounds,
    //   this.state.numberOfPlayers,
    //   isLastPlayer
    // );
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            <b>
              Hello! Welcome to Beat That! <br />
              Create a two-digit number by selecting the order of your dice
              rolls. <br />
              The player with the highest number wins! Good luck! <br />
            </b>
          </p>
          {!gameStarted && (
            <InputForm
              players={this.state.numberOfPlayers}
              rounds={this.state.numberOfRounds}
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
            />
          )}
          {gameStarted && (
            <PlayForm
              diceOrder={this.state.diceOrder}
              handleChange={this.handleChange}
              handleContinue={this.handleContinue}
              resetGame={this.resetGame}
              isLastPlayer={isLastPlayer(
                this.state.currentRound,
                this.state.currentPlayer,
                this.state.numberOfRounds,
                this.state.numberOfPlayers,
                this.state.userOrderDice
              )}
            />
          )}
        </header>

        <div className="Main-body">
          {/* Prompt user to click Continue button after Submit button is clicked*/}
          {gameStarted && <p>Click [Continue] button...</p>}
          {/* Show what the current player has tossed */}
          {userRollDice && (
            <p>
              Player {this.state.currentPlayer}, you rolled {playerDiceRolls[0]}{" "}
              & {playerDiceRolls[1]}.
            </p>
          )}
          {/* Show the player's score after ordering of dice is selected */}
          {userOrderDice && (
            <p>
              Player {this.state.currentPlayer}, your score is{" "}
              {this.state.userScore} in Round {this.state.currentRound}.
            </p>
          )}
        </div>
        <div className="Main-body">
          {/* Constantly show what the players' scores - facilitate debugging */}
          {gameStarted && <h4>Leaderboard 🏆</h4>}
          {gameStarted && <hr />}
          {gameStarted && <LeaderBoard userScores={userScores} />}
        </div>
      </div>
    );
  }
}

export default App;
