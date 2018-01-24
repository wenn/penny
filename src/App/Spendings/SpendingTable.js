import React, { Component } from 'react';
import Spending from "./Spending"

function SpendingHeader(props) {
  let title = String(props.value)
  let decoratedTitle = title
    .charAt(0)
    .toUpperCase()
    + title.slice(1)

  return (
    <th onClick={() => props.onClick(props.value)}>
      {decoratedTitle}
    </th>
  );
}

class SpendingTable
  extends React.Component {

  renderHeader(value, cls) {
    return (
      <SpendingHeader
        value={value}
        onClick={this.props.headOnClick}
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

export default SpendingTable