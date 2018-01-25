import React from 'react';

import Spending from "components/App/Spendings/Spending"
import Header from "components/App/Spendings/Header"

class Table
  extends React.Component {

  renderHeader(value, cls) {
    return (
      <Header
        value={value}
        onClick={() => this.props.onClick(value)}
      />
    );
  }

  render() {
    return (
      <table>
        <tbody>
          <tr>
            {this.renderHeader(Spending.Enum.DATETIME)}
            {this.renderHeader(Spending.Enum.MERCHANT)}
            {this.renderHeader(Spending.Enum.AMOUNT)}
          </tr>
          {this.props.records}
        </tbody>
      </table>
    );
  }
}

export default Table