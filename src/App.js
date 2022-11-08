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

const defaultState = {
  gameStarted: false,
  numberOfPlayers: 2,
  numberOfRounds: 3,
  userRollDice: false,
  userOrderDice: false,
  userScores: [],
  currentPlayer: 0,
  currentRound: 0,
  playerDiceRolls: [0, 0],
  currentPlayerScore: 0,
  diceOrder: 1,
  audio: new Audio(audioClips[2].sound),
  isMusicOn: false,
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = defaultState;

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
    const audio = this.state.audio;
    audio.play();
    audio.loop = true;

    this.setState((previousState) => ({
      [name]: value,
      userScores: Array(this.state.numberOfPlayers).fill(0),
      gameStarted: true,
      isMusicOn: true,
    }));
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
      const newScores = [...this.state.userScores]; //copy the array
      newScores[this.state.currentPlayer - 1] += userScore; //add new score to copied array location
      this.setState((previousState) => ({
        userScore: userScore,
        userScores: newScores,
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
    this.setState(defaultState);
  };

  toggleMusic = (event) => {
    event.preventDefault();
    this.state.isMusicOn ? this.state.audio.pause() : this.state.audio.play();
    this.setState((previousState) => ({
      isMusicOn: !previousState.isMusicOn,
    }));
  };

  render() {
    const { gameStarted, userRollDice, userOrderDice } = this.state;
    const { playerDiceRolls, userScores } = this.state;
    const lastPlayer = isLastPlayer(
      this.state.currentRound,
      this.state.currentPlayer,
      this.state.numberOfRounds,
      this.state.numberOfPlayers,
      userOrderDice
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
              toggleMusic={this.toggleMusic}
              isLastPlayer={lastPlayer}
              isMusicOn={this.state.isMusicOn}
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
          {gameStarted && (
            <div>
              {/* Constantly show the players' scores on a scoreboard*/}
              <h4>Leaderboard 🏆</h4>
              <hr />
              <LeaderBoard userScores={userScores} />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
