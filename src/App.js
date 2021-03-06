import React, { Component } from 'react';
import 'jquery';
import 'materialize-css/dist/js/materialize.js';
import 'materialize-css/dist/css/materialize.css';
import './App.css';
import Nav from './Nav';
import Players from './Players';
import GameBoard from './GameBoard';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fab, fas)

const DEFAULT_STATE = () => {
  return { // our default state
    players: [
      {
        id: 1,
        score: 0,
        scoreThisTurn: 0,
        diceLocked: [],
        currentDiceLocked: [],
        hasRolledThisTurn: false,
      },
      {
        id: 2,
        score: 0,
        scoreThisTurn: 0,
        diceLocked: [],
        currentDiceLocked: [],
        hasRolledThisTurn: false,
      },
    ],
    gameBoard: {
      diceRolled: [],
      diceLocked: [],
      currentScore: 0, //based on all dice selected
    },
    turnId: 1,
    winScore: 5000,
  }
}

class App extends Component {

  constructor() {
    super();
    this.state = DEFAULT_STATE();
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

  handleEndGame() {
    this.setState(DEFAULT_STATE())
  }

  render() {
    return (
      <div className="App">
        <Nav />
        <div className="row no-margin">
          <div className="col s12 m6 offset-m3">
            <Players players={this.state.players} turnId={this.state.turnId}/>
            <GameBoard
              players={this.state.players}
              gameBoard={this.state.gameBoard}
              turnId={this.state.turnId}
              winScore={this.state.winScore}
              onRollDice={this.handleRollDice.bind(this)}
              onLockDie={this.handleLockDie.bind(this)}
              onEndTurn={this.handleEndTurn.bind(this)}
              onEndGame={this.handleEndGame.bind(this)}
              onKeepScore={this.handleKeepScore.bind(this)}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
