import React, { Component } from 'react';

import logo from 'components/App/logo.svg';
import 'components/App/App.css';

import Spendings from 'components/App/Spendings/Spendings'

class App
  extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Spendings />
      </div>
    );
  }
}

export default App;
