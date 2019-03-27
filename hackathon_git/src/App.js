import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';


import './App.css';

import Sgt from './components/Sgt';
import Sgacl from './components/Sgacl';
import Mapping from './components/Mapping';
import Header from './components/Header';
import HomePage from './components/Homepage';
import IP_SGTMapping from './components/IP_SGTMapping'


class App extends Component {
  render() {
    return (
      <Router>
      <div className="App">

        <Header />

          <Route exact path='/' component={HomePage} />
          <Route exact path='/Sgt' component={Sgt} />
          <Route exact path='/Sgacl' component={Sgacl} />
          <Route exact path='/Mapping' component={Mapping} />
          <Route exact path='/IP_SGTMapping' component={IP_SGTMapping} />





      </div>
      </Router>
    );
  }
}




export default App;
