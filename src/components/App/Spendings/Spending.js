class Spending {

  static Enum = Object.freeze({
    DATETIME: "datetime",
    MERCHANT: "merchant",
    AMOUNT: "amount",
  });

  constructor(datetime, merchant, amount) {
    this[Spending.Enum.DATETIME] = datetime;
    this[Spending.Enum.MERCHANT] = merchant;
    this[Spending.Enum.AMOUNT] = amount;
  }
}

export default Spending