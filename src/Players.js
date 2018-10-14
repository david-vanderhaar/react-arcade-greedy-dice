import React, { Component } from 'react';
import Die from './Die';

class Players extends Component {
  render() {

    let playerScores = this.props.players.map((player) => {
      return (
        <div key={player.id} className="col s6">
          <h3 className={player.id === this.props.turnId ? 'has-turn' : ''}>
            Player {player.id}
          </h3>
          <div className={player.id === this.props.turnId ? 'flow-text has-turn' : 'flow-text '}>{player.score}</div>
        </div>
      )
    });

    let currentPlayer = this.props.players.filter((player) => player.id === this.props.turnId)[0]
    let diceLocked = [...currentPlayer.diceLocked, ...currentPlayer.currentDiceLocked].map((die, i) => {
      return (
        <div key={die.id} className="col s6 m4 l2">
          <Die value={die.value} />
        </div>
      )
    });

    return (
      <div className="Players">
        <div className="row">
          {playerScores}
        </div>
        <div className="row locked-dice">
          {diceLocked}
        </div>
      </div>
    );
  }
}

export default Players;
