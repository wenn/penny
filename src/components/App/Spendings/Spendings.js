import React, { Component } from 'react';

import "components/App/Spendings/Spendings.css"
import Sorter from "utils/Sorter"

import Spending from "components/App/Spendings/Spending"
import Table from "components/App/Spendings/Table"
import Record from "components/App/Spendings/Record"

class Spendings
  extends Component {

  constructor(props) {
    super(props);

    this.state = {
      sort: "+" + Spending.Enum.MERCHANT,
      selected: {}
    };
  }

  isSelected(spending) {
    return spending.hashCode() in this.state.selected
  }

  headerHandleClick(header) {
    let current = this.state.sort;
    let order = Sorter.toggleOrder(current.charAt(0));

    this.setState({
      sort: order + header
    });

    return this.render();
  }

  recordHandleClick(spending) {
    const hashCode = spending.hashCode();
    const selected = this.state.selected;
    let current = Object.assign({}, selected);

    hashCode in current
      ? delete current[hashCode]
      : current[hashCode] = spending;

    this.setState({ selected: current });
  }

  renderRecords(spendings) {
    return spendings
      .sort(Sorter.sort(this.state.sort))
      .map(spending => {
        const selected = this.isSelected(spending)

        return (
          <Record key={spending.hashCode()}
            selected={selected}
            value={spending}
            onClick={() => this.recordHandleClick(spending)}
          />
        );
      });
  }

  render() {
    let spendings = this.props.value.slice();

    return (
      <Table
        records={this.renderRecords(spendings)}
        onClick={column => this.headerHandleClick(column)}
      />
    );
  }
}

export default Spendings