import React, { Component } from 'react';
import Die from './Die';

class GameBoard extends Component {

  rollDice(shouldKeepScore = true) {
    if (shouldKeepScore) { this.keepScore(); }

    let number = this.props.gameBoard.diceRolled.length === 0 ? 6 : this.props.gameBoard.diceRolled.length
    let diceRolled = []
    while (diceRolled.length < number) {
      let value = Math.floor(Math.random() * 6) + 1; // get random value between 1 and 6
      diceRolled.push(value);
    }

    let gameBoard = {...this.props.gameBoard}
    gameBoard.diceRolled = diceRolled;
    gameBoard.currentScore = 0;

    this.props.onRollDice(gameBoard);

    if (this.calculateScoreCombo(gameBoard.diceRolled) <= 0) {
      this.endTurn();
    }
  }

  lockDie(value) {
    let gameBoard = {...this.props.gameBoard}
    let players = this.props.players.concat()

    let player = players.filter((player) => player.id === this.props.turnId)[0]
    // player.diceLocked.push(value);
    player.currentDiceLocked.push(value);

    let index = gameBoard.diceRolled.findIndex((die) => die === value);
    gameBoard.diceRolled.splice(index, 1);

    // gameBoard.currentScore = this.calculateScoreCombo(player.diceLocked)
    gameBoard.currentScore = this.calculateScoreCombo(player.currentDiceLocked)

    this.props.onLockDie(gameBoard, players);
  }

  endTurn() {
    alert('next players turn')
    this.keepScore();
    let players = this.props.players.concat();
    players.map((player) => {
      player.diceLocked = [];
    });
    let gameBoard = {...this.props.gameBoard}
    gameBoard.diceRolled = [];
    gameBoard.currentScore = 0;
    let turnId = this.props.turnId === 1 ? 2 : 1;

    this.props.onEndTurn(gameBoard, players, turnId);
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
    let kindAmount = dice.filter((die) => die === value).length;
    if (kindAmount >= 3) {
      let basePoints = value * 100;
      if (value === 1) {basePoints = 1000} // special case for tripple ones
      let amountOverThree = (kindAmount - 3)
      while (amountOverThree > 0) {
        basePoints = basePoints * 2;
        amountOverThree--;
      }
      dice = dice.filter((die) => {die !== value})
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
    return Math.max(...threes);
  }

  checkForSingles(dice) {
    return dice.map((die) => {
      if (die === 1) {return 100}
      else if (die === 5) {return 50}
      else { return 0 }
    }).reduce((acc, curr) => {
      return acc + curr;
    });
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
    let diceRolled = this.props.gameBoard.diceRolled.map((value, i) => {
      return (
        <Die key={i} value={value} rolled={true} onClick={() => {this.lockDie(value)}}/>
      );
    });

    return (
      <div className="GameBoard">
        <div className="actions">
          <div className="row flow-text">
            <h3>Current Score: {this.props.gameBoard.currentScore}</h3>
          </div>
          <div className="row">
            {
              // (this.props.gameBoard.currentScore > 0)
              // ? (
              //     <button className="btn" onClick={() => {this.rollDice()}}>
              //       Keep Score & Roll
              //     </button>
              // )
              // : (
              //   <button className="btn" onClick={() => {this.rollDice(false)}}>
              //     Roll
              //   </button>
              // )
            }
            <button className="btn" onClick={() => {this.rollDice()}}>
              Keep Score & Roll
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
