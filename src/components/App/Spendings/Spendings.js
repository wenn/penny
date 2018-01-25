import React, { Component } from 'react';

import "components/App/Spendings/Spendings.css"
import Sorter from "utils/Sorter"
import Statement from "components/App/Spendings/Fixture"

import Spending from "components/App/Spendings/Spending"
import Table from "components/App/Spendings/Table"
import Record from "components/App/Spendings/Record"

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

        return (
          <Record key={spending.hashCode()}
            value={spending}
          />
        );
      });
  }

  render() {
    return (
      <Table
        records={this.renderRecords(fakeSpendings)}
        onClick={column => this.headerHandleClick(column)}
      />
    );
  }
}

export default Spendings