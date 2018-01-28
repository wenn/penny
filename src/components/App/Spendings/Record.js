import React from 'react';

function Record(props) {
  const spending = props.value;
  const className =
    (spending.getSelected() ? "selected" : "")
    + " noselect"

  return (
    <tr
      id={spending.hashCode()}
      className={className}
      onMouseOver={props.onMouseEnter}
      onClick={props.onClick}>
      <td>{spending.datetime.toDateString()}</td>
      <td>{spending.merchant}</td>
      <td className="currency">{spending.amount}</td>
    </tr>
  );
}

export default Record