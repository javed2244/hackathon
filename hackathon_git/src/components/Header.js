// eslint-disable-next-line
import React, { Component } from 'react';
import logo from './../logo.svg';
import './../App.css';
import {
  Link
} from 'react-router-dom';

class Header extends Component {
  render() {
    return (
        <header><strong>
         <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2 > Welcome to Credence_Trustsec Demo </h2>
          </div>
          <ul class="nav justify-content-center"  >
    <li class="nav-item">
      <a class="nav-link active"   href="/Sgt">SGT</a>
    </li>
    <li class="nav-item">
      <a class="nav-link"  href="/Sgacl">SGACL</a>
    </li>
    <li class="nav-item">
      <a class="nav-link"  href="/Mapping">MAPPING</a>
    </li>
    <li class="nav-item">
      <a class="nav-link"  href="/IP_SGTMapping">URL</a>
    </li>
  </ul>
</strong>
        </header>

    );
  }
}

export default Header;
