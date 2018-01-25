import React from 'react';

function Record(props) {
  const spending = props.value;
  const className = props.selected ? "selected" : ""

  return (
    <tr
      className={className}
      onClick={props.onClick}
    >
      <td>{spending.datetime.toDateString()}</td>
      <td>{spending.merchant}</td>
      <td className="currency">{spending.amount}</td>
    </tr>
  );
}

export default Record