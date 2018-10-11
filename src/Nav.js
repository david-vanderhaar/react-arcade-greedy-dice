import React, { Component } from 'react';
import SideNavigation from './SideNavigation';

class Nav extends Component {
  render() {
    return (
      <div className="Nav">
        <nav>
          <div className="nav-wrapper">
            <ul className="left">
              <li>
                <SideNavigation />
              </li>
            </ul>
            <div className="brand-logo center">Greedy Dice</div>
          </div>
        </nav>
      </div>
    );
  }
}

export default Nav;
