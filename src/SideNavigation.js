import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import 'jquery';
import 'materialize-css/dist/js/materialize.js';
import 'materialize-css/dist/css/materialize.css';
import {SideNav, SideNavItem, Button} from 'react-materialize'


class SideNavigation extends Component {

  render() {
    return (
      <SideNav
        trigger={
          <a href="#">
            <FontAwesomeIcon
              icon={['fas', 'bars']}
              size="1x"
            />
          </a>
        }
        options={{ closeOnClick: true }}
        className="SideNav"
      >
        <SideNavItem subheader>Summary</SideNavItem>
        <li className="side-nav-text">
          <p>
            This app was made as part of <a href="https://david-vanderhaar.github.io/blog/blog/2018/08/25/react-arcade-greedy-dice-1/">a short tutorial series</a> on building games with React.
            I began the React Arcade to increase my knowledge and improve my implementation of React. There is amazing value in using game development as a learning tool for web development. I believe this is especially true for component based, reactive frameworks. Enjoy!
          </p>
        </li>
        <SideNavItem subheader>Instructions</SideNavItem>
        <li className="side-nav-text">
          <p>
            Be the first player to get 5000 points.
          </p>
          <p>
            Only 1's and 5's score by themselves. Other numbers score as Three-Of-A-Kind or more.
          </p>
        </li>
        <SideNavItem href='https://david-vanderhaar.github.io/blog/'>Blog</SideNavItem>
        <SideNavItem divider />
        <SideNavItem href='https://github.com/david-vanderhaar'>
          <FontAwesomeIcon
            icon={['fab', 'github-square']}
            size="2x"
          />
        </SideNavItem>
        <SideNavItem href='https://twitter.com/classicwook'>
          <FontAwesomeIcon
            icon={['fab', 'twitter-square']}
            size="2x"
          />
        </SideNavItem>
        <SideNavItem href='mailto:d.vanderhaarhunter@gmail.com'>
          <FontAwesomeIcon
            icon={['fas', 'envelope-square']}
            size="2x"
          />
        </SideNavItem>
      </SideNav>
    );
  }
}

export default SideNavigation;
