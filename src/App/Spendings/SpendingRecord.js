import React, { Component } from 'react';

function SpendingRecord(props) {
  return (
    <tr>
      <td>{props.datetime}</td>
      <td>{props.merchant}</td>
      <td className="currency">{props.amount}</td>
    </tr>
  );
}

export default SpendingRecord