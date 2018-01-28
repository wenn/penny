import React from 'react';

function Header(props) {
  const title = String(props.value);
  const decoratedTitle = title
    .charAt(0)
    .toUpperCase()
    + title.slice(1);

  const className = props.className + " noselect"

  return (
    <th
      className={className}
      onClick={() => props.onClick(props.value)}>
      {decoratedTitle}
    </th>
  );
}

export default Header