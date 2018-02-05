class Sorter {

  static sort(key) {
    const toggleSort = /^-/.test(key) ? 1 : -1;
    const parsedKey = key.replace(/^[-+]/, "");

    return (a, b) => {
      if (a[parsedKey] < b[parsedKey]) return 1 * toggleSort;
      if (a[parsedKey] > b[parsedKey]) return -1 * toggleSort;
      if (a.hashCode() < b.hashCode()) return 1;
      if (a.hashCode() > b.hashCode()) return -1;

      return 0;
    }
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