import React from 'react';

function Header(props) {
  let title = String(props.value);
  let decoratedTitle = title
    .charAt(0)
    .toUpperCase()
    + title.slice(1);

  return (
    <th onClick={() => props.onClick(props.value)}>
      {decoratedTitle}
    </th>
  );
}

export default Header