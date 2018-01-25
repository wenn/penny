import React, { Component } from 'react';

import "components/App/Spendings/Spendings.css"
import Spending from "components/App/Spendings/Spending"
import SpendingTable from "components/App/Spendings/SpendingTable"
import SpendingRecord from "components/App/Spendings/SpendingRecord"
import Statement from "components/App/Spendings/Fixture"

let fakeSpendings = Statement
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

// TODO: load this from a common
// TODO: convert to absolute imports
function hashCode(str) {
  var hash = 0;
  if (str.length === 0) {
    return hash;
  }
  for (var i = 0; i < str.length; i++) {
    let char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
}

class Sorter {

  static sort(key) {
    let isDesc = /^-/.test(key);
    let parsedKey = key.replace(/^[-+]/, "");

    return (a, b) =>
      isDesc
        ? (a[parsedKey] <= b[parsedKey] ? 1 : -1)
        : (a[parsedKey] >= b[parsedKey] ? 1 : -1);
  }

  static toggleOrder(order) {
    return order === "+" ? "-" : "+";
  }
}

class Spendings
  extends Component {

  constructor(props) {
    super(props);

    this.state = {
      sort: "+" + Spending.Enum.MERCHANT
    };
  }

  headerHandleClick(header) {
    let current = this.state.sort;
    let order = Sorter.toggleOrder(current.charAt(0));

    this.setState({
      sort: order + header
    });

    return this.render();
  }

  renderRecords(spendings) {
    return spendings
      .sort(Sorter.sort(this.state.sort))
      .map(spending => {

        let spendingKey = hashCode(
          spending.datetime
          + spending.merchant
          + spending.amount
        );

        return (
          <SpendingRecord key={spendingKey}
            datetime={spending.datetime.toDateString()}
            merchant={spending.merchant}
            amount={spending.amount}
          />
        );
      });
  }

  render() {
    return (
      <SpendingTable
        records={this.renderRecords(fakeSpendings)}
        onClick={column => this.headerHandleClick(column)}
      />
    );
  }
}

export default Spendings