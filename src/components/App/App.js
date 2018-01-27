import React, { Component } from 'react';

import logo from 'components/App/logo.svg';
import 'components/App/App.css';

import Statement from 'components/App/Spendings/Fixture';
import Spendings from 'components/App/Spendings/Spendings';
import Spending from 'components/App/Spendings/Spending';

const fakeSpendings = Statement
  .split('\n')
  .map(line => {
    let [datetime, merchant, amount] = line
      .split(',')
      .splice(0, 3)
      .map(v => v === undefined || v.replace(/['"]+/g, ""));

    return new Spending(
      new Date(datetime),
      merchant,
      amount === undefined || Number.parseFloat(amount)
    );
  })
  .filter(spending => spending.merchant !== undefined);

class App
  extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Spendings value={fakeSpendings} />
      </div>
    );
  }
}

export default App;