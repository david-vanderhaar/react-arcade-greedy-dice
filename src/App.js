import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Nav from './Nav';
import Players from './Players';
import GameBoard from './GameBoard';

class App extends Component {

  constructor() {
    super();
    this.state = { // our default state
      players: [
        {
          id: 1,
          score: 0,
          diceLocked: [],
          currentDiceLocked: [],
        },
        {
          id: 2,
          score: 0,
          diceLocked: [],
          currentDiceLocked: [],
        },
      ],
      gameBoard: {
        diceRolled: [],
        diceLocked: [],
        currentScore: 0, //based on all dice selected
      },
      turnId: 1,
      winnerId: null,
    }
  }

  handleRollDice(gameBoard) {
    this.setState({
      gameBoard,
    })
  }

  handleLockDie(gameBoard, players) {
    this.setState({
      players,
      gameBoard
    })
  }

  handleEndTurn(gameBoard, players, turnId) {
    this.setState({
      gameBoard,
      players,
      turnId
    })
  }

  handleKeepScore(players) {
    this.setState({
      players,
    })
  }

  render() {
    return (
      <div className="App">
        <Nav />
        <Players players={this.state.players} turnId={this.state.turnId}/>
        <GameBoard
          players={this.state.players}
          gameBoard={this.state.gameBoard}
          turnId={this.state.turnId}
          onRollDice={this.handleRollDice.bind(this)}
          onLockDie={this.handleLockDie.bind(this)}
          onEndTurn={this.handleEndTurn.bind(this)}
          onKeepScore={this.handleKeepScore.bind(this)}
        />
      </div>
    );
  }
}

export default App;
