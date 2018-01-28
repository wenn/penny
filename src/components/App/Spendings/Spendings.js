import React, { Component } from 'react';

import "components/App/Spendings/Spendings.css"
import Table from "components/App/Spendings/Table"

class Spendings
  extends Component {

  constructor(props) {
    super(props);

    // TODO: mess up sorting
    this.state = {
      spendings: props
        .value
        .reduce((object, spending) =>
          Object
            .assign(object, { [spending.hashCode()]: spending }), {}),
    }
  }

  handleSelect(spending) {
    const spendings = Object.assign({}, this.state.spendings);
    spendings[spending.hashCode()] = spending;
    this.setState({ spendings: spendings });

    this.render();
  }

  render() {
    const spendings = Object.assign({}, this.state.spendings);
    const value = Object
      .keys(spendings)
      .map(k => spendings[k]);

    return (
      <Table
        value={value}
        onSelect={record => this.handleSelect(record)}
      />
    );
  }
}

export default Spendings;