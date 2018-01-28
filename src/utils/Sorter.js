class Sorter {

  static sort(key) {
    let isDesc = /^-/.test(key);
    let parsedKey = key.replace(/^[-+]/, "");

    return (a, b) =>
      isDesc
        ? (a[parsedKey] <= b[parsedKey] ? 1 : -1)
        : (a[parsedKey] >= b[parsedKey] ? 1 : -1);
  }

  static toggleOrder(order) {
    return order === Sorter.Order.DESC
      ? Sorter.Order.ASC
      : Sorter.Order.DESC;
  }

  static Order = Object.freeze({
    ASC: "+",
    DESC: "-"
  });
}

export default Sorter;