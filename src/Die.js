import React, { Component } from 'react';

class Die extends Component {
  render() {
    let style = {
      left: Math.floor(Math.random() * 75) + '%',
      bottom: Math.floor(Math.random() * 75) + '%',
    }
    return (
      <div className={this.props.rolled ? 'Die rolled' : 'Die'} style={style} onClick={this.props.onClick}>
        {this.props.value}
      </div>
    );
  }
}

export default Die;
