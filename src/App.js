import React from "react";
import logo from "./logo.png";
import "./App.css";
import { WelcomeMsg } from "./WelcomeMsg.js";
import { Instruction } from "./Instruction.js";
import { InputForm } from "./InputForm.js";
import { PlayForm } from "./PlayForm.js";
import { LeaderBoard } from "./LeaderBoard.js";
import { DiceImage } from "./DiceImage.js";
import { rollDice, nextPlayer, nextRound } from "./utils.js";
import { isLastPlayer, determineWinner, soundPlay } from "./utils.js";

// define the audio clips used in this APP
const audioClips = [
  {
    sound: "http://cd.textfiles.com/itcontinues/WIN/YTB22/RATTLE2.WAV",
    label: "Dice Shake",
  },
  {
    sound:
      "https://soundbible.com/mp3/Short_triumphal_fanfare-John_Stracke-815794903.mp3",
    label: "Victory sound",
  },
  {
    sound:
      "https://soundbible.com/mp3/jack_in_the_box-Mike_Koenig-710345321.mp3",
    label: "Game music",
  },
];

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
    this.handleContinue = this.handleContinue.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: parseInt(value),
    });
  }

  handleSubmit(event) {
    const { name, value } = event.target;
    event.preventDefault();
    soundPlay(audioClips[2].sound, true, 0.2); // play background music - softer

    this.setState({
      [name]: value,
      userScores: Array(this.state.numberOfPlayers).fill(0),
      gameStarted: true,
    });
  }

  handleContinue(event) {
    event.preventDefault();
    if (!this.state.userRollDice) {
      soundPlay(audioClips[0].sound, false, 1); // play Dice shake - louder
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
    const gameStarted = this.state.gameStarted;
    const userRollDice = this.state.userRollDice;
    const userOrderDice = this.state.userOrderDice;
    const playerDiceRolls = this.state.playerDiceRolls;
    const userScores = this.state.userScores;
    const lastPlayer = isLastPlayer(
      this.state.currentRound,
      this.state.currentPlayer,
      this.state.numberOfRounds,
      this.state.numberOfPlayers,
      this.state.userOrderDice
    );
    const winner = determineWinner(userScores, lastPlayer, audioClips);

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" /> <br />
          <WelcomeMsg />
          {/* Render the InputForm to enable user input number of players and rounds */}
          {!gameStarted && (
            <InputForm
              players={this.state.numberOfPlayers}
              rounds={this.state.numberOfRounds}
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
            />
          )}
          {/* Render the PlayForm to handle main logic */}
          {gameStarted && (
            <PlayForm
              diceOrder={this.state.diceOrder}
              handleChange={this.handleChange}
              handleContinue={this.handleContinue}
              resetGame={this.resetGame}
              isLastPlayer={lastPlayer}
            />
          )}
          {/* Show the winner after last player has finished his turn */}
          <h2>{lastPlayer && winner}</h2>
        </header>

        <div className="Main-body height-auto">
          {/* After Submit button, app prompts user to click Continue button OR show animated dice*/}
          {gameStarted && <Instruction userRollDice={userRollDice} />}
          {/* Show what the current player has tossed */}
          {userRollDice && (
            <p>
              Player {this.state.currentPlayer}, you rolled{" "}
              {<DiceImage roll={playerDiceRolls[0]} />}..
              {<DiceImage roll={playerDiceRolls[1]} />}
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
        <div className="Main-body height-fixed">
          {/* Constantly show the players' scores on a scoreboard*/}
          {gameStarted && <h4>Leaderboard 🏆</h4>}
          {gameStarted && <hr />}
          {gameStarted && <LeaderBoard userScores={userScores} />}
        </div>
      </div>
    );
  }
}

export default App;
