import React, { Component } from 'react';
import {
  AwesomeButton
} from 'react-awesome-button';

class Die extends Component {
  render() {
    let spin_speed = Math.random() * (1.3 - 1) + 1;
    let left = Math.random() * (5 - 75) + 75;
    let style = {
      animation: `spin ${spin_speed}s 1`,
      left: `${left}%`
    }
    return (
      <AwesomeButton
        type="primary"
        size="small"
        className={this.props.rolled ? 'Die dice-btn rolled' : 'Die dice-btn'}
        style={style}
        action={this.props.onClick}
      >
        {this.props.value}
      </AwesomeButton>
    );
  }
}

export default Die;
