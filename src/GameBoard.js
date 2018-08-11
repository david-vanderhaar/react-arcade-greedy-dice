import React, { Component } from 'react';
import Die from './Die';
import uuid from 'uuid';

class GameBoard extends Component {

  rollDice() {
    let player = this.props.players.filter((player) => player.id === this.props.turnId)[0]
    let number = this.props.gameBoard.diceRolled.length === 0 && !player.hasRolledThisTurn ? 6 : this.props.gameBoard.diceRolled.length
    player.hasRolledThisTurn = true;
    let diceRolled = []
    while (diceRolled.length < number) {
      let value = Math.floor(Math.random() * 6) + 1; // get random value between 1 and 6
      let id = uuid();
      diceRolled.push({id: id, value: value});
    }

    let gameBoard = {...this.props.gameBoard}
    gameBoard.diceRolled = diceRolled;

    this.props.onRollDice(gameBoard);

    if (this.calculateScoreCombo(gameBoard.diceRolled) <= 0) {
      this.endTurn(false);
    }
  }

  lockDie(die) {
    let gameBoard = {...this.props.gameBoard}
    let players = this.props.players.concat()

    let player = players.filter((player) => player.id === this.props.turnId)[0]
    player.currentDiceLocked.push(die);

    let index = gameBoard.diceRolled.findIndex((d) => d.id === die.id);
    gameBoard.diceRolled.splice(index, 1);

    gameBoard.currentScore = this.calculateScoreCombo(player.currentDiceLocked)

    this.props.onLockDie(gameBoard, players);
  }

  endTurn(shouldKeepScore = true) {
    if (shouldKeepScore) { this.keepScore(); }
    let players = this.props.players.concat().map((player) => {
      player.diceLocked = [];
      player.currentDiceLocked = [];
      player.hasRolledThisTurn = false;
      return player
    });
    let gameBoard = {...this.props.gameBoard}
    gameBoard.diceRolled = [];
    gameBoard.currentScore = 0;
    let turnId = this.props.turnId === 1 ? 2 : 1;
    
    let player = this.props.players.filter((player) => player.id === this.props.turnId)[0]
    if (!this.checkForWin(player)) {
      this.props.onEndTurn(gameBoard, players, turnId);
      alert('next players turn')
    }
  }

    checkForWin(player) {
    if (player.score >= this.props.winScore) { 
      alert('Player ' + player.id + ' Wins!'); 
      this.props.onEndGame();
      return true; 
    } else {
      return false
    }
  }

  keepScore() {
    let players = this.props.players.concat();
    let player = players.filter((player) => player.id === this.props.turnId)[0]
    player.score += this.props.gameBoard.currentScore;
    player.diceLocked = [...player.diceLocked, ...player.currentDiceLocked];
    player.currentDiceLocked = [];
    this.props.onKeepScore(players);
  }

  // check 3 o kind
  calculateThreeKind(dice, value) {
    let kindAmount = dice.filter((die) => die.value === value).length;
    if (kindAmount >= 3) {
      let basePoints = value * 100;
      if (value === 1) {basePoints = 1000} // special case for tripple ones
      let amountOverThree = (kindAmount - 3)
      while (amountOverThree > 0) {
        basePoints = basePoints * 2;
        amountOverThree--;
      }
      dice = dice.filter((die) => {return die.value !== value})
      return basePoints;
    } else {
      return 0;
    }
  }

  checkForThreeKind(dice) {
    let threes = []
    for (let i = 1; i <= 6; i++) {
      threes.push(this.calculateThreeKind(dice, i));
    }
    return threes.reduce((acc, curr) => {
      return acc + curr;
    }, 0);
  }

  checkForSingles(dice) {
    return dice.map((die) => {
      if (die.value === 1) {return 100}
      else if (die.value === 5) {return 50}
      else { return 0 }
    }).reduce((acc, curr) => {
      return acc + curr;
    }, 0);
  }

  calculateScoreCombo(dice) {
    let result = [];
    result.push(this.checkForThreeKind(dice));
    result.push(this.checkForSingles(dice));
    return result.reduce((acc, curr) => {
      return acc + curr;
    });
  }

  render() {
    let diceRolled = this.props.gameBoard.diceRolled.map((die, i) => {
      return (
        <Die key={die.id} value={die.value} rolled={true} onClick={() => {this.lockDie(die)}}/>
      );
    });

    return (
      <div className="GameBoard">
        <div className="actions">
          <div className="row flow-text">
            <h3>Current Score: {this.props.gameBoard.currentScore}</h3>
          </div>
          <div className="row">
            <button className="btn" onClick={() => {this.rollDice()}}>
              Roll
            </button>
            <button className="btn" onClick={() => {this.endTurn()}}>
              Keep Score & End
            </button>
          </div>
        </div>
        <div className="diceArea">
          {diceRolled}
        </div>
      </div>
    );
  }
}

export default GameBoard;
