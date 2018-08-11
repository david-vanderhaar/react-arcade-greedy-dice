import React, { Component } from 'react';

class Die extends Component {
  render() {
    return (
      <div className={this.props.rolled ? 'Die rolled' : 'Die'} onClick={this.props.onClick}>
        {this.props.value}
      </div>
    );
  }
}

export default Die;
