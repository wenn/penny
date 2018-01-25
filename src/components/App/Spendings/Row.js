function Row(props) {
  let spending = props.spending

  return (
    <tr onClick={() => props.onClick(props.value)}>
    </tr>
  );
}

export default Row