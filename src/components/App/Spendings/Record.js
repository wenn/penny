import React from 'react';

function Record(props) {
  const spending = props.value;

  return (
    <tr>
      <td>{spending.datetime.toDateString()}</td>
      <td>{spending.merchant}</td>
      <td class="currency">{spending.amount}</td>
    </tr>
  );
}

export default Record